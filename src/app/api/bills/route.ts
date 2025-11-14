import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { supabase } from "@/lib/supabaseClient";

// POST — add a new bill
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, amount, due_date, logo_url } = body;

  const { error } = await supabase.from("bills").insert([
    {
      title,
      amount,
      due_date,
      logo_url,
      user_id: session.user.id, // attach bill to logged-in user
    },
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Bill added successfully" });
}


// GET — fetch all bills
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ bills: [] });
  }

  const { data: bills, error } = await supabase
    .from("bills")
    .select("*")
    .eq("user_id", session.user.id);

  return NextResponse.json({ bills });
}

