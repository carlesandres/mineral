import React from 'react';
import { Section } from 'types/Section';
import SortableCheatList from './SortableCheatList';
import { createServerSupabaseClient } from 'utils/create-server-supabase-client';
import { notFound } from 'next/navigation';
import { SectionFooter } from './SectionFooter';
import { SectionHeader } from './SectionHeader';

interface SheetSectionProps extends Section {
  canEdit: boolean;
  numCols: number;
  showDone?: boolean;
}

const SheetSection = async (props: SheetSectionProps) => {
  const { canEdit, numCols, showDone, ...section } = props;
  const { id: sectionId } = props;
  const supabase = await createServerSupabaseClient();

  const { data: allCheats, error } = await supabase
    .from('cheats')
    .select('*')
    .eq('section_id', props.id)
    .order('position', { ascending: true });

  if (error) {
    console.log('error', error);
    notFound();
  }

  const pendingCheats = allCheats.filter((cheat) => !cheat.done);
  const cheats = showDone ? allCheats : pendingCheats;

  return (
    <div className="sheet-section sm:p-4 sm:px-8 sm:border rounded bg-gray-50">
      <SectionHeader section={section} />
      <SortableCheatList
        cheats={cheats}
        canEdit={canEdit}
        numCols={numCols}
        sectionId={sectionId}
      />
      {cheats.length > 0 && <SectionFooter sectionId={sectionId} />}
    </div>
  );
};

export default SheetSection;
