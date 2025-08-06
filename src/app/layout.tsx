import './globals.css';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from '@/providers/NextAuthProvider';

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
            {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}