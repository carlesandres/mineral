import { useEffect } from 'node_modules/@types/react';
import useNotesStore, { loadNotes } from './useNotesStore';

export const useInit = () => {
  const { initialized } = useNotesStore();
  useEffect(() => {
    if (!initialized) {
      loadNotes();
    }
  }, [initialized]);
};
