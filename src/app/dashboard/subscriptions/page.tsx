import { supabase } from "@/lib/supabaseClient";
import SubscriptionsTable from '../components/SubscriptionsTable';

export default async function Page() {
  const { data: bills, error } = await supabase.from("bills").select("*");

  if (error) {
    console.error(error);
    return <p>Failed to load bills</p>;
  }

  return (
  <div className="px-1.5 py-10 h-fit ">
  <SubscriptionsTable initialBills={bills || []} />
  </div>
  

);
}
