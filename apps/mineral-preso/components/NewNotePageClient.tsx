'use client';

import { useRouter } from 'next/navigation';
import { fileUrl } from 'utils/paths';
import { useEffect } from 'react';
import useSettingsStore from 'hooks/useSettingsStore';
import { newFile } from 'utils/fileUtils';
import useNotesStore, { setNote } from 'hooks/useNotesStore';

const NewNotePageClient = () => {
  const router = useRouter();
  const { initialized } = useNotesStore();
  const { footerHiddenByDefault } = useSettingsStore();

  useEffect(() => {
    const create = () => {
      const panels = { viewer: false, editor: true, toc: false };
      const note = newFile({ panels, showFooter: !footerHiddenByDefault });
      setNote(note);
      router.replace(fileUrl(note.id));
    };

    if (initialized) {
      create();
    }
  }, [router, initialized, footerHiddenByDefault]);

  return null;
};

export default NewNotePageClient;
