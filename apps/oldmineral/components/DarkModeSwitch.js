import useSettingsStore from 'utils/useSettingsStore';
import { Switch } from '@headlessui/react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useCallback } from 'react';

const DarkModeSwitch = () => {
  const { darkMode, setSetting } = useSettingsStore();

  const toggleDarkMode = useCallback(
    () => setSetting('darkMode', !darkMode),
    [darkMode, setSetting]
  );

  const icon = darkMode ? <FiSun /> : <FiMoon />;

  return (
    <div className="dark-mode-switch mt-4 flex items-center space-x-2">
      <Switch
        checked={darkMode}
        onChange={toggleDarkMode}
        className={`${
          darkMode ? 'bg-gray-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Dark Mode Switch</span>
        <span
          className={`${
            darkMode ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white`}
        />
      </Switch>
      {icon}
    </div>
  );
};

export default DarkModeSwitch;
