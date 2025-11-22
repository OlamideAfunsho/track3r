// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    // This prevents double submission
    const [loading, setLoading] = useState(false); 
    
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true); 

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
                setError(data.error || "Signup failed");
                return;
            }

            setSuccess("Account created! Redirecting to verification...");
            setName("");
            setEmail("");
            setPassword("");

            // Redirect to verify page
            router.push(`/verify?email=${data.email}`); 

        } catch (err: any) {
            setError(err.message || "A network error occurred.");
            
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex flex-col gap-2 min-h-screen items-center justify-center">
            <Link href='/'><Image src={logo} alt="trac3r-logo" className="w-40" /></Link>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-6 shadow-2xl rounded-md w-[300px]"
            >
                <h1 className="text-xl font-semibold text-center text-[#544DF2]">
                    Sign Up
                </h1>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-b outline-none pr-4 py-2 text-[14px]"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-b outline-none pr-4 py-2 text-[14px]"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-b outline-none pr-4 py-2 text-[14px]"
                    required
                />

                <button
                    type="submit"
                    disabled={loading} 
                    className="bg-[#544DF2] text-white py-2 rounded-full cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-75"
                >
                    {/* Display loading state feedback */}
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
            </form>
        </div>
    );
}