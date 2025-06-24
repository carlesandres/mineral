import { openGraph } from '@/utils/shared-metadata';
import NotePageClient from 'components/NotePageClient';
import { Metadata } from 'next';
import { Suspense } from 'react';

const title = 'Note';

export const metadata: Metadata = {
  title,
  openGraph: {
    ...openGraph,
    title,
  },
};

const NotePage = () => {
  return (
    <Suspense>
      <NotePageClient />
    </Suspense>
  );
};

export default NotePage;
