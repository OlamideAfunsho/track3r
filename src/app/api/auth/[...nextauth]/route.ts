import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    // GOOGLE LOGIN
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // EMAIL + PASSWORD LOGIN
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        const { data: users, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .limit(1);

        if (error) throw new Error(error.message);

        const user = users?.[0];
        if (!user) return null;
        if (!user.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid password");

        // MUST RETURN emailVerified to satisfy TypeScript
        return {
          id: user.id,
          name: user.name || email.split("@")[0],
          email: user.email as string,
          image: user.image || null,
          emailVerified: null,
        };
      },
    }),
  ],

  callbacks: {
    // HANDLE USER CREATION (GOOGLE + EMAIL)
    async signIn({ user, account }) {
      const userEmail = user.email ?? "";

      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("email", userEmail)
        .maybeSingle();

      if (!existingUser) {
        await supabase.from("users").insert([
          {
            id: crypto.randomUUID(),
            name: user.name || userEmail.split("@")[0] || "",
            email: userEmail,
            provider: account?.provider,
            image: user.image || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      }

      return true;
    },

    // JWT CALLBACK
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.emailVerified = null; // REQUIRED
      }
      return token;
    },

    // SESSION CALLBACK → FIX IS HERE
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name,
        email: token.email as string,
        image: token.picture,
        emailVerified: null, // REQUIRED
      };
      return session;
    },
  },

  secret: process.env.AUTH_SECRET_KEY,

  pages: {
    signIn: "/login",
  },
});
