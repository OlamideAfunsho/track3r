"use client";

import React, { useState, useEffect } from "react";
import { afacad } from "../fonts";
import Image from "next/image";
import waveEmoji from "../../../public/waving-hand-emoji.svg";
import DashboardStats from "./components/DashboardStats";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session, status } = useSession();
  const [bills, setBills] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // prevent early redirect
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // console.log(session);
  const defaultProfilePicture = '../../../public/user-icon.svg';
  const userProfilePicture = session?.user?.image || defaultProfilePicture;

  useEffect(() => {
    const fetchBills = async () => {
      if (status === "authenticated") {
        try {
          const res = await fetch("/api/bills");
          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || "Failed to load bills");
          }

          setBills(data.bills || []);
        } catch (err: any) {
          console.error(err);
          setError("Failed to load bills");
        }
      }
    };

    fetchBills();
  }, [status]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  // If session is loading, prevent flashing or redirect loops
  if (status === "loading") {
    return <p className="p-10">Loading dashboard...</p>;
  }

  // If still no session, return nothing (router is redirecting)
  if (status === "unauthenticated") {
    return null;
  }

  // Utility: Determine bill status
  const getStatus = (dueDate: string): "Upcoming" | "Due Soon" | "Expired" => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil(
      (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return "Expired";
    if (diffDays <= 7) return "Due Soon";
    return "Upcoming";
  };

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

  if (error) {
    return <p className="p-10 text-red-500">{error}</p>;
  }

  // If user has no bills
  if (!bills || bills.length === 0) {
    return (
      <div className="">
        <div className="w-full flex items-center justify-between px-5 bg-[#FFFFFF] h-[50px]">
        <h1 className={`${afacad.className} text-[#6D6666] text-2xl`}>
          Dashboard
        </h1>
       
       
       <div className="flex items-center gap-2">
        <Image src={userProfilePicture} width={30} height={30} alt="user-profile-picture" className="rounded-full w-7 h-7 " />
        <div className="flex flex-col items-start">
          <button
          onClick={handleSignOut}
          className="text-[#544DF2] hover:text-[#3e3abf] text-sm font-medium cursor-pointer"
        >
          Logout
        </button>

        <span className="text-[12px]">{session?.user?.email}</span>
        </div>
         
        
       </div>
        
      </div>
        <div className="text-center py-10 h-[450px]">
          <div className="flex items-center justify-center mb-4 ">
            <h1
              className={`${afacad.className} text-2xl font-medium md:text-3xl lg:text-4xl`}
            >
              Welcome,{" "}
              <span className="text-[#544DF2]">{session?.user?.name}</span>
            </h1>
            <Image src={waveEmoji} alt="waving-emoji" className="h-8 w-auto" />
          </div>

          <h1 className="mb-4">No bills yet. Add one to get started!</h1>
          <Link
            href="/dashboard/add-bill"
            className="bg-[#544DF2] text-[14px] text-[#FFFFFF] px-5 py-3 ml-6 rounded-xl shadow-[inset_0px_4px_11.2px_0px_#FAFAFAA1] hover:bg-[rgba(84,77,242,0.8)]"
          >
            Add Bill <span className="text-[20px]">+</span>
          </Link>
        </div>

        
          
        
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <div className="w-full flex items-center justify-between px-5 bg-[#FFFFFF] h-[50px]">
        <h1 className={`${afacad.className} text-[#6D6666] text-2xl`}>
          Dashboard
        </h1>
       
       
       <div className="flex items-center gap-2">
        <Image src={userProfilePicture} width={30} height={30} alt="user-profile-picture" className="rounded-full w-7 h-7 " />
        <div className="flex flex-col items-start">
          <button
          onClick={handleSignOut}
          className="text-[#544DF2] hover:text-[#3e3abf] text-sm font-medium cursor-pointer"
        >
          Logout
        </button>

        <span className="text-[12px]">{session?.user?.email}</span>
        </div>
         
        
       </div>
        
      </div>

      {/* Content */}
      <div className="container px-6 py-6">
        <div className="flex flex-col items-start md:flex-row gap-2 md:items-center justify-between">
          <div className="flex items-center">
            <h1
              className={`${afacad.className} text-2xl font-medium md:text-3xl lg:text-4xl`}
            >
              Welcome,{" "}
              <span className="text-[#544DF2]">{session?.user?.name}</span>
            </h1>
            <Image src={waveEmoji} alt="waving-emoji" className="h-8 w-auto" />
          </div>

          <Link
            href="/dashboard/add-bill"
            className="bg-[#544DF2] text-[14px] text-[#FFFFFF] px-5 py-2 ml-6 rounded-xl shadow-[inset_0px_4px_11.2px_0px_#FAFAFAA1] hover:bg-[rgba(84,77,242,0.8)]"
          >
            Add Bill <span className="text-[20px]">+</span>
          </Link>
        </div>

        <DashboardStats />

        <h1 className={`${afacad.className} text-[#667085] text-[18px] mt-10`}>
          Subscriptions
        </h1>

        <Link
          href="/dashboard/subscriptions"
          className={`${afacad.className} text-[#9C98F7] text-[16px] hover:text-[#544DF2]`}
        >
          Manage your subscriptions
        </Link>

        {/* Subscriptions Table */}
        <div className="w-full md:w-full lg:w-3/5 p-4 border rounded-[7px] bg-[#F2F7FF] mt-4">
          <div className="overflow-x-auto">
            <table
              className={`${afacad.className} min-w-full text-sm text-left`}
            >
              <thead className="text-[#50545E] text-[16px]">
                <tr>
                  <th className="md:px-6 py-4">Service</th>
                  <th className="md:px-6 py-4">Amount</th>
                  <th className="md:px-6 py-4">Due Date</th>
                  <th className="md:px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => {
                  const status = getStatus(bill.due_date);
                  const statusColor = getStatusColor(status);

                  return (
                    <tr key={bill.id}>
                      <td className="flex gap-1 items-center md:px-6 py-3 font-medium text-[#50545E]">
                        {bill.logo_url && (
                          <img
                            src={bill.logo_url}
                            alt={`${bill.title} logo`}
                            className="w-6 h-6"
                          />
                        )}
                        {bill.title}
                      </td>
                      <td className="md:px-6 py-3 text-[#50545E]">
                        ₦{bill.amount}
                      </td>
                      <td className="md:px-6 py-3 text-[#50545E]">
                        {bill.due_date}
                      </td>
                      <td className={`md:px-6 py-3 font-medium ${statusColor}`}>
                        {status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
