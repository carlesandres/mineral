import React from 'react';
import Modal from 'components/Modal';
import { useEffect, useCallback } from 'react';
import { useShortcuts } from 'hooks/useShortcuts';
import useSettingsStore, { setSetting } from 'utils/useSettingsStore';
import {
  goToNewFile,
  goToSettings,
  goToList,
  goBack,
} from 'utils/navigationHelpers';
import ShortcutDescription from 'components/ShortcutDescription';

const commonShortcutsDescription = [
  {
    sequence: ['ESC'],
    description: 'Leave shortcut mode',
    requiresActivation: true,
  },
  {
    sequence: ['r'],
    description: 'Toggle dark mode',
    requiresActivation: false,
  },
  {
    sequence: ['n'],
    description: 'Create new file',
    requiresActivation: true,
  },
  {
    sequence: ['l'],
    description: 'Go to List',
    requiresActivation: true,
  },
  {
    sequence: ['s'],
    description: 'Go to Settings',
    requiresActivation: true,
  },
  {
    sequence: ['b'],
    description: 'Go back',
    requiresActivation: true,
  },
];

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const ShortcutsModal = (props: Props) => {
  const { state, dispatch } = useShortcuts();
  const { show, keyActionMap, shortcutDescription = [] } = state;
  const { darkMode } = useSettingsStore();

  const toggleDarkMode = useCallback(
    () => setSetting('darkMode', !darkMode),
    [darkMode, setSetting]
  );

  const commonShcutsKeyActionMap = {
    Escape: () => {},
    n: goToNewFile,
    l: goToList,
    s: goToSettings,
    b: goBack,
    r: toggleDarkMode,
  };

  const fullKeyActionMap = { ...keyActionMap, ...commonShcutsKeyActionMap };

  const executeAction = useCallback(
    (key: string, event?: KeyboardEvent) => {
      const keys = Object.keys(fullKeyActionMap);
      if (!keys.includes(key)) {
        return;
      }

      if (show) {
        dispatch({ type: 'hide' });
      }

      const keyDef = fullKeyActionMap[key];

      let action;
      let requiresActivation = true;
      if (typeof keyDef === 'function') {
        action = keyDef;
      } else {
        ({ action, requiresActivation = true } = keyDef);
      }

      const canRun = Boolean(requiresActivation) === Boolean(show);

      if (canRun) {
        action();
        event?.stopPropagation();
        event?.preventDefault();
      }
    },
    [dispatch, fullKeyActionMap, show]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { ctrlKey, metaKey, key } = event;

      if ((metaKey || ctrlKey) && key === 'k' && !show) {
        event.stopPropagation();
        event.preventDefault();
        dispatch({ type: 'show' });
        return;
      }

      const keys = Object.keys(fullKeyActionMap);
      if (keys.includes(key)) {
        executeAction(key, event);
      }
    },
    [show, fullKeyActionMap, dispatch]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown, fullKeyActionMap]);

  const allShortcuts =
    shortcutDescription.concat(commonShortcutsDescription) || [];

  const hideModal = () => dispatch({ type: 'hide' });

  const renderedShortcuts = allShortcuts.map((shcut) => {
    return (
      <ShortcutDescription
        key={shcut.description}
        description={shcut.description}
        keys={shcut.sequence}
        onClick={executeAction}
      />
    );
  });

  return (
    <Modal
      className="kbshortcuts sm:max-w-2xl"
      onClose={hideModal}
      title="Shortcuts (Ctrl + k)"
      isOpen={show}
    >
      <div className="shortcuts-container p-8">
        <ul className="grid flex-1 gap-x-4 gap-y-6 md:grid-cols-2">
          {renderedShortcuts}
        </ul>
      </div>
    </Modal>
  );
};

export default ShortcutsModal;
