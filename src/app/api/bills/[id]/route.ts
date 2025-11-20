// src/app/api/bills/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Create a Supabase client for server-side use
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

// DELETE /api/bills/[id]
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const { params } = context;

  // Authenticate user
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createSupabaseServerClient();

  // Delete the bill for the authenticated user
  const { error } = await supabase
    .from("bills")
    .delete()
    .eq("id", params.id)
    .eq("user_id", session.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Bill deleted successfully" });
}
