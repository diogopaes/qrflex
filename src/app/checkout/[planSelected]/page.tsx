// app/checkout/start/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface CheckoutStartPageProps {
    params: {
      planSelected: string;
    };
  }

export default async function CheckoutStartPage({ params }: CheckoutStartPageProps) {
    const queryParams = await params;
    const session = await auth();

    if (!session || !session.user?.email) {
        redirect("/"); 
    }

    if (session?.user?.plan !== 'none') {
        redirect("/dashboard");
    }

    const plan = queryParams?.planSelected;

    if (!plan) {
        redirect("/dashboard/plans");
    }

    const baseURL = process.env.NEXT_PUBLIC_APP_URL;

    const cookieHeaders = await headers();
    const cookies = cookieHeaders.get("cookie") ?? "";

    const res = await fetch(`${baseURL}/api/stripe/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
        body: JSON.stringify({ plan }),
        cache: "no-store",
      });      

    const { url } = await res.json();

    if (url) {
        redirect(url);
    }

    redirect("/");
}
