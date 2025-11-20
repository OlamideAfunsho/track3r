// /app/api/verify/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Verification code is required" },
        { status: 400 }
      );
    }

    // Get user
    const { data: user } = await supabase
      .from("users")
      .select("id, verification_code, verification_expires, is_verified")
      .eq("email", email)
      .maybeSingle();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.is_verified) {
      return NextResponse.json(
        { error: "User already verified" },
        { status: 400 }
      );
    }

    // Wrong code
    if (user.verification_code !== code) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Expired code
    if (new Date() > new Date(user.verification_expires)) {
      return NextResponse.json(
        { error: "Verification code has expired" },
        { status: 400 }
      );
    }

    // Update (NO select(), to avoid RLS blocking)
    const { error: updateError } = await supabase
      .from("users")
      .update({
        is_verified: true,
        verification_code: null,
        verification_expires: null,
        updated_at: new Date().toISOString(),
      })
      .eq("email", email);

    if (updateError) {
      console.error("Verify error:", updateError);
      return NextResponse.json(
        { error: "Could not verify email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email verified successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Verify API error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
