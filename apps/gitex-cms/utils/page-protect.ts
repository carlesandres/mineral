import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "./supabase/create-server-supabase-client";

export const pageProtect = async () => {
  const supabase = createServerSupabaseClient();
  const { data: { user } = {} } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return supabase;
}
