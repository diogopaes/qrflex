// app/api/stripe/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: Request) {
    const session = await auth();
    const user = session?.user;
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { plan } = await req.json(); // 'basic' ou 'premium'
    const priceId =
        plan === "premium"
        ? process.env.STRIPE_PREMIUM_PRICE_ID!
        : process.env.STRIPE_BASIC_PRICE_ID!;

    const params: Stripe.Checkout.SessionCreateParams = {
        mode: "subscription",
        customer_email: user?.email as string,
        line_items: [
            {
            price: priceId,
            quantity: 1,
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
        metadata: {
            email: user?.email as string,
        },
    };

    const stripeSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ url: stripeSession.url });
}
