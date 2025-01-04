'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { fileUrl } from 'utils/paths';
import { useEffect } from 'react';
import useSettingsStore from 'hooks/useSettingsStore';
import { newFile } from 'utils/fileUtils';
import useNotesStore, { setNote } from 'hooks/useNotesStore';

const NewNotePageClient = () => {
  const router = useRouter();
  const { initialized } = useNotesStore();
  const { startWithPreview, footerHiddenByDefault } = useSettingsStore();

  const panels = useMemo(() => {
    return startWithPreview
      ? { viewer: true, editor: true, toc: false }
      : { viewer: false, editor: true, toc: false };
  }, [startWithPreview]);

  useEffect(() => {
    const create = () => {
      const note = newFile({ panels, showFooter: !footerHiddenByDefault });
      setNote(note);
      router.replace(fileUrl(note.id));
    };

    if (initialized) {
      create();
    }
  }, [router, initialized, panels, footerHiddenByDefault]);

  return <div>Creating new file...</div>;
};

export default NewNotePageClient;
