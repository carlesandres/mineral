'use client';

import SettingsCheckbox from 'components/SettingsCheckbox';
import ThemeSetting from './theme-setting';
import { LineHeightSlider } from './LineHeightSlider';

const SettingsPage = () => {
  return (
    <div className="m-16 mx-auto w-full px-8 sm:px-16 md:max-w-3xl">
      <h2 className="mb-8 flex items-center gap-2 text-xl font-bold">
        Settings
      </h2>
      <ThemeSetting />

      <SettingsCheckbox
        name="footerHiddenByDefault"
        label="Hide editor footer in new notes"
      />
      <SettingsCheckbox name="gfm" label="Use GFM (Github Flavored Markdown)" />
      <LineHeightSlider />
    </div>
  );
};

export default SettingsPage;
