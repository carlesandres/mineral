import ListView from 'components/ListView';
import { Suspense } from 'react';

export const metadata = {
  title: 'Notes',
  description:
    'A list with all your notes. Search by title or title + content.',
};

const NotesPage = () => {
  return (
    <Suspense>
      <ListView />
    </Suspense>
  );
};

export default NotesPage;
