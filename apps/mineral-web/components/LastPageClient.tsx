'use client';

import React, { useState } from 'react';
import { getShownFiles } from 'utils/fileUtils';
import PleaseWait from 'components/PleaseWait';
import { useEffect } from 'react';
import { useList } from 'hooks/useList';
import { sortBy } from 'lodash';
import { useRouter } from 'next/navigation';

const LastPageClient = () => {
  const { list } = useList();
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { initialized, notes } = list;
    if (initialized) {
      const activeNotes = getShownFiles(notes, 'INBOX', '');
      const sortedNotes = sortBy(activeNotes, 'updatedAt').reverse();
      if (!notes.length) {
        setError('There are no notes in your list at the moment');
        return;
      }

      const lastNoteId = sortedNotes[0].id;
      const href = `/note?id=${lastNoteId}`;
      router.push(href);
    }
  }, [list]);

  if (error) {
    return <p>{error}</p>;
  }

  return <PleaseWait message="Opening last note..." />;
};

export default LastPageClient;
