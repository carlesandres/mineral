'use client';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import type { Sheet } from 'types/Sheet';
import SheetEditRow from './SheetEditRow';
import SheetMarker from './SheetMarker';
import SheetMenu from './SheetMenu';

interface SheetRowProps {
  sheet: Sheet;
}

const SheetRow = (props: SheetRowProps) => {
  const { sheet } = props;
  const canEdit = true;
  //const canEdit = userId && userId === props.sheet.owner_id;
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDone = useCallback(() => setIsEditMode(false), []);

  if (isEditMode) {
    return <SheetEditRow sheet={sheet} onDone={handleDone} />;
  }

  return (
    <div className="flex gap-2 items-center justify" id={sheet.id}>
      <Link href={`/sheets/${sheet.id}`} className="w-full">
        <div
          key={sheet.id}
          className="flex gap-3 py-3 flex-1 items-center transition-colors hover:bg-gray-100 cursor-pointer"
        >
          <SheetMarker color={sheet.color} isPrivate={!sheet.is_public} />
          <div className="flex-1 text-left">{sheet.title}</div>
        </div>
      </Link>
      {canEdit && (
        <SheetMenu sheetId={sheet.id} setIsEditMode={setIsEditMode} />
      )}
    </div>
  );
};

export default SheetRow;
