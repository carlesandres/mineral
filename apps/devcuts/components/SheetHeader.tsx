'use client';
import React, { useState } from 'react';
import { SheetListMenu } from './SheetListMenu';
import SheetMarker from './SheetMarker';
import type { Sheet } from 'types/Sheet';
import SheetEditRow from './SheetEditRow';

interface SheetHeaderProps {
  sheet: Sheet;
}

const SheetHeader = (props: SheetHeaderProps) => {
  const { sheet } = props;
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="flex items-center pb-2 mb-4 ">
        <h1 className="example flex flex-1 gap-4 items-center text-lg sm:text-2xl font-bold ">
          <SheetMarker
            color={sheet.color}
            isPrivate={!sheet.is_public}
            size="large"
          />
          <span>{sheet.title}</span>
        </h1>
        <SheetListMenu sheet={sheet} onEdit={() => setShowForm(true)} />
      </div>
      {showForm && (
        <SheetEditRow sheet={sheet} onDone={() => setShowForm(false)} />
      )}
    </>
  );
};

export default SheetHeader;
