import { Metadata } from 'next';
import { NewSheetForm } from 'components/NewSheetForm';
import { createServerSupabaseClient } from 'utils/create-server-supabase-client';
import { notFound, redirect } from 'next/navigation';
import SheetList from 'components/SheetList';
import { getNextSheetPos } from 'utils/get-next-sheet-pos';

export const metadata: Metadata = {
  title: 'Sheets',
};

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } = {} } = await supabase.auth.getUser();
  const userId = user?.id;
  const nextSheetPos = await getNextSheetPos(false);

  if (!userId) {
    redirect('/soon');
  }

  const { data: sheets, error } = await supabase
    .from('sheets')
    .select('*')
    .order('position');

  if (!nextSheetPos) {
    throw new Error('Error generating next sheet position');
  }

  if (error) {
    console.log('error', error);
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center py-2">
      <main className="container max-w-5xl mx-auto pt-20">
        <NewSheetForm nextSheetPos={nextSheetPos} />
        <SheetList sheets={sheets} />
      </main>
    </div>
  );
}
