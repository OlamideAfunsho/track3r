"use client";

import { useState } from "react";
import Image from "next/image";
import trashIcon from "../../../../public/trash-icon.svg";
import Link from "next/link";
import { afacad } from "@/app/fonts";
import { toast, ToastContainer } from "react-toastify";

interface Bill {
  id: string;
  title: string;
  amount: number;
  due_date: string;
  logo_url?: string | null;
}

export default function SubscriptionsTable({ initialBills }: { initialBills: Bill[] }) {
  const [bills, setBills] = useState(initialBills);

  const getStatus = (dueDate: string): "Upcoming" | "Due Soon" | "Expired" => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays <= 7) return "Due Soon";
    return "Upcoming";
  };

  const handleDelete = async (billId: string) => {
    try {
      const response = await fetch(`/api/bills/${billId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete bill");
      }

      setBills((prev) => prev.filter((bill) => bill.id !== billId));
      toast.success("Bill deleted successfully!");
    } catch (error) {
      console.error("Error deleting bill:", error);
      toast.error("Could not delete bill.");
    }
  };

  const confirmDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this bill?")) {
      handleDelete(id);
    }
  };

  if (bills.length === 0) {
    return (
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center h-[420px]">
        <p>No bills yet. Add one to get started!</p>
       <Link
        href="/dashboard/add-bill"
        className="bg-[#544DF2] text-[14px] text-[#FFFFFF] px-5 py-1.5 ml-6 rounded-xl shadow-[inset_0px_4px_11.2px_0px_#FAFAFAA1] hover:bg-[rgba(84,77,242,0.8)]"
      >
        Add Bill <span className="text-[20px]">+</span>
      </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "text-[#1DC23B]";
      case "Due Soon":
        return "text-[#FFCD0F]";
      case "Expired":
        return "text-[#FE1245]";
      default:
        return "";
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <h1 className={`${afacad.className} text-center md:text-left ml-6 mb-4 text-2xl`}>
        View <span className="text-[#544DF2]">All Your</span> Subscriptions
      </h1>

      <div className="w-full m-auto md:w-3/5 md:p-4 border rounded-[7px] bg-[#F2F7FF] md:mt-6 md:ml-6 mb-6">
        <div className="overflow-x-auto">
          <table className={`${afacad.className} min-w-full text-sm text-left`}>
            <thead className="text-[#50545E] text-[16px]">
              <tr>
                <th className="px-4 py-2">Service</th>
                <th className="px-2 py-2">Amount</th>
                <th className="px-2 py-2">Due Date</th>
                <th className="px-2 py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {bills.map((bill) => {
                const status = getStatus(bill.due_date);
                const statusColor = getStatusColor(status);

                return (
                  <tr key={bill.id} className="">
                    <td className="flex gap-1 items-center px-4 py-2.5 mr-2 md:mr-0 text-[#50545E] font-medium">
                      {bill.logo_url && (
                        <img src={bill.logo_url} alt="logo" className="w-6 h-6" />
                      )}
                      {bill.title}
                    </td>

                    <td className="px-2 text-[#50545E]">
                      ₦{bill.amount.toLocaleString()}
                    </td>

                    <td className="px-2 text-[#50545E]">
                      {new Date(bill.due_date).toLocaleDateString()}
                    </td>

                    <td className={`px-2 font-bold ${statusColor}`}>
                      {status}
                    </td>

                    <td className="px-4 text-center">
                      <button onClick={() => confirmDelete(bill.id)}>
                        <Image
                          src={trashIcon}
                          alt="trash-icon"
                          className="w-7 h-7 cursor-pointer"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Link
        href="/dashboard/add-bill"
        className="bg-[#544DF2] text-[14px] text-[#FFFFFF] px-5 py-3 ml-6 rounded-xl shadow-[inset_0px_4px_11.2px_0px_#FAFAFAA1] hover:bg-[rgba(84,77,242,0.8)]"
      >
        Add Bill <span className="text-[20px]">+</span>
      </Link>
    </>
  );
}
