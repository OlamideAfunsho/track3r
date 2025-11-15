export async function getBills() {
  const res = await fetch("/api/bills");
  const data = await res.json();
  return data.bills || [];
}

