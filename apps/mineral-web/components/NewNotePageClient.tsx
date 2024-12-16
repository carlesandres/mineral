"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { fileUrl } from "utils/paths.js";
import { useEffect } from "react";
import useSettingsStore from "utils/useSettingsStore";
import { newFile } from "utils/fileUtils";
import { useList } from "hooks/useList";

const NewNotePageClient = () => {
  const router = useRouter();
  const { startWithPreview, footerHiddenByDefault } = useSettingsStore();
  const { list, dispatchList } = useList();

  const panels = useMemo(() => {
    return startWithPreview
      ? { viewer: true, editor: true }
      : { viewer: false, editor: true };
  }, [startWithPreview]);

  useEffect(() => {
    const create = () => {
      const note = newFile({ panels, showFooter: !footerHiddenByDefault });
      dispatchList({
        type: "append",
        note,
      });
      router.replace(fileUrl(note.id));
    };

    if (list.initialized) {
      create();
    }
  }, [router, list?.initialized, dispatchList, panels, footerHiddenByDefault]);

  return <div>Creating new file...</div>;
};

export default NewNotePageClient;
