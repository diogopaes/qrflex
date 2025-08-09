import { auth } from "@/lib/auth";
import { adminDb } from "@/config/firebase";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST() {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userId = session.user.id!;
  const userDoc = await adminDb().collection("users").doc(userId).get();
  const customerId = userDoc.data()?.stripeCustomerId;

  if (!customerId) {
    return new NextResponse("Cliente não encontrado", { status: 404 });
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`, 
  });

  return NextResponse.json({ url: portalSession.url });
}
