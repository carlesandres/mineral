import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

const ConceptsPage = async () => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.from('concepts').select(`*`);

  if (error || !data) {
    return notFound();
  }

  const conceptsList = data.map((concept) => (
    <li key={concept.id}>
      <Link href={`/concepts/${concept.id}`} className="hover:underline">
        {concept.name}
      </Link>
    </li>
  ));

  return (
    <div className="container mt-20 flex flex-col justify-center py-2">
      <h1 className="font-bold text-2xl mb-4">Concepts</h1>
      <ul className="list-disc ml-4">{conceptsList}</ul>
    </div>
  );
};

export default ConceptsPage;
