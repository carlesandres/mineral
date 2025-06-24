'use client';

import SettingsCheckbox from 'components/SettingsCheckbox';
import Label from 'components/Label';
import { Cog } from 'lucide-react';
import ThemeSetting from './theme-setting';
import { LineHeightSlider } from './LineHeightSlider';

const SettingsPage = () => {
  // const onChangeLinespacing = (value: any) =>
  //   setSetting('lineHeightRem', value);

  return (
    <div className="m-16 mx-auto w-full px-8 sm:px-16 md:max-w-3xl">
      <h2 className="mb-8 flex items-center gap-2 text-xl font-bold">
        Settings
      </h2>
      <Label className="mt-8">General</Label>
      <ThemeSetting />

      <Label className="mt-8">Editor</Label>
      <SettingsCheckbox
        name="footerHiddenByDefault"
        label="Hide editor footer in new notes"
      />
      {/*
      <HorzRadioGroup
        options={lineHeights}
        onChange={onChangeLinespacing}
        selectedOption={settings?.lineHeightRem}
        label="Editor line space:"
      />
      */}
      <Label className="mt-8">Viewer</Label>
      <SettingsCheckbox name="gfm" label="Use GFM (Github Flavored Markdown)" />
      <LineHeightSlider />
    </div>
  );
};

export default SettingsPage;
