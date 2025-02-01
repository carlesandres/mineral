import NotePageClient from 'components/NotePageClient';
import { Suspense } from 'react';

const NotePage = () => {
  return (
    <Suspense>
      <NotePageClient />
    </Suspense>
  );
};

export default NotePage;
