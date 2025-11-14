import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabaseServerClient"; // we'll add this next

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerSupabaseClient();

  // Get the logged-in user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { error } = await supabase
    .from("bills")
    .delete()
    .eq("id", params.id)
    .eq("user_id", user.id); // ensures they can only delete their own bill

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Bill deleted successfully" });
}
