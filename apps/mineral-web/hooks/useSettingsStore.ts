import { create } from 'zustand';
import localforage from 'localforage';
import { messageBroadcast } from 'utils/fileUtils';

const SETTINGS_KEY = 'USER_SETTINGS';
const loadSettings = () => localforage.getItem(SETTINGS_KEY);
const saveSettings = (settings: SettingsStoreState) =>
  localforage.setItem(SETTINGS_KEY, settings);

export interface SettingsStoreState {
  emptyBinConfirm: boolean;
  // TO-DO: This lineHeight should be more restrictive (maybe a number)
  lineHeightRem: number;
  gfm: true;
  footerHiddenByDefault: boolean;
}

export const hardCodedDefaults: SettingsStoreState = {
  emptyBinConfirm: true,
  lineHeightRem: 1.75,
  gfm: true,
  footerHiddenByDefault: false,
};

const useSettingsStore = create<SettingsStoreState>(() => hardCodedDefaults);

export const setSetting = async (key: keyof SettingsStoreState, value: any) => {
  useSettingsStore.setState((state) => {
    const validKeys = Object.keys(
      hardCodedDefaults,
    ) as (keyof SettingsStoreState)[];
    const settings = {} as SettingsStoreState;
    for (const k of validKeys) {
      // @ts-ignore
      settings[k] = state[k];
    }
    // @ts-ignore
    settings[key] = value;
    saveSettings(settings).then(() => {
      messageBroadcast({
        command: 'settingChange',
      });
    });
    return { [key]: value };
  });
};

export const loadFromStorage = async () => {
  const settings = await loadSettings();
  useSettingsStore.setState((state) => {
    return settings || state;
  });
};

export default useSettingsStore;
