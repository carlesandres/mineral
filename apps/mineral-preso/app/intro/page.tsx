import { openGraph } from '@/utils/shared-metadata';
import { Metadata } from 'next';

export { default } from 'components/Intro';

const title = 'Features';

export const metadata: Metadata = {
  title,
  alternates: {
    canonical: `/intro`,
  },
  openGraph: {
    ...openGraph,
    url: '/intro',
    title,
  },
};
