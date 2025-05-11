import SlidePageClient from 'components/SlidePageClient';
import { Suspense } from 'react';

const SlidePage = () => {
  return (
    <Suspense>
      <SlidePageClient />
    </Suspense>
  );
};

export default SlidePage;
