import { Example } from '@/types/Example';
import { PostgrestError } from '@supabase/supabase-js';
import CmsList from '@/components/CmsList';
import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';
import { canUserEdit } from '@/utils/can-user-edit';

export default async function Home() {
  const canEdit = await canUserEdit();

  if (!canEdit) {
    return <p>Oops</p>;
  }

  const supabase = createServerSupabaseClient();

  const { data: examples, error } = (await supabase
    .from('examples')
    .select(`*`)
    .order('example')) as { data: Example[]; error: PostgrestError | null };

  if (error) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="min-h-screen flex-col items-center justify-center py-20">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <CmsList examples={examples} />
      </main>
    </div>
  );
}
