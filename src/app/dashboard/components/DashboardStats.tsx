"use client";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import totalSpendingsIcon from "../../../../public/totalSpending-icon.svg";
import activeSubscriptionsIcon from "../../../../public/activeSubscriptions-icon.svg";
import upcomingRenewalsIcon from "../../../../public/upcomingRenewals-icon.svg";
import expiredSubscriptionsIcon from "../../../../public/expiredSubscriptions-icon.svg";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton"

interface Bill {
  id: string;
  title: string;
  amount: number;
  due_date: string;
  logo_url?: string | null;
  created_at?: string;
  user_id?: string;
}

const DashboardStats = () => {
  const { data: session } = useSession();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch("/api/bills");
        const { bills, error } = await res.json();

        if (error) {
          console.error("Error fetching bills:", error);
          return;
        }

        // Filter bills for the logged-in user
        const userBills = bills.filter(
          (bill: Bill) => bill.user_id === session?.user?.id
        );
        setBills(userBills);
      } catch (err) {
        console.error("Unexpected error fetching bills:", err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchBills();
    }
  }, [session]);

  const today = new Date();

  const totalSpending = bills.reduce(
    (sum, bill) => sum + (bill.amount || 0),
    0
  );

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const upcomingSubscriptions = bills.filter((bill) => {
    const due = new Date(bill.due_date);
    return due > nextWeek;
  }).length;

  const dueSubscriptions = bills.filter((bill) => {
    const due = new Date(bill.due_date);
    return due >= today && due <= nextWeek;
  }).length;

  const expiredSubscriptions = bills.filter(
    (bill) => new Date(bill.due_date) < today
  ).length;

  if (loading){
    return (
      <div className="flex flex-con justify-center gap-2 flex-wrap md:flex-nowrap lg:flex-row md:justify-between mt-4 mb-4">
        <div></div>
        <Skeleton className="w-11/12 lg:w-[270px] h-[120px] md:h-[100px] lg:h-[100px] flex flex-col justify-around lg:justify-between rounded-[11px] shadow-[0_0_40px_5px_rgba(0,0,0,0.1)] p-4 md:p-2 lg:p-2" />
        <Skeleton className="w-11/12 lg:w-[270px] h-[120px] md:h-[100px] lg:h-[100px] flex flex-col justify-around lg:justify-between rounded-[11px] shadow-[0_0_40px_5px_rgba(0,0,0,0.1)] p-4 md:p-2 lg:p-2" />
        <Skeleton className="w-11/12 lg:w-[270px] h-[120px] md:h-[100px] lg:h-[100px] flex flex-col justify-around lg:justify-between rounded-[11px] shadow-[0_0_40px_5px_rgba(0,0,0,0.1)] p-4 md:p-2 lg:p-2" />
        <Skeleton className="w-11/12 lg:w-[270px] h-[120px] md:h-[100px] lg:h-[100px] flex flex-col justify-around lg:justify-between rounded-[11px] shadow-[0_0_40px_5px_rgba(0,0,0,0.1)] p-4 md:p-2 lg:p-2" />
      </div>
    
  );
  }

  return (
    <div className="flex flex-con justify-center gap-2 flex-wrap md:flex-nowrap lg:flex-row md:justify-between mt-4 mb-4">
      <Cards
        title="Total Spendings"
        value={`₦${totalSpending}`}
        src={totalSpendingsIcon}
      />
      <Cards
        title="Upcoming Subscriptions"
        value={upcomingSubscriptions}
        src={activeSubscriptionsIcon}
      />
      <Cards
        title="Due Subscriptions"
        value={dueSubscriptions}
        src={upcomingRenewalsIcon}
      />
      <Cards
        title="Expired Subscriptions"
        value={expiredSubscriptions}
        src={expiredSubscriptionsIcon}
      />
    </div>
  );
};

export default DashboardStats;
