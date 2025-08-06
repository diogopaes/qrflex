'use client';

import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

export function Header() {
  const { status } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto px-6 h-18 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          QRFlix
        </Link>

        {status === 'authenticated' ? (
          <Link
            href="/dashboard"
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Dashboard
          </Link>
        ) : (
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-colors"
          >
            Começar Agora
          </button>
        )}
      </div>
    </header>
  );
}