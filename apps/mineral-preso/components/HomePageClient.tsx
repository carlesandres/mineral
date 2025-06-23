'use client';

import { useLanding } from 'hooks/useLanding';
import IntroPage from './Intro';

const HomePageClient = () => {
  useLanding();

  return <IntroPage />;
};

export default HomePageClient;
