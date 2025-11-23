import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { sendEmail } from "@/lib/sendEmail";
import { NextRequest } from "next/server";
import { supabase as supabaseAdmin } from "@/lib/supabaseServer"; // Use the Service Role Client (Admin)

// NOTE: createSupabaseServerClient is kept for the bills insert/select, 
// likely using RLS or specific user session cookies.
async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  // NOTE: This client initialization uses SUPABASE_SERVICE_ROLE_KEY! 
  // If this key is a service role key, RLS is bypassed. 
  // If it should be an RLS-enforced client, the key should be the anon/public key.
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
// Now uses the imported supabaseAdmin client directly for guaranteed database write
async function ensureUserExists(session: any) { 
  const userId = session.user.id;
  const userEmail = session.user.email;
  const userName = session.user.name ?? userEmail?.split("@")[0] ?? null;

  // 1. Check by id
  const { data: byId } = await supabaseAdmin // Use Admin Client
    .from("users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (byId) return byId.id;

  // 2. Check by email
  const { data: byEmail } = await supabaseAdmin // Use Admin Client
    .from("users")
    .select("id")
    .eq("email", userEmail)
    .maybeSingle();

  if (byEmail) return byEmail.id;

  // 3. Create user (fallback)
  // This fallback covers pre-existing sessions that were created before 
  // the NextAuth callback fix.
  const newUser = {
    id: userId,
    email: userEmail,
    name: userName,
    provider: "google", // Assumed provider for this fallback context
    is_verified: true, // Auto-verify users created via Google/OAuth fallback
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { error: insertError } = await supabaseAdmin.from("users").insert(newUser); // ⬅️ Use Admin Client
  if (insertError) {
    console.error("Error auto-creating user:", insertError); // Changed console.log to console.error
  }

  return userId;
}

// POST — create bill
export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Ensure user exists and get the stable ID before inserting the bill
  const stableUserId = await ensureUserExists(session);

  const supabase = await createSupabaseServerClient();
  const { title, amount, due_date, logo_url } = await req.json();

  const { error } = await supabase.from("bills").insert({
    title,
    amount,
    due_date,
    logo_url,
    user_id: stableUserId, // Use the ID guaranteed to be in the users table
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send email notification
  // Note: We use session.user.email and name because that data comes from NextAuth session
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

  // Ensure user exists and get the stable ID before fetching bills
  const stableUserId = await ensureUserExists(session);

  const supabase = await createSupabaseServerClient();

  const { data: bills, error } = await supabase
    .from("bills")
    .select("*")
    // Use the stable ID guaranteed to be in the users table
    .eq("user_id", stableUserId) 
    .order("due_date", { ascending: true });
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bills });
}