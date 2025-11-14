import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    // 🔐 Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Insert directly into public.users table
    const { data, error } = await supabase.from("users").insert([
      {
        id: crypto.randomUUID(),
        name,
        email,
        password: hashedPassword,
        provider: "email",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Signup successful!", user: data?.[0] },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Unexpected signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
