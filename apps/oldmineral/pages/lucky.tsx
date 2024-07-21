import { findLuckyFileInInbox } from 'utils/fileUtils.js';
import { goToNote, goToList } from 'utils/navigationHelpers';
import PleaseWait from 'components/PleaseWait';
import { useEffect } from 'react';
import { useList } from 'hooks/useList';
import PageLayout from 'components/PageLayout';
import { useRouter } from 'next/router';

const LuckyPage = () => {
  const router = useRouter();
  const { isReady, query } = router;
  const { state: list } = useList();

  useEffect(() => {
    const { initialized, notes } = list;
    if (initialized && isReady) {
      const searchTerm = Array.isArray(query.search)
        ? query.search[0]
        : query.search;
      const id = findLuckyFileInInbox(notes, searchTerm);
      if (id) {
        goToNote(id, null, true);
        return;
      }
      goToList(searchTerm);
    }
  }, [list, isReady, query?.search]);

  // TO-DO: Deal with none-found

  return <PleaseWait message="Initializing. Please wait..." />;
};

const LuckyPageWrapper = () => (
  <PageLayout>
    <LuckyPage />
  </PageLayout>
);

export default LuckyPageWrapper;
