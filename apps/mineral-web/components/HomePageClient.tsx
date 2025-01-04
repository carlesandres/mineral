'use client';

import { useLanding } from 'hooks/useLanding';
import IntroPage from './Intro';

export const metadata = {
  title: 'Mineral',
  description:
    'A minimalistic editor for your quick notes. Markdown support. Fully private notes.',
};

const HomePageClient = () => {
  useLanding();

  return <IntroPage />;
};

export default HomePageClient;
