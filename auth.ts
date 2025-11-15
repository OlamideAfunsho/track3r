// auth.ts (NextAuth v5)
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { supabase } from "@/lib/supabaseServer";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>
      ) {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) return null;

        // Fetch user from Supabase
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

        if (error || !user) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image ?? null,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({
  user,
  account,
}: {
  user: any;
  account?: any;
}) {
  const userEmail = user.email;

  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", userEmail)
    .maybeSingle();

  if (!existingUser) {
    await supabase.from("users").insert([
      {
        id: crypto.randomUUID(),
        name: user.name || userEmail.split("@")[0],
        email: userEmail,
        provider: account?.provider,
        image: user.image ?? null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  }

  return true;
},


    async jwt({
      token,
      user,
    }: {
      token: Record<string, any>;
      user?: any;
    }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image ?? null;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: any;
      token: Record<string, any>;
    }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.picture,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.AUTH_SECRET_KEY,
});
