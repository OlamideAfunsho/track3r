'use client';
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import logo from '../../../public/logo.svg';
import { afacad, dmSans } from "../fonts";


export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleVerify() {
    if (!email) {
      setMessage("Email missing. Please sign up again.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.error) {
        setMessage(data.error);
        return;
      }

      router.push("/login?verified=true");
    } catch (err) {
      setLoading(false);
      setMessage("Something went wrong. Please try again.");
      console.error(err);
    }
  }

  return (
    <div className={`${afacad.className} flex flex-col gap-2 h-screen justify-center items-center p-5 max-w-[400px] m-auto`}>
      <Image src={logo} alt="track3r-logo" />

      <h1 className="text-xl font-medium">Email Verification</h1>

      <p>
        Enter the OTP sent to <strong>{email}</strong>
      </p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full p-2.5 mb-2.5 border border-[#CCC] rounded-[5px]"
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full p-2.5 bg-[#544DF2] text-[#FFF] rounded-[5px] border-none hover:opacity-90 cursor-pointer"
      >
        {loading ? "Verifying..." : "Verify Email"}
      </button>

      {message && (
        <p style={{ marginTop: "10px", color: "red" }}>{message}</p>
      )}
    </div>
  );
}
