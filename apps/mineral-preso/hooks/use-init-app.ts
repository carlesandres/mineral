import { useEffect } from 'react';
import useNotesStore, { loadNotes } from './useNotesStore';
import { loadFromStorage } from './useSettingsStore';

export const useInit = () => {
  const { initialized } = useNotesStore();
  useEffect(() => {
    if (!initialized) {
      loadNotes();
      loadFromStorage();
    }
  }, [initialized]);
};
