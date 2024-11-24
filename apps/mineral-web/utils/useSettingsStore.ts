import { create } from 'zustand';
import localforage from 'localforage';
import { messageBroadcast } from 'utils/fileUtils.js';

const SETTINGS_KEY = 'USER_SETTINGS';
const loadSettings = () => localforage.getItem(SETTINGS_KEY);
const saveSettings = (settings: StoreState) =>
  localforage.setItem(SETTINGS_KEY, settings);

interface StoreState {
  darkMode: boolean;
  dimBlurredEditor: boolean;
  emptyBinConfirm: boolean;
  startWithPreview: boolean;
  // TO-DO: This lineHeight should be more restrictive (maybe a number)
  lineHeightRem: string;
  gfm: true;
  footerHiddenByDefault: boolean;
}

export const hardCodedDefaults: StoreState = {
  darkMode: false,
  dimBlurredEditor: false,
  emptyBinConfirm: true,
  startWithPreview: false,
  lineHeightRem: '1.75',
  gfm: true,
  footerHiddenByDefault: false,
};

const useSettingsStore = create<StoreState>(() => hardCodedDefaults);

export const setSetting = async (key: keyof StoreState, value: any) => {
  useSettingsStore.setState((state) => {
    const validKeys = Object.keys(hardCodedDefaults) as (keyof StoreState)[];
    const settings = {} as StoreState;
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
