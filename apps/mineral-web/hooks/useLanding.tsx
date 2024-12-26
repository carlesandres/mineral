import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useNotesStore from 'hooks/useNotesStore';

export const useLanding = () => {
  const router = useRouter();
  const { initialized, notes } = useNotesStore((state) => state);

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
