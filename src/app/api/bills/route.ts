// app/api/bills/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

// POST — create bill
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createSupabaseServerClient();
  const { title, amount, due_date, logo_url } = await req.json();

  const { error } = await supabase.from("bills").insert({
    title,
    amount,
    due_date,
    logo_url,
    user_id: session.user.id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Bill added successfully" });
}

// GET — fetch bills
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ bills: [] });
  }

  const supabase = await createSupabaseServerClient();

  const { data: bills, error } = await supabase
    .from("bills")
    .select("*")
    .eq("user_id", session.user.id)
    .order("due_date", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bills });
}
