'use client';

import SettingsCheckbox from 'components/SettingsCheckbox';
import Label from 'components/Label';
import { Cog } from 'lucide-react';
import ThemeSetting from './theme-setting';

// const lineHeights = new Map([
//   ['Small', '1.5'],
//   ['Medium', '1.6'],
//   ['Normal', '1.75'],
//   ['Large', '2'],
//   ['Very large', '2.5'],
// ]);
//
const SettingsPage = () => {
  // const onChangeLinespacing = (value: any) =>
  //   setSetting('lineHeightRem', value);

  return (
    <div className="m-16 mx-auto w-full px-8 sm:px-16 md:max-w-3xl">
      <h2 className="mb-8 flex items-center gap-2 text-xl font-bold">
        <Cog />
        <span>Settings</span>
      </h2>
      <Label className="mt-16">General</Label>
      <ThemeSetting />

      <Label className="mt-16">Editor</Label>
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
      <Label className="mt-16">Markdown</Label>
      <SettingsCheckbox name="gfm" label="Use GFM (Github Flavored Markdown)" />
    </div>
  );
};

export default SettingsPage;
