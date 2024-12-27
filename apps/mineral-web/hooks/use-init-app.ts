import { useEffect } from 'react';
import useNotesStore, { loadNotes } from './useNotesStore';

export const useInit = () => {
  const { initialized } = useNotesStore();
  useEffect(() => {
    if (!initialized) {
      loadNotes();
    }
  }, [initialized]);
};
