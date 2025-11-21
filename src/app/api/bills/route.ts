// app/api/bills/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { sendEmail } from "@/lib/sendEmail";
import { NextRequest } from "next/server";


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

// Ensures the user exists in public.users
async function ensureUserExists(supabase: any, session: any) {
  const userId = session.user.id;
  const userEmail = session.user.email;
  const userName = session.user.name ?? userEmail?.split("@")[0] ?? null;

  // 1. Check by id
  const { data: byId } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (byId) return byId.id;

  // 2. Check by email
  const { data: byEmail } = await supabase
    .from("users")
    .select("id")
    .eq("email", userEmail)
    .maybeSingle();

  if (byEmail) return byEmail.id;

  // 3. Create user (fallback)
  const newUser = {
    id: userId,
    email: userEmail,
    name: userName,
    provider: "google",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { error: insertError } = await supabase.from("users").insert(newUser);
  if (insertError) {
    console.log("Error auto-creating user:", insertError);
  }

  return userId;
}

// POST — create bill
export async function POST(req: NextRequest) {
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

  // Send email notification
sendEmail(
  session.user.email!,
  "New Bill Added",
  `<p>Hi ${session.user.name},</p>
   <p>You added a new bill:</p>
   <ul>
     <li>Title: ${title}</li>
     <li>Amount: ${amount}</li>
     <li>Due Date: ${due_date}</li>
   </ul>`
).catch((err) => console.error("Email sending failed:", err));



  return NextResponse.json({ message: "Bill added successfully" });
}

// GET — fetch bills
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ bills: [] });
  }

  const supabase = await createSupabaseServerClient();

  // Ensure user exists for GET as well
  const stableUserId = await ensureUserExists(supabase, session);

  const { data: bills, error } = await supabase
    .from("bills")
    .select("*")
    .eq("user_id", stableUserId)
    .order("due_date", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bills });
}
