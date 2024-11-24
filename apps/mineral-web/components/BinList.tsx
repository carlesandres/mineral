import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  ChangeEvent,
} from 'react';
import ListHeader from 'components/filelist/ListHeader';
import BinView from 'components/BinView';
import listShortcuts from 'components/listShortcuts';
import { useShortcuts } from 'hooks/useShortcuts';
import { useList } from 'hooks/useList';
import EmptyList from 'components/EmptyList';
import { useQueryParam } from 'hooks/useQueryP';
import { useRouter } from 'next/router';
import BinMenu from './BinMenu';

const BinList = () => {
  const header = useRef<HTMLInputElement>();
  const { dispatch: dispatchShortcuts } = useShortcuts();
  const { list } = useList();
  const [searchTerm, setSearchterm] = useState('');
  const router = useRouter();
  const { param: initialSearchTerm } = useQueryParam('search');
  const { notes } = list;

  useEffect(() => {
    if (initialSearchTerm) {
      setSearchterm(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  useEffect(() => {
    const keyActionMap = {};

    dispatchShortcuts({
      type: 'set',
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
    [router]
  );

  const onClear = () => setSearchterm('');

  if (!list.initialized || !router.isReady) {
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
            ref={header}
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
