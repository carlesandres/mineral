'use client';

import BinView from 'components/BinView';
import EmptyBin from 'components/EmptyBin';
import ListHeader from 'components/filelist/ListHeader';
import React, { ChangeEvent, useCallback, useState } from 'react';
import useNotesStore, { getNotes } from 'hooks/useNotesStore';

const BinList = () => {
  const { initialized } = useNotesStore((state) => state);
  const notes = getNotes();
  const [searchTerm, setSearchterm] = useState('');

  const onSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchterm(newSearchTerm);
  }, []);

  const onClear = () => setSearchterm('');

  if (!initialized) {
    return null;
  }

  if (!notes?.length) {
    return <EmptyBin />;
  }

  return (
    <>
      <div className="list-view mx-auto flex w-full max-w-3xl flex-col px-4 pb-16 pt-4 sm:py-16">
        <div className="relative mb-12 flex items-center gap-4">
          <ListHeader
            searchTerm={searchTerm}
            onChange={onSearch}
            onClear={onClear}
            placeHolder="Search Bin"
          />
        </div>
        <BinView key="bin" searchTerm={searchTerm} notes={notes} />
      </div>
    </>
  );
};

export default BinList;
