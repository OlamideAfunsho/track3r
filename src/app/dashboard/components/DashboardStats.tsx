
"use client";
import React from 'react';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Cards from './Cards'
import totalSpendingsIcon from '../../../../public/totalSpending-icon.svg';
import activeSubscriptionsIcon from '../../../../public/activeSubscriptions-icon.svg';
import upcomingRenewalsIcon from '../../../../public/upcomingRenewals-icon.svg';
import expiredSubscriptionsIcon from '../../../../public/expiredSubscriptions-icon.svg';

const DashboardStats = () => {
    

    const [bills, setBills] = useState<Record<string, any>[]>([])
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

  // Calculate stats
  const today = new Date();
  const totalSpending = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const activeSubscriptions = bills.filter(
    bill => new Date(bill.due_date) > today
  ).length;

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  const upcomingRenewals = bills.filter(bill => {
    const due = new Date(bill.due_date);
    return due >= today && due <= nextWeek;
  }).length;

  const expiredSubscriptions = bills.filter(
    bill => new Date(bill.due_date) < today
  ).length;

  if (loading) return <p>Loading stats...</p>;

  return (
    <div className="flex flex-con justify-center gap-2 flex-wrap md:flex-row md:justify-between mt-4 mb-4">
          <Cards title='Total Spendings' value={`₦${totalSpending}`} src={totalSpendingsIcon} />
          <Cards title='Active Subscriptions' value={activeSubscriptions} src={activeSubscriptionsIcon} />
          <Cards title='Upcoming Renewals' value={upcomingRenewals} src={upcomingRenewalsIcon} />
          <Cards title='Expired Subscriptions' value={expiredSubscriptions} src={expiredSubscriptionsIcon} />
        </div>
  )
}

export default DashboardStats