import React from 'react'
import { supabase } from "@/lib/supabaseClient";
import Link from 'next/link';
import { afacad } from '@/app/fonts';

const page = async () => {
  const { data: bills, error } = await supabase.from("bills").select("*");

  if (error) {
    console.error(error);
    return <p>Failed to load bills</p>;
  }

  if (!bills || bills.length === 0) {
    return (
      <>
        <p>No bills yet. Add one to get started!</p>
        <Link href='/dashboard/add-bill'>Add Bill</Link>
      </>

    );
  }

  return (
     <div className="w-full md:w-3/5 p-4 border rounded-[7px] bg-[#F2F7FF]">
         <div className="overflow-x-auto">
        <table className={`${afacad.className} min-w-full text-sm text-left`}>
          <thead className="text-[#50545E] text-[16px]">
            <tr>
              <th className="px-6 py-3">Service</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
                <tr
                  key={bill.id}
                  className=""
                >
                  <td className="px-6 py-4 font-medium">{bill.title}</td>
                  <td className="px-6 py-4">₦{bill.amount}</td>
                  <td className="px-6 py-4">{bill.due_date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
        </div>
  )
}

export default page