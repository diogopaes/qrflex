import { adminDb } from "@/config/firebase";
import { headers } from "next/headers";
import Stripe from "stripe";

// Stripe instance com API version atual
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil", // use a versão correta da sua conta
});

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("[STRIPE WEBHOOK ERROR]", err);
    return new Response("Webhook signature verification failed", { status: 400 });
  }

  // ✅ 1. Quando o pagamento foi concluído
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    const email = session.customer_email!;

    // 🔍 Buscar subscription completa
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0].price.id;

    const plan =
      priceId === process.env.STRIPE_PREMIUM_PRICE_ID
        ? "premium"
        : "basic";

    const userSnapshot = await adminDb()
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!userSnapshot.empty) {
      const doc = userSnapshot.docs[0];
      await doc.ref.update({
        plan,
        stripeCustomerId: customerId,
        subscriptionId,
      });
    }

    console.log(`[✅ Webhook] Plano ${plan} ativado para ${email}`);
  }

  // ✅ 2. Quando o plano é atualizado (upgrade/downgrade)
  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object as Stripe.Subscription;
    const priceId = sub.items.data[0].price.id;
    const customerId = sub.customer as string;

    const plan =
      priceId === process.env.STRIPE_PREMIUM_PRICE_ID
        ? "premium"
        : "basic";

    const userSnapshot = await adminDb()
      .collection("users")
      .where("stripeCustomerId", "==", customerId)
      .get();

    if (!userSnapshot.empty) {
      const doc = userSnapshot.docs[0];
      await doc.ref.update({ plan });
    }

    console.log(`[✅ Webhook] Assinatura atualizada para plano ${plan}`);
  }

  // ✅ 3. Quando a assinatura é cancelada (opcional)
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const customerId = sub.customer as string;

    const userSnapshot = await adminDb()
      .collection("users")
      .where("stripeCustomerId", "==", customerId)
      .get();

    if (!userSnapshot.empty) {
      const doc = userSnapshot.docs[0];
      await doc.ref.update({ plan: "none" });
    }

    console.log(`[🚫 Webhook] Assinatura cancelada`);
  }

  return new Response("Webhook processed", { status: 200 });
}
