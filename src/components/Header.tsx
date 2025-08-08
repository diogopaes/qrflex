'use client';
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { status } = useSession();

  async function handleSignIn(planSelected: string) {
    await signIn("google", {
      callbackUrl: `/checkout/${planSelected}`,
    });
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto px-6 h-18 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          <Image src="/logo.svg" alt="QRFlex" width={149} height={32} />
        </Link>

        {status === 'authenticated' ? (
          <Link
            href="/dashboard"
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-colors"
          >
            Dashboard
          </Link>
        ) : (
          <button
            onClick={() => handleSignIn('basic')}
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-colors cursor-pointer"
          >
            Começar Agora
          </button>
        )}
      </div>
    </header>
  );
}