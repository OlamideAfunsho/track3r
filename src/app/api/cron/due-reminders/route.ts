// app/api/cron/due-reminders/route.ts
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { sendEmail } from "@/lib/sendEmail";

// Create Supabase server client with service role key
async function supabaseAdmin() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get() { return ""; },
        set() {},
        remove() {},
      },
    }
  );
}

export async function GET(req: Request) {
  // 1️⃣ Check CRON_SECRET for security
  const authHeader = req.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await supabaseAdmin();

  // 2️⃣ Fetch all bills + user info
  const { data: bills, error } = await supabase
    .from("bills")
    .select(`
      id,
      title,
      amount,
      due_date,
      notified_due_soon,
      notified_due_today,
      user:users!user_id(email, name)
    `);

  if (error) {
    console.error("DB error:", error);
    return NextResponse.json({ error: "Failed to fetch bills" }, { status: 500 });
  }

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  for (const bill of bills ?? []) {
    const due = new Date(bill.due_date);
    const user = Array.isArray(bill.user) ? bill.user[0] : bill.user;

    if (!user || !user.email) continue;

    const email = user.email;
    const name = user.name ?? "there";

    // 3️⃣ Bill due soon (7 days before)
    const isDueSoon =
      due >= today &&
      due <= nextWeek &&
      bill.notified_due_soon !== true;

    if (isDueSoon) {
      await sendEmail(
        email,
        "Your bill is due soon",
        `<p>Hi ${name},</p>
         <p>Your bill is due soon:</p>
         <ul>
           <li><b>Title:</b> ${bill.title}</li>
           <li><b>Amount:</b> ${bill.amount}</li>
           <li><b>Due Date:</b> ${bill.due_date}</li>
         </ul>`
      );

      await supabase
        .from("bills")
        .update({ notified_due_soon: true })
        .eq("id", bill.id);
    }

    // 4️⃣ Bill due today
    const isDueToday =
      due.toDateString() === today.toDateString() &&
      bill.notified_due_today !== true;

    if (isDueToday) {
      await sendEmail(
        email,
        "Bill due today",
        `<p>Hi ${name},</p>
         <p>Your bill is due today:</p>
         <ul>
           <li><b>Title:</b> ${bill.title}</li>
           <li><b>Amount:</b> ${bill.amount}</li>
           <li><b>Due Date:</b> ${bill.due_date}</li>
         </ul>`
      );

      await supabase
        .from("bills")
        .update({ notified_due_today: true })
        .eq("id", bill.id);
    }
  }

  return NextResponse.json({ message: "Due bills checked successfully" });
}
