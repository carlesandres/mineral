import ListView from 'components/ListView';
import { Suspense } from 'react';

export const metadata = {
  title: 'Notes',
  description: 'Your quick notes',
};

const NotesPage = () => {
  return (
    <Suspense>
      <ListView />
    </Suspense>
  );
};

export default NotesPage;
