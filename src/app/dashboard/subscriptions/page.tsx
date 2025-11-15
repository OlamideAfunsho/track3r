import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import SubscriptionsTable from "@/app/dashboard/components/SubscriptionsTable";

export default async function Page() {
  try {
    // Cookies() must be awaited now
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // server-only key
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return (
        <div className="text-center mt-10">
          <p>You must be logged in to view your subscriptions.</p>
        </div>
      );
    }

    // Fetch user's bills
    const { data: bills, error } = await supabase
      .from("bills")
      .select("*")
      .eq("user_id", user.id)
      .order("due_date", { ascending: true });

    if (error) throw error;

    return (
      <div className="px-1.5 py-10 h-fit">
        <SubscriptionsTable initialBills={bills || []} />
      </div>
    );
  } catch (error) {
    console.error("Error loading bills:", error);
    return <p className="text-center mt-10">Failed to load bills</p>;
  }
}
