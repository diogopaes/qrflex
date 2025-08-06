import NextAuth from 'next-auth';
import { getServerSession, AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { adminDb } from '@/config/firebase';

const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const userDoc = adminDb().collection('users').doc(user.id);
          await userDoc.set({
            email: user.email,
            name: user.name,
            image: user.image,
            lastSignIn: new Date(),
            provider: account.provider,
          }, { merge: true });
          
          return true;
        } catch (error) {
          console.error('Erro ao salvar usuário no Firebase:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
} satisfies AuthOptions;

export const handlers = NextAuth(config);
export const auth = () => getServerSession(config);