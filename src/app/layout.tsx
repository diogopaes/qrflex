import './globals.css';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from '@/providers/NextAuthProvider';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QRFlex',
  description: 'QRFlex Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          <div className="pt-16"> {/* Espaço para o header fixo */}
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}