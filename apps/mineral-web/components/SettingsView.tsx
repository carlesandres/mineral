'use client';

import useSettingsStore, { setSetting } from 'hooks/useSettingsStore';
import HorzRadioGroup from 'components/HorzRadioGroup';
import SettingsCheckbox from 'components/SettingsCheckbox';
import Label from 'components/Label';
import { HiOutlineCog } from 'react-icons/hi';

const lineHeights = new Map([
  ['Small', '1.5'],
  ['Medium', '1.6'],
  ['Normal', '1.75'],
  ['Large', '2'],
  ['Very large', '2.5'],
]);

const SettingsPage = () => {
  const settings = useSettingsStore();

  // const _findDuplicates = () => {
  // TO-DO: Need to check if the fileList is initialized first
  // this.props.findDuplicates(this.props.fileList.files);
  // };

  // const keyActionMap = { l: goToList };
  // this.props.addShortcuts(keyActionMap, settingsShortcuts);

  const onChangeLinespacing = (value: any) =>
    setSetting('lineHeightRem', value);

  return (
    <div className="m-16 mx-auto w-full px-8 sm:px-16 md:max-w-3xl">
      <h2 className="mb-8 flex items-center gap-2 text-xl font-bold">
        <HiOutlineCog />
        <span>Settings</span>
      </h2>
      <Label className="mt-16">General</Label>
      <SettingsCheckbox
        name="emptyBinConfirm"
        label="Ask for confirmation before emptying the bin"
      />
      <SettingsCheckbox name="darkMode" label="Dark Mode" />
      <Label className="mt-16">Editor</Label>
      <SettingsCheckbox
        name="dimBlurredEditor"
        label="Dim editor text when not in focus"
      />
      <SettingsCheckbox
        name="footerHiddenByDefault"
        label="Hide editor footer in new notes"
      />
      <HorzRadioGroup
        options={lineHeights}
        onChange={onChangeLinespacing}
        selectedOption={settings?.lineHeightRem}
        label="Editor line space:"
      />
      <Label className="mt-16">Markdown</Label>
      <SettingsCheckbox
        name="startWithPreview"
        label="Show Markdown panel on new notes"
      />
      <SettingsCheckbox name="gfm" label="Use GFM (Github Flavored Markdown)" />
      {/* <BatchFileTools */}
      {/*   delete={this.props.deleteAllEmptyFiles} */}
      {/* /> */}
      {/* <button onClick={this.findDuplicates}>Dup</button> */}
    </div>
  );
};

export default SettingsPage;
