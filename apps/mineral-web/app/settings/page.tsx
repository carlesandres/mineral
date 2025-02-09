import SettingsView from 'components/SettingsView';

export const metadata = {
  title: 'Settings',
  description: 'Customize your Mineral experience',
  openGraph: {
    title: 'Settings',
    description: 'Customize your Mineral experience',
  },
};

const SettingsPage = () => {
  return <SettingsView />;
};

export default SettingsPage;
