import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useNotesStore, { getNotes } from 'hooks/useNotesStore';

export const useLanding = () => {
  const router = useRouter();
  const { initialized } = useNotesStore((state) => state);
  const notes = getNotes();

  useEffect(() => {
    if (!initialized) {
      return;
    }

    if (!notes.length) {
      router.replace('/intro');
      return;
    }

    router.replace('/notes');
  }, [initialized, notes, router]);

  return null;
};
