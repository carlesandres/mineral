export const showShortcutModal = (shortcutList) => ({
  type: 'TOGGLE_SHORTCUT_MODAL',
  show: true,
  shortcutList,
});

export const hideShortcutModal = () => ({
  type: 'TOGGLE_SHORTCUT_MODAL',
  show: false,
});

export const addShortcuts = (keyActionMap, shortcutDescription) => ({
  type: 'ADD_SHORTCUTS',
  keyActionMap,
  shortcutDescription,
});
