import SubscriptionsTable from "../components/SubscriptionsTable";

export default async function Page() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/bills`, {
      cache: "no-store", // ensures fresh data each time
    });

    if (!res.ok) {
      throw new Error("Failed to fetch bills");
    }

    const { bills } = await res.json();

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
