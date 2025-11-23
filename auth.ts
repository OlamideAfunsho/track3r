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
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const email = String(credentials?.email ?? "");
        const password = credentials?.password;

        if (!email || !password) return null;

        // Use the Admin Client for guaranteed read access
        const { data: user, error } = await supabase 
          .from("users")
          .select("id, name, email, image, password, is_verified")
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

        // Return the user object
        return {
          id: String(user.id),
          name: String(user.name ?? ""),
          email: String(user.email),
          image: user.image ?? null,
          emailVerified: user.is_verified ? new Date().toISOString() : null,
        };
      }
    }),
  ],

  callbacks: {
    // signIn: run on any provider (Google or credentials). Used here for DB sync.
    async signIn({ user, account }: any) {
        if (!user?.email) return false;
        const userEmail = String(user.email);
        const isGoogle = account?.provider === "google";
        
        // Use Admin Client for guaranteed read/write operations
        const { data: existingUser } = await supabase 
            .from("users")
            .select("id, name, email, is_verified, provider")
            .eq("email", userEmail)
            .maybeSingle();

        let finalId: string;
        let isVerifiedStatus: boolean;

        if (!existingUser) {
            // NEW USER: Create the user in the custom table.
            finalId = crypto.randomUUID();
            isVerifiedStatus = isGoogle ? true : false; // Auto-verify Google users (Fix 3B)

            const { error } = await supabase.from("users").insert({
                id: finalId,
                name: user?.name ?? userEmail.split("@")[0],
                email: userEmail,
                provider: account?.provider ?? "credentials",
                image: user?.image ?? null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                is_verified: isVerifiedStatus, 
            });

            if (error) {
                console.error("Supabase insert error in signIn callback:", error);
                // Return false or throw error to prevent session creation
                return false; 
            }

        } else {
            // EXISTING USER: Update and check verification status
            finalId = String(existingUser.id);
            isVerifiedStatus = existingUser.is_verified;

            if (isGoogle && !existingUser.is_verified) {
                // Google user signs in: auto-verify them (Fix 3B)
                await supabase
                    .from("users")
                    .update({ is_verified: true, updated_at: new Date().toISOString() })
                    .eq("id", finalId);
                isVerifiedStatus = true; // Update local status
            }

            // Block credentials login if still not verified (only for credentials provider)
            if (existingUser.provider === "credentials" && !isVerifiedStatus) {
                // Note: The logic in authorize() above already throws this error, 
                // but this acts as an extra failsafe if provider logic were bypassed.
                throw new Error("Email not verified");
            }
        }
        
        // CRUCIAL: Attach the **stable database ID** to the NextAuth user object 
        // before it gets passed to the JWT callback
        user.id = finalId; 
        user.email = userEmail;
        user.name = user?.name ?? userEmail.split("@")[0];
        user.image = user?.image ?? null;
        user.isVerified = isVerifiedStatus; // Pass verification status

        return true;
    },


    // jwt: attach stable values to the token
    async jwt({ token, user }: any) {
        if (user) {
            // Attach the guaranteed stable database ID from the signIn callback (Fix 2)
            token.id = String(user.id); 
            token.name = String(user.name ?? "");
            token.email = String(user.email ?? "");
            token.picture = user.image ?? null;
            // Use the isVerified status from the signIn logic
            token.emailVerified = user.isVerified ? new Date().toISOString() : null; 
            // Custom field to simplify access to verification status in the session
            token.isVerified = user.isVerified; 
        }
        return token;
    },

    // session: expose the fields clients expect (must satisfy AdapterUser & Session)
    async session({ session, token }: any) {
        session.user = {
            id: String(token.id ?? ""),
            name: String(token.name ?? ""),
            email: String(token.email ?? ""),
            image: token.picture ?? null,
            emailVerified: token.emailVerified ?? null,
        };
        // Expose verification status for client-side checks
        session.user.isVerified = token.isVerified; 
        
        return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.AUTH_SECRET_KEY,
});