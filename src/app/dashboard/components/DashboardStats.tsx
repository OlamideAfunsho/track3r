
"use client";
import React from 'react';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Cards from './Cards'
import totalSpendingsIcon from '../../../../public/totalSpending-icon.svg';
import activeSubscriptionsIcon from '../../../../public/activeSubscriptions-icon.svg';
import upcomingRenewalsIcon from '../../../../public/upcomingRenewals-icon.svg';
import expiredSubscriptionsIcon from '../../../../public/expiredSubscriptions-icon.svg';

interface Bill {
  id: string;
  title: string;
  amount: number;
  due_date: string;
  logo_url?: string | null;
  created_at?: string;
}

const DashboardStats = () => {
    

    const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      const { data, error } = await supabase.from("bills").select("*");
      if (error) console.error("Error fetching bills:", error);
      else setBills(data || []);
      setLoading(false);
    };

    fetchBills();
  }, []);

  const today = new Date();


  const totalSpending = bills.reduce(
    (sum, bill) => sum + (bill.amount || 0),
    0
  );

//   const upcomingSubscriptions = bills.filter(
//     bill => new Date(bill.due_date) > today
//   ).length;

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const upcomingSubscriptions = bills.filter(bill => {
  const due = new Date(bill.due_date);
  return due > nextWeek;
}).length;

const dueSubscriptions = bills.filter(bill => {
    const due = new Date(bill.due_date);
    return due >= today && due <= nextWeek;
  }).length;

  const expiredSubscriptions = bills.filter(
    bill => new Date(bill.due_date) < today
  ).length;

  if (loading) return <p>Loading stats...</p>;

  return (
    <div className="flex flex-con justify-center gap-2 flex-wrap md:flex-nowrap lg:flex-row md:justify-between mt-4 mb-4">
          <Cards title='Total Spendings' value={`₦${totalSpending}`} src={totalSpendingsIcon} />
          <Cards title='Upcoming Subscriptions' value={upcomingSubscriptions} src={activeSubscriptionsIcon} />
          <Cards title='Due Subscriptions' value={dueSubscriptions} src={upcomingRenewalsIcon} />
          <Cards title='Expired Subscriptions' value={expiredSubscriptions} src={expiredSubscriptionsIcon} />
        </div>
  )
}

export default DashboardStats