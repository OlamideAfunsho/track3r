// auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig: Partial<NextAuthConfig> = {
  pages: {
    signIn: "/login",
  },
};
