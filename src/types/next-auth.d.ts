import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      plan?: string | null;
    };
  }
  interface User extends DefaultUser {
    id: string;
    plan?: "none" | "basic" | "premium";
  }

  interface JWT {
    uid: string;
    plan?: "none" | "basic" | "premium";
  }
}