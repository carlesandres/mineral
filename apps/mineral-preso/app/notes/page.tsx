import { openGraph } from '@/utils/shared-metadata';
import ListView from 'components/ListView';
import { Metadata } from 'next';
import { Suspense } from 'react';

const title = 'Notes';
const description = 'A list with all your notes. Search by title or content.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `/notes`,
  },
  openGraph: {
    ...openGraph,
    url: '/notes',
    description,
    title,
  },
};

const NotesPage = () => {
  return (
    <Suspense>
      <ListView />
    </Suspense>
  );
};

export default NotesPage;
