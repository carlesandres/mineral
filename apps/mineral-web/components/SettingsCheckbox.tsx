import { useCallback } from 'react';
import Checkbox from 'components/Checkbox';
import useSettingsStore, {
  setSetting,
  SettingsStoreState,
} from 'hooks/useSettingsStore';

export interface SettingsCheckboxProps {
  label: string;
  name: keyof SettingsStoreState;
}

const SettingsCheckbox = (props: SettingsCheckboxProps) => {
  const settings = useSettingsStore();
  const { label, name } = props;

  const changeCheckboxSetting = useCallback(
    (value: boolean) => {
      if (name in settings) {
        setSetting(name, value);
      }
    },
    [settings, name],
  );

  return (
    <Checkbox
      name={name}
      label={label}
      checked={!!settings[name]}
      onCheckedChange={changeCheckboxSetting}
    />
  );
};

export default SettingsCheckbox;
