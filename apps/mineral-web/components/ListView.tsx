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
import useCreateFile from 'hooks/useCreateFile';
import { useRouter, useSearchParams } from 'next/navigation';
import SuccessToast from 'components/SuccessToast';
import useNotesStore from 'hooks/useNotesStore';
import { useToast } from 'hooks/use-toast';

const ListView = () => {
  const header = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { notes, initialized } = useNotesStore((state) => state);
  const router = useRouter();
  const initialSearchTerm = useSearchParams()?.get('search');
  const [searchTerm, setSearchterm] = useState('');
  // const pathname = usePathname();

  useEffect(() => {
    if (initialSearchTerm) {
      setSearchterm(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  const createFile = useCreateFile();

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

  const handleDrop = useCallback(
    async (files: FileList) => {
      // TO-DO:  Handle more than one file
      const firstFile = files[0];
      if (!firstFile.name) {
        return;
      }
      // const text = await readLocalFile(firstFile);
      // await createFile({ title: firstFile.name, text });
      toast({
        description: 'Importing is not yet supported',
        variant: 'destructive',
      });
    },
    [toast],
  );

  if (!initialized) {
    return null;
  }

  if (!notes?.length) {
    return <EmptyList />;
  }

  return (
    <>
      <DragAndDrop handleDrop={handleDrop} className="mx-auto w-full">
        <div className="list-view mx-auto flex w-full max-w-3xl flex-col px-4 pb-16 pt-4 sm:py-16">
          <div className={`mb-12 flex items-center justify-end gap-4`}>
            <ListHeader
              ref={header}
              searchTerm={searchTerm}
              onChange={onSearch}
              onClear={onClear}
            />
          </div>
          <div className="relative">
            <ListElements notes={notes} searchTerm={searchTerm} />
          </div>
        </div>
      </DragAndDrop>
      <ListMenu />
    </>
  );
};

export default ListView;
