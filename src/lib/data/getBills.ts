import { supabase } from "@/lib/supabaseClient";

export async function getBills() {
  const { data: bills, error } = await supabase.from("bills").select("*");
  if (error) console.error(error);
  return bills;
}
