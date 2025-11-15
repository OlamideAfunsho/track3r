import SubscriptionsTable from "../components/SubscriptionsTable";
import { auth } from "../../../../auth";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    return <p className="text-center mt-10">You must be logged in to view bills.</p>;
  }

  const supabase = await createSupabaseServerClient();

  const { data: bills, error } = await supabase
    .from("bills")
    .select("*")
    .eq("user_id", session.user.id)
    .order("due_date", { ascending: true });

  if (error) {
    console.error("Error fetching bills:", error);
    return <p className="text-center mt-10">Failed to load bills</p>;
  }

  return (
    <div className="px-1.5 py-10 h-fit">
      <SubscriptionsTable initialBills={bills || []} />
    </div>
  );
}
