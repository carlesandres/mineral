import ConceptEditor from '@/components/ConceptEditor';
import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';
import { notFound } from 'next/navigation';
import React from 'react';

interface ConceptsPageProps {
  params: {
    id: string;
  };
}

const ConceptsPage = async (props: ConceptsPageProps) => {
  const { id } = props.params;
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('concepts')
    .select('*')
    .eq('id', id);

  if (error || !data) {
    return notFound();
  }

  const concept = data[0];

  return (
    <div className="container mt-20 flex flex-col justify-center py-2">
      <h1 className="font-bold text-2xl mb-4">{concept.name}</h1>
      <ConceptEditor concept={concept} />
    </div>
  );
};

export default ConceptsPage;
