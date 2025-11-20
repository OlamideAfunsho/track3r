import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { supabase } from "@/lib/supabaseServer";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      // Credentials provider for email/password sign-in
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
  const email = String(credentials?.email ?? "");
  const password = credentials?.password;

  if (!email || !password) return null;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error || !user) return null;

  // Block login if email is not verified
  if (!user.is_verified) {
    throw new Error("Email not verified");
  }

  // Check password
  const isValid = await compare(String(password), String(user.password));
  if (!isValid) return null;

  return {
    id: String(user.id),
    name: String(user.name ?? ""),
    email: String(user.email),
    image: user.image ?? null,
    emailVerified: null,
  };
}

    }),
  ],

  callbacks: {
    // signIn: run on any provider (Google or credentials)
    async signIn({ user, account }: any) {
  if (!user?.email) return false;
  const userEmail = String(user.email);

  // Fetch existing user from Supabase
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", userEmail)
    .maybeSingle();

  let finalId: string;

  if (!existingUser) {
    // New user → insert
    finalId = crypto.randomUUID();

    await supabase.from("users").insert([
      {
        id: finalId,
        name: user?.name ?? userEmail.split("@")[0],
        email: userEmail,
        provider: account?.provider ?? "credentials",
        image: user?.image ?? null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_verified: account?.provider === "google" ? true : false, // Google verified automatically
      },
    ]);
  } else {
    // Existing user → check if Google and not verified
    finalId = String(existingUser.id);
    if (account?.provider === "google" && !existingUser.is_verified) {
      await supabase
        .from("users")
        .update({ is_verified: true, updated_at: new Date().toISOString() })
        .eq("id", finalId);
    }

    // Block credentials login if not verified
    if (existingUser.provider === "credentials" && !existingUser.is_verified) {
      throw new Error("Email not verified");
    }
  }

  // Ensure NextAuth user object is shaped correctly
  user.id = finalId;
  user.email = userEmail;
  user.name = user?.name ?? userEmail.split("@")[0];
  user.image = user?.image ?? null;
  user.emailVerified = account?.provider === "google" ? new Date().toISOString() : null;

  return true;
},


    // jwt: attach stable values to the token
    async jwt({ token, user }: any) {
      if (user) {
        token.id = String(user.id);
        token.name = String(user.name ?? "");
        token.email = String(user.email ?? "");
        token.picture = user.image ?? null;
        token.emailVerified = user.emailVerified ?? null;
      }
      return token;
    },

    // session: expose the fields clients expect (must satisfy AdapterUser & Session)
    async session({ session, token }: any) {
      session.user = {
        // These casts guarantee types are strings (or null) and satisfy NextAuth adapter typing
        id: String(token.id ?? ""),
        name: String(token.name ?? ""),
        email: String(token.email ?? ""),
        image: token.picture ?? null,
        // NextAuth adapter expects emailVerified present (Date | null). We keep null if unknown.
        emailVerified: token.emailVerified ?? null,
      };

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.AUTH_SECRET_KEY,
});
