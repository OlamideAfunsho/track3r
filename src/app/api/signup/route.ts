// /app/api/signup/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiration = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    const userId = crypto.randomUUID();

    // Insert unverified user (NO .select() to avoid RLS errors)
    const { error: insertError } = await supabase
      .from("users")
      .insert([
        {
          id: userId,
          name: name ?? email.split("@")[0],
          email,
          password: hashedPassword,
          provider: "credentials",
          is_verified: false,
          verification_code: otp,
          verification_expires: expiration,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: "Could not create account" },
        { status: 500 }
      );
    }

    // Send OTP email
    await sendEmail(
      email,
      "Verify Your Track3r Account",
      `
        <h2>Your Track3r Verification Code</h2>
        <p>Use the 6-digit code below to verify your account:</p>
        <h1 style="letter-spacing: 6px; font-size: 28px;">${otp}</h1>
        <p>This code expires in <strong>15 minutes</strong>.</p>
      `
    );

    return NextResponse.json(
      {
        success: true,
        email,
        message: "Verification code sent to your email",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
