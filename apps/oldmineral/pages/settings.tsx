import { ReactNode } from 'react';
import PageLayout from 'components/PageLayout';
import SettingsView from 'components/SettingsView';

const SettingsPage = () => <SettingsView />;

SettingsPage.getLayout = (page: ReactNode) => {
  return (
    <PageLayout isFixedHeight pageClass="settings" title="Settings">
      {page}
    </PageLayout>
  );
};
export default SettingsPage;
