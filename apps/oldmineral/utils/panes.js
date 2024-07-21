import { DEFAULT_FILE_PANELS } from 'components/AppConstants.js';

export const getVisiblePanels = (file = {}) => {
  const { panels = DEFAULT_FILE_PANELS } = file;
  const showViewer = panels.viewer;
  const showEditor = panels.editor;
  const showTOC = panels.toc;
  const sideBySide = showViewer && showEditor;
  return {
    showViewer,
    showEditor,
    showTOC,
    sideBySide,
  };
};
