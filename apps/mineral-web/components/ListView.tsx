"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
} from "react";
import ListHeader from "components/filelist/ListHeader";
import ListMenu from "components/ListMenu";
import ListElements from "components/ListElements";
import listShortcuts from "components/listShortcuts";
import { useShortcuts } from "hooks/useShortcuts";
import { useList } from "hooks/useList";
import EmptyList from "components/EmptyList";
import DragAndDrop from "components/DragAndDrop";
import useCreateFile from "hooks/useCreateFile";
import { readLocalFile } from "components/FileImporter";
import useUIZStore from "utils/useUIZStore";
import { useRouter } from "next/router";
import { useQueryParam } from "hooks/useQueryP";
import SuccessToast from "components/SuccessToast";

const ListView = () => {
  const header = useRef<HTMLInputElement>(null);
  const { toast } = useUIZStore();
  const { dispatch: dispatchShortcuts } = useShortcuts();
  const { list } = useList();
  const router = useRouter();
  const [searchTerm, setSearchterm] = useState("");
  const { param: initialSearchTerm } = useQueryParam("search");

  useEffect(() => {
    if (initialSearchTerm) {
      setSearchterm(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  const createFile = useCreateFile();

  useEffect(() => {
    const keyActionMap = {};

    dispatchShortcuts({
      type: "set",
      keyActionMap,
      shortcutDescription: listShortcuts,
    });
  }, [dispatchShortcuts]);

  const onSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = event.target.value;
      setSearchterm(newSearchTerm);
      const query = newSearchTerm.trim()
        ? { search: newSearchTerm.trim() }
        : {};
      router.replace({ pathname: router.pathname, query });
    },
    [router],
  );

  const onClear = () => setSearchterm("");

  const handleDrop = useCallback(
    async (files: FileList) => {
      // TO-DO:  Handle more than one file
      const firstFile = files[0];
      if (!firstFile.name) {
        return;
      }
      const text = await readLocalFile(firstFile);
      await createFile({ title: firstFile.name, text });
      toast(<SuccessToast>File imported</SuccessToast>);
    },
    [createFile],
  );

  if (!list.initialized || !router.isReady) {
    return null;
  }

  if (!list?.notes?.length) {
    return <EmptyList />;
  }

  return (
    <>
      <DragAndDrop handleDrop={handleDrop} className="mx-auto w-full ">
        <div className="list-view mx-auto flex w-full max-w-3xl flex-col px-4 pb-16 pt-4 sm:py-16">
          <div
            className={`mb-12  flex items-center justify-end gap-4
          `}
          >
            <ListHeader
              ref={header}
              searchTerm={searchTerm}
              onChange={onSearch}
              onClear={onClear}
            />
          </div>
          <div className="relative">
            <ListElements notes={list?.notes} searchTerm={searchTerm} />
          </div>
        </div>
      </DragAndDrop>
      <ListMenu />
    </>
  );
};

export default ListView;
