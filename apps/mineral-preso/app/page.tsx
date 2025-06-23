import HomePageClient from 'components/HomePageClient';
import { Metadata } from 'next';
import { openGraph } from 'utils/shared-metadata';

const title = 'Features';

export const metadata: Metadata = {
  title,
  alternates: {
    canonical: `/`,
  },
  openGraph: {
    ...openGraph,
    url: '/',
    title,
  },
};

const HomePage = () => {
  return <HomePageClient />;
};

export default HomePage;
