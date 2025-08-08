import './globals.css';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from '@/providers/NextAuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QRFlex - Gerador de QR Codes Inteligente',
  description: 'Gerador de QR Codes Inteligente',
  icons: {
    icon: "/favicon.png",
  },
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
            {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}