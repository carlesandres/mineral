import { useCallback } from 'react';
import Checkbox from 'components/Checkbox';
import { ChangeEvent } from 'react';
import useSettingsStore, { setSetting } from 'hooks/useSettingsStore';

export interface SettingsCheckboxProps {
  label: string;
  name: string;
}

const SettingsCheckbox = (props: SettingsCheckboxProps) => {
  const settings = useSettingsStore();
  const { label, name } = props;

  const changeCheckboxSetting = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      if (target.name in settings) {
        // TO-DO: I need to find out how to do this properly in TS
        // @ts-ignore
        setSetting(target.name, value);
      }
    },
    [setSetting],
  );

  return (
    <Checkbox
      name={name}
      label={label}
      checked={!!settings[name]}
      onChange={changeCheckboxSetting}
    />
  );
};

export default SettingsCheckbox;
