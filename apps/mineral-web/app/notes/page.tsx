import ListView from 'components/ListView';
import { Suspense } from 'react';

const NotesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListView />
    </Suspense>
  );
};

export default NotesPage;
