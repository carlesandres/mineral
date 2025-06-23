import { openGraph } from '@/utils/shared-metadata';
import BinList from 'components/BinList';
import { Metadata } from 'next';

const title = 'Bin';

export const metadata: Metadata = {
  title,
  alternates: {
    canonical: `/bin`,
  },
  openGraph: {
    ...openGraph,
    url: '/bin',
    title,
  },
};

const BinPage = () => {
  return <BinList />;
};

export default BinPage;
