import { openGraph } from '@/utils/shared-metadata';
import SettingsView from 'components/SettingsView';
import { Metadata } from 'next';

const title = 'Settings';

export const metadata: Metadata = {
  title,
  alternates: {
    canonical: `/settings`,
  },
  openGraph: {
    ...openGraph,
    url: '/settings',
    title,
  },
};

const SettingsPage = () => {
  return <SettingsView />;
};

export default SettingsPage;
