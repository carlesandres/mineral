import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import fetchSupabase from 'utils/fetch-from-supabase';
import type { Sheet } from 'types/Sheet';
import type { Cheat } from 'types/Cheat';
import TabsFromQueryParams from 'components/TabsFromQueryParams';
import CheatsheetClient from 'components/CheatsheetClient';
import ListCheatsheet from 'components/ListCheatsheet';

interface PublicSheetPageProps {
  params: Promise<{ slug: string }>;
}

const PublicSheetPage = async (props: PublicSheetPageProps) => {
  const { slug } = await props.params;

  const [sheet] = (await fetchSupabase(
    `sheets?select=*&slug=eq.${slug}`,
  )) as Sheet[];

  if (!sheet?.id) {
    return notFound();
  }

  const cheats = (await fetchSupabase(
    `cheats?select=*&sheet_id=eq.${sheet.id}`,
  )) as Cheat[];

  if (!cheats) {
    return notFound();
  }

  return (
    <div className="pt-24 max-w-5xl mx-auto">
      <h1 className="font-bold text-2xl mb-8">{sheet.title}</h1>
      <h2 className="font-bold text-lg">{sheet.description}</h2>
      <div className="flex pb-6">
        <TabsFromQueryParams
          className=""
          paramName="view"
          defaultTab="grid"
          tabDescriptors={{
            grid: 'Grid',
            list: 'List',
          }}
        />
      </div>
      <Suspense fallback={<ListCheatsheet cheats={cheats} />}>
        <CheatsheetClient cheats={cheats} />
      </Suspense>
    </div>
  );
};

export default PublicSheetPage;
