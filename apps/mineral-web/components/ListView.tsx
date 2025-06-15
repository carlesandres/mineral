'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
} from 'react';
import ListHeader from 'components/filelist/ListHeader';
import ListMenu from 'components/ListMenu';
import ListElements from 'components/ListElements';
import EmptyList from 'components/EmptyList';
import DragAndDrop from 'components/DragAndDrop';
import { useRouter, useSearchParams } from 'next/navigation';
import useNotesStore, { getNotes } from 'hooks/useNotesStore';
import { toast } from 'sonner';

const ListView = () => {
  const header = useRef<HTMLInputElement>(null);
  const { initialized } = useNotesStore((state) => state);
  const notes = getNotes();
  const router = useRouter();
  const initialSearchTerm = useSearchParams()?.get('search');
  const [searchTerm, setSearchterm] = useState('');
  // const pathname = usePathname();

  useEffect(() => {
    if (initialSearchTerm) {
      setSearchterm(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  const onSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = event.target.value;
      setSearchterm(newSearchTerm);
      // TO-DO: Use pathname instead of window.location.href
      const url = new URL(window.location.href);
      url.searchParams.set('search', newSearchTerm.trim());
      router.replace(url.href);
    },
    [router],
  );

  const onClear = () => setSearchterm('');

  const handleDrop = useCallback(async (files: FileList) => {
    // TO-DO:  Handle more than one file
    const firstFile = files[0];
    if (!firstFile.name) {
      return;
    }
    // const text = await readLocalFile(firstFile);
    // await createFile({ title: firstFile.name, text });
    toast.error('Importing is not yet supported');
  }, []);

  if (!initialized) {
    return null;
  }

  if (!notes?.length) {
    return <EmptyList />;
  }

  return (
    <>
      <DragAndDrop handleDrop={handleDrop} className="mx-auto w-full">
        <div className="list-view mx-auto flex w-full max-w-3xl flex-col p-4 sm:py-16">
          <div
            className={`relative mb-6 flex items-center justify-end sm:mb-12`}
          >
            <ListHeader
              ref={header}
              searchTerm={searchTerm}
              onChange={onSearch}
              onClear={onClear}
            />
            <ListMenu />
          </div>
          <div className="relative">
            <ListElements notes={notes} searchTerm={searchTerm} />
          </div>
        </div>
      </DragAndDrop>
    </>
  );
};

export default ListView;
