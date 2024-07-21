import React from 'react';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';

export default async function ExamplesPage() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.from('examples').select(`*`);

  if (data) {
    const firstExample = data[0];
    redirect(`/examples/${firstExample.id}`);
  }

  if (error) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      Fetching
    </div>
  );
}
