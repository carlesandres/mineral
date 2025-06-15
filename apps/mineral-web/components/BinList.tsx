'use client';

import BinView from 'components/BinView';
import EmptyBinView from 'components/EmptyBinView';
import ListHeader from 'components/filelist/ListHeader';
import React, { ChangeEvent, useCallback, useState } from 'react';
import useNotesStore, { getDeletedNotes } from 'hooks/useNotesStore';
import BinMenu from './bin-menu';

const BinList = () => {
  const { initialized } = useNotesStore((state) => state);
  const notes = getDeletedNotes();
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
    return <EmptyBinView />;
  }

  return (
    <>
      <div className="list-view mx-auto flex w-full max-w-3xl flex-col px-4 pt-4 pb-16 sm:py-16">
        <div className="relative mb-12 flex items-center">
          <ListHeader
            searchTerm={searchTerm}
            onChange={onSearch}
            onClear={onClear}
            placeHolder="Search Bin"
          />
          <BinMenu />
        </div>
        <BinView key="bin" searchTerm={searchTerm} notes={notes} />
      </div>
    </>
  );
};

export default BinList;
