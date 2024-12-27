'use client';

import React, { useState } from 'react';
import { getShownFiles } from 'utils/fileUtils';
import PleaseWait from 'components/PleaseWait';
import { useEffect } from 'react';
import { sortBy } from 'lodash';
import { useRouter } from 'next/navigation';
import useNotesStore, { getNotes } from 'hooks/useNotesStore';

const LastPageClient = () => {
  const notes = getNotes();
  const initialized = useNotesStore((state) => state.initialized);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
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
  }, [notes, initialized, router]);

  if (error) {
    return <p>{error}</p>;
  }

  return <PleaseWait message="Opening last note..." />;
};

export default LastPageClient;
