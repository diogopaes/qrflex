// app/api/stripe/upgrade/route.ts
import { adminDb } from "@/config/firebase";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userDoc = await adminDb().collection("users").doc(session.user.id as string).get();
  const subscriptionId = userDoc.data()?.subscriptionId;


  const priceId = process.env.STRIPE_PREMIUM_PRICE_ID

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);


  const currentPriceId = subscription.items.data[0].price.id;

  if (currentPriceId === priceId) {
    return NextResponse.json({ message: "Já está no plano premium" });
  }

  const currentItemId = subscription.items.data[0].id;

  await stripe.subscriptions.update(subscriptionId, {
    items: [{ id: currentItemId, price: priceId }],
    proration_behavior: "create_prorations",
  });

  await adminDb().collection("users").doc(session.user.id as string).update({
    plan: "premium",
  });

  return NextResponse.json({ success: true });
}
