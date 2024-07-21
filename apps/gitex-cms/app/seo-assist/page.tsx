import React from 'react';
import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';
import { canUserEdit } from '@/utils/can-user-edit';
import { notFound } from 'next/navigation';
import SEOAssistForm from '@/components/SEOAssistForm';

interface SeoAssistPageProps {
  searchParams: {
    id: string;
  };
}

const SeoAssistPage = async (props: SeoAssistPageProps) => {
  const { searchParams } = props;
  const id = searchParams.id;
  const canEdit = await canUserEdit();

  if (!canEdit || !id) {
    notFound();
  }
  const supabase = createServerSupabaseClient();

  const { data: example, error: error2 } = await supabase
    .from('examples')
    .select(`*`)
    .eq('id', id)
    .single();

  if (error2 || !example) {
    throw error2;
  }

  const defaultPrompt = `Explain the following git command in between 120 and 160 characters.
  Start with "This command".
  Avoid including the command in the response.
  Make sure to write something that's consistent with the provided short and long descriptions.`;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-col pt-32 px-8 md:px-20 ">
        <SEOAssistForm defaultPrompt={defaultPrompt} example={example} />
      </div>
    </div>
  );
};

export default SeoAssistPage;
