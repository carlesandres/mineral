'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Sheet } from '../types/Sheet';
import SheetRow from './SheetRow';
import { Input } from './ui/input';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { isEqual } from 'lodash';
import { sortbyPos } from 'utils/sort-by-pos';
import { upsertSheet } from 'utils/server-actions/upsert-sheet';
import { updatePosition } from 'utils/update-position';

interface SheetListProps {
  sheets: Sheet[];
}

const SheetList = (props: SheetListProps) => {
  const [search, setSearch] = useState('');
  const { sheets } = props;
  const filteredSheets = useMemo(
    () =>
      sheets.filter((sheet) => {
        return sheet.title.toLowerCase().includes(search.toLowerCase());
      }),
    [sheets, search],
  );
  const [parent, sortedSheets, setSortedSheets] = useDragAndDrop<
    HTMLDivElement,
    Sheet
  >(filteredSheets);

  useEffect(() => {
    setSortedSheets(filteredSheets);
  }, [filteredSheets, setSortedSheets]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const renderedSheets = sortedSheets.map((sheet) => (
    <SheetRow key={sheet.id} sheet={sheet} />
  ));

  useEffect(() => {
    const sortedByPos = [...sortedSheets].sort(sortbyPos);
    const positionsAreSorted = isEqual(sortedByPos, sortedSheets);

    if (!positionsAreSorted) {
      updatePosition(sortedSheets, upsertSheet);
    }
  }, [sortedSheets]);

  return (
    <div className="w-full">
      <Input
        value={search}
        onChange={onChange}
        autoFocus
        placeholder="Search"
      />

      <div ref={parent} className="flex w-full flex-col divide-y mt-4">
        {renderedSheets}
      </div>
    </div>
  );
};

export default SheetList;
