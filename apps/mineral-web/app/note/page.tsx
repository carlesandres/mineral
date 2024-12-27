import NotePageClient from 'components/NotePageClient';
import { Suspense } from 'react';

const NotePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotePageClient />
    </Suspense>
  );
};

export default NotePage;
