import React from 'react';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from 'utils/create-server-supabase-client';
import { cn } from 'utils';
import SheetSection from 'components/SheetSection';
import SheetHeader from 'components/SheetHeader';
import SheetToolbar from 'components/SheetToolbar';
import SheetPageCommands from 'components/SheetPageCommands';
import AddSectionButton from 'components/AddSectionButton';

export interface CheatsPageProps {
  params: {
    id: string;
  };
  searchParams: {
    hidedone: string;
  };
}

export default async function CheatsPage({
  params,
  searchParams,
}: CheatsPageProps) {
  const { id: sheetId } = params;
  const { hidedone } = searchParams;
  const showDone = hidedone !== 'true' && hidedone !== undefined;
  const supabase = await createServerSupabaseClient();

  const { data: sheet, error } = await supabase
    .from('sheets')
    .select('*, sections(*)')
    .eq('id', sheetId)
    .single();

  if (error) {
    console.log('error', error);
    notFound();
  }

  if (!sheet) {
    notFound();
  }

  const width = sheet.num_cols === 2 ? 'max-w-5xl' : 'max-w-3xl';

  const sections = sheet.sections.map((section) => (
    <SheetSection
      key={section.id}
      {...section}
      numCols={sheet.num_cols}
      canEdit={true}
      showDone={showDone}
    />
  ));

  return (
    <main
      className={cn(
        `container mx-auto px-4 pt-20 sm:pt-28 lg:px-0 pb-20 print:pt-4`,
        width,
      )}
    >
      <SheetPageCommands />
      <SheetHeader sheet={sheet} />
      <SheetToolbar sheet={sheet} />
      <div className="flex flex-col gap-4">{sections}</div>
      <AddSectionButton sheetId={sheet.id} />
    </main>
  );
}
