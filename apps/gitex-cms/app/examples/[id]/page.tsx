import React from 'react';
import ExampleForm from 'components/ExampleForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';
import { getRelatedExamples } from '@/utils/getRelatedExamples';
import { canUserEdit } from '@/utils/can-user-edit';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExamplePageProps {
  params: {
    id: string;
  };
}

export default async function ExamplePage({ params }: ExamplePageProps) {
  const canEdit = await canUserEdit();

  if (!canEdit) {
    notFound();
  }

  const { id: unsanitisedId = '' } = params;
  const id = Array.isArray(unsanitisedId) ? unsanitisedId[0] : unsanitisedId;
  const supabase = createServerSupabaseClient();

  const { data: cheats, error } = await supabase
    .from('examples')
    .select(`*`)
    .order('example');

  if (error) {
    console.error(error);
    notFound();
  }

  if (!id) {
    notFound();
  }

  const cheat = cheats.find((cheat) => cheat.id === id);

  if (!cheat) {
    notFound();
  }

  const relatedExamples = await getRelatedExamples(cheat);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 pt-24">
      <div className="examples content mx-auto max-w-4xl p-4">
        <div className="my-8 flex items-center gap-8">
          <Button asChild size="icon" variant="outline">
            <Link href={`/assist?example=${encodeURIComponent(cheat.example)}`}>
              <Sparkles
                size={24}
                className={cn(
                  'p-0.5 rounded-full text-blue-500 hover:bg-blue-100 cursor-pointer transition',
                )}
              />
            </Link>
          </Button>
          <Link
            href={`http://gitexamples.com/examples/${cheat.id}`}
            className="text-blue-500 underline"
            target="_blank"
          >
            User view
          </Link>
        </div>
        <ExampleForm
          key={cheat.id}
          cheat={cheat}
          relatedExamples={relatedExamples}
        />
      </div>
    </div>
  );
}
