"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { afacad } from "@/app/fonts";

export default function AddBillForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.from("bills").insert([
      { title, amount: Number(amount), due_date: dueDate },
    ]);

    if (error) {
  console.error("Supabase error:", error);
  alert(`Error adding bill: ${error.message}`);
} else {
      alert("Bill added successfully!");
      setTitle("");
      setAmount("");
      setDueDate("");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-full">
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
        type="text"
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
        className="bg-[#544df2] text-white py-2 rounded cursor-pointer hover:bg-[rgba(84,77,242,0.8)]"
      >
        {loading ? "Adding..." : "Add Bill"}
      </button>
    </form>
    </div>
    
  );
}
