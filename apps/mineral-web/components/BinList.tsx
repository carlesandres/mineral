"use client";

import React, { useEffect, useState, useCallback, ChangeEvent } from "react";
import ListHeader from "components/filelist/ListHeader";
import BinView from "components/BinView";
import { useList } from "hooks/useList";
import EmptyList from "components/EmptyList";
import { useRouter, useSearchParams } from "next/navigation";
import BinMenu from "./BinMenu";

const BinList = () => {
  const { list } = useList();
  const router = useRouter();
  const initialSearchTerm = useSearchParams()?.get("search");
  const [searchTerm, setSearchterm] = useState("");
  const { notes } = list;

  useEffect(() => {
    if (initialSearchTerm) {
      setSearchterm(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  // useEffect(() => {
  //   const keyActionMap = {};
  //
  //   dispatchShortcuts({
  //     type: "set",
  //     keyActionMap,
  //     shortcutDescription: listShortcuts,
  //   });
  // }, [dispatchShortcuts]);

  const onSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = event.target.value;
      setSearchterm(newSearchTerm);
      // TO-DO: Use pathname instead of window.location.href
      const url = new URL(window.location.href);
      url.searchParams.set("search", newSearchTerm.trim());
      router.replace(url.href);
    },
    [router],
  );

  const onClear = () => setSearchterm("");

  if (!list.initialized) {
    return null;
  }

  if (!list?.notes?.length) {
    return <EmptyList />;
  }

  return (
    <>
      <div
        className="list-view mx-auto flex
      w-full max-w-3xl flex-col px-4 pb-16 pt-4 sm:py-16"
      >
        <div className="mb-12 flex items-center gap-4">
          <ListHeader
            searchTerm={searchTerm}
            onChange={onSearch}
            onClear={onClear}
            placeHolder="Search Bin"
          />
        </div>
        <BinView key="bin" searchTerm={searchTerm} notes={notes} />
      </div>
      <BinMenu />
    </>
  );
};

export default BinList;
