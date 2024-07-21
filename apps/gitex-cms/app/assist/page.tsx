import React, { Suspense } from 'react';
import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';
import { Example } from '@/types/Example';
import { PostgrestError } from '@supabase/supabase-js';
import CmsList from '@/components/CmsList';
import { canUserEdit } from '@/utils/can-user-edit';
import { notFound } from 'next/navigation';
import AssistPageClient from './AssistPageClient';

const AssistPage = async () => {
  const canEdit = await canUserEdit();

  if (!canEdit) {
    notFound();
  }
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('assist_prompts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const { data: examples, error: error2 } = (await supabase
    .from('examples')
    .select(`*`)
    .order('example')) as { data: Example[]; error: PostgrestError | null };

  if (error || error2 || !data) {
    console.error(error);
    throw error;
  }

  const defaultPrompt = data.prompt;

  return (
    <div className="pt-24 px-8 md:px-20">
      <h1 className="text-3xl font-bold mb-4">Assist</h1>
      <div className="flex">
        <div className="w-1/3 h-[800px] overflow-auto border rounded-lg bg-white p-4">
          <CmsList examples={examples} />
        </div>
        <div className="w-2/3">
          <Suspense>
            <AssistPageClient defaultPrompt={defaultPrompt} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AssistPage;
