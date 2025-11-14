import { supabase } from "@/lib/supabaseClient";
import { useSession } from "next-auth/react";

export function useSupabaseWithSession() {
  const { data: session } = useSession();

  const accessToken = (session as any)?.access_token;

  if (accessToken) {
    supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: "", // optional
    });
  }

  return supabase;
}
