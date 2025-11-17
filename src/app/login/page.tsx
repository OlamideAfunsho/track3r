"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import logo from '../../../public/logo.svg';
import googleLogo from '../../../public/google-logo.svg';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession(); // <-- useSession hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
  if (status === "authenticated") {
    router.replace("/dashboard");
  }
}, [status]);


  const handleEmailLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false, // stay on same page and handle manually
  });

  setLoading(false);

  if (res?.error) {
    setError("Invalid email or password");
    return;
  }

  router.push("/dashboard");
};






  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center bg-gray-50">
      <Link href='/'><Image src={logo} alt="trac3r-logo" className="w-40" /></Link>
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl text-[#544DF2] font-semibold text-center mb-1">Sign In</h1>
        <p className="text-center text-[#929297] mb-6">Please sign in to continue</p>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#544DF2]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#544DF2]"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#544DF2] text-white rounded-full hover:opacity-75 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <span className="text-[#929297] text-sm">or</span>
        </div>

        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center gap-2 w-full mt-4 py-2 text-[#929297] bg-gray-500/10 rounded-full cursor-pointer"
        >
          <Image src={googleLogo} alt="google-logo" className="w-5" />
          Sign in with Google
        </button>

        <p className="text-sm text-center text-[#929297] mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#544DF2] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
