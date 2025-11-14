"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import logo from '../../../public/logo.svg';
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      setSuccess("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");

      // Optionally, sign in automatically
      await signIn("credentials", { redirect: false, email: data.email, password });

      // Redirect to dashboard after 1.5s
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-center">
      <Image src={logo} alt="trac3r-logo" className="w-40" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 border rounded-md w-[300px]"
      >
        <h1 className="text-xl font-semibold text-center text-[#544DF2]">Sign Up</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 rounded-full text-[14px]"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 rounded-full text-[14px]"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 rounded-full text-[14px]"
          required
        />

        <button
          type="submit"
          className="bg-[#544DF2] text-white py-2 rounded-full cursor-pointer hover:opacity-75 transition"
        >
          Sign Up
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
      </form>
    </div>
  );
}
