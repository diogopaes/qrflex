// app/api/stripe/upgrade/route.ts
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

  const { newPlan, subscriptionId } = await req.json();
  const priceId =
    newPlan === "premium"
      ? process.env.STRIPE_PREMIUM_PRICE_ID!
      : process.env.STRIPE_BASIC_PRICE_ID!;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const currentItemId = subscription.items.data[0].id;

  await stripe.subscriptions.update(subscriptionId, {
    items: [{ id: currentItemId, price: priceId }],
    proration_behavior: "create_prorations",
  });

  return NextResponse.json({ success: true });
}
