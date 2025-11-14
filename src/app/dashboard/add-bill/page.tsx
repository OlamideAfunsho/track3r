"use client";

import { useState } from "react";
import { afacad } from "@/app/fonts";
import { getLogoUrl } from "@/lib/getLogoUrl";
import { toast, ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";

export default function AddBillForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error("You must be logged in to add a bill.");
      return;
    }

    setLoading(true);
    const logo_url = getLogoUrl(title);

    try {
      const res = await fetch("/api/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          due_date: dueDate,
          logo_url,
          user_id: session.user.id, // link bill to logged-in user
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data);
        toast.error(`Error adding bill: ${data.error || "Something went wrong"}`);
      } else {
        toast.success("Bill added successfully!");
        setTitle("");
        setAmount("");
        setDueDate("");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center md:h-full">
      <ToastContainer position="top-right" autoClose={2000} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[300px]">
        <input
          type="text"
          placeholder="Bill Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={`${afacad.className} border p-2 rounded outline-none`}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className={`${afacad.className} border p-2 rounded outline-none`}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className={`${afacad.className} border p-2 rounded outline-none`}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#544df2] text-white py-2 rounded cursor-pointer hover:bg-[rgba(84,77,242,0.8)] disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Bill"}
        </button>
      </form>
    </div>
  );
}
