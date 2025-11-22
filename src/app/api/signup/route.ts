// /app/api/signup/route.ts

import { NextResponse } from "next/server";
import * as crypto from 'crypto';
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
        // Set expiration 15 minutes from now
        const expiration = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        // Hash the OTP
        const hashedOtp = await bcrypt.hash(otp, 10);

        const userId = crypto.randomUUID();

        // Insert unverified user
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
                    verification_code: hashedOtp,
                    verification_expires: expiration,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            ]);

        if (insertError) {
            console.error("Supabase Insert error:", insertError);
            return NextResponse.json(
                { error: "Could not create account due to database error" },
                { status: 500 }
            );
        }

        // Send OTP email - Wrapped in try/catch for resilience 
        try {
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
        } catch (emailError) {
            console.warn("⚠️ WARNING: Email failed to send for user:", email, emailError);
        }


        return NextResponse.json(
            {
                success: true,
                email,
                message: "Verification code sent to your email",
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Signup Route Fatal Error:", err);
        return NextResponse.json(
            { error: "A fatal server error occurred during signup processing." },
            { status: 500 }
        );
    }
}