'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import trashIcon from "../../../../public/trash-icon.svg";
import Link from "next/link";
import { afacad } from "@/app/fonts";

interface Bill {
    id: string;
    title: string;
    amount: number;
    due_date: string;
    logo_url?: string | null;
}

export default function SubscriptionsTable({ initialBills }: { initialBills: Bill[] }) {
    const [bills, setBills] = useState(initialBills);

    // This determines status based on due_date
    const getStatus = (dueDate: string): "Upcoming" | "Due Soon" | "Expired" => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "Expired";
        if (diffDays <= 7) return "Due Soon";
        return "Upcoming";
    };

    const handleDelete = async (id: string) => {
        const { error } = await supabase.from("bills").delete().eq("id", id);

        if (error) {
            console.error("Error deleting bill:", error);
            alert("Error deleting bill");
        } else {
            setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
            alert("Bill deleted successfully!");
        }
    };

    const confirmDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this bill?")) {
            handleDelete(id);
        }
    };

    if (bills.length === 0) {
        return (
            <div className='flex gap-2 justify-center items-center h-full'>
                <p>No bills yet. Add one to get started!</p>
                <Link href='/dashboard/add-bill' className='bg-[#544DF2] text-[14px] text-[#FFFFFF] px-[16px] py-[6px] rounded-[8px] hover:bg-[rgba(84,77,242,0.8)]'>
                    Add Bill <span className='text-[20px]'>+</span>
                </Link>
            </div>
        );
    }

    // Helper function: This returns color based on status
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

            <div className="w-full m-auto md:w-3/5 md:p-4 border rounded-[7px] bg-[#F2F7FF] md:mt-6 md:ml-6 mb-6">
                <div className="overflow-x-auto">
                    <table className={`${afacad.className} min-w-full text-sm text-left`}>
                        <thead className="text-[#50545E] text-[16px]">
                            <tr>
                                <th className="px-3 md:px-6 py-2 md:py-4">Service</th>
                                <th className="md:px-6 md:py-4">Amount</th>
                                <th className="md:px-6 md:py-4">Due Date</th>
                                <th className="md:px-6 md:py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((bill) => {
                                const status = getStatus(bill.due_date);
                                const statusColor = getStatusColor(status);

                                return (
                                    <tr key={bill.id}>
                                        <td className="flex gap-1 items-center px-4 md:px-6 py-3 md:py-4 font-medium text-[#50545E]">
                                            {bill.logo_url && (
                                                <img
                                                    src={bill.logo_url}
                                                    alt={`${bill.title} logo`}
                                                    className="w-6 h-6"
                                                />
                                            )}
                                            {bill.title}
                                        </td>
                                        <td className=" md:px-6 py-3 md:py-4 text-[#50545E]">₦{bill.amount}</td>
                                        <td className=" md:px-6 py-3 md:py-4 text-[#50545E]">{bill.due_date}</td>
                                        <td className={` md:px-6 py-3 md:py-4 font-medium ${statusColor}`}>{status}</td>
                                        <td className=" md:px-6 md:py-4">
                                            <button onClick={() => confirmDelete(bill.id)}>
                                                <Image src={trashIcon} alt="trash-icon" className="w-8 h-8 cursor-pointer" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Link href='/dashboard/add-bill' className='bg-[#544DF2] text-[14px] text-[#FFFFFF] px-[20px] py-[10px] ml-6 rounded-[8px] hover:bg-[rgba(84,77,242,0.8)]'>
                Add Bill <span className='text-[20px]'>+</span>
            </Link>
        </>

    );
}
