import _ from 'lodash';
import log from 'utils/log';

import {
  CONFIRM_DELETE_CURRENT_FILE,
  CONFIRM_EXPORT_CURRENT_FILE,
  CURRENT_FILE_DELETED,
  CURRENT_FILE_EXPORTED,
  CURRENT_FILE_SAVED,
  DELETE_CURRENT_FILE,
  DISMISS_CONFIRMATION_MODAL,
  FILE_EXPORT_FAILED,
  FILE_NOT_FOUND,
  FILE_READ,
  HIDE_COLOR_PICKER,
  NEXT_STYLE,
  SAVE_CURRENT_FILE,
  SHOW_COLOR_PICKER,
} from 'components/AppConstants';

import {
  binFile,
  exportOneFile,
  readLocalFile,
  saveFile,
} from 'utils/fileUtils';

// This is VVVVVVEEEEEERRRRRRYYYYYY WRONG!!!!
export const dismissConfirmationModal = () => ({
  type: DISMISS_CONFIRMATION_MODAL,
});

export const deleteCurrentFile = () => {
  const deleting = (dispatch, getState) => {
    // TODO: This 'thunk' involves a break in
    // the fileArea and fileList separation of concerns
    // That-s why a new 'storage' reducer needs
    // to be created to handle storage operations
    const file = getState().currentFile.file;

    dispatch({ type: DELETE_CURRENT_FILE });

    return binFile(file.id).then((file) => {
      dispatch({
        type: CURRENT_FILE_DELETED,
        file,
      });

      dispatch(dismissConfirmationModal());
    });
  };

  return deleting;
};

export const readFile = (id) => async (dispatch) => {
  const file = await readLocalFile(id);

  if (file) {
    dispatch({
      type: FILE_READ,
      file,
    });
    return file;
  }

  dispatch({
    type: FILE_NOT_FOUND,
    id,
  });
  throw new Error(`File not found with id: ${id}`);
};

export const editFileAttr = (key, val) => {
  const wrappedAction = (dispatch) => {
    dispatch({
      type: 'EDIT_FILE_ATTR',
      key,
      val,
    });
    dispatch(saveCurrentFile());
  };

  return wrappedAction;
};

export const dismissCard = (cardTitle) => {
  const wrappedAction = (dispatch) => {
    dispatch({
      type: 'DISMISS_CARD',
      cardTitle,
    });
    dispatch(saveCurrentFile());
  };

  return wrappedAction;
};

export const togglePanel = (panel) => {
  const wrappedAction = (dispatch) => {
    dispatch({
      type: 'TOGGLE_PANEL',
      panel,
    });
    dispatch(saveCurrentFile());
  };

  return wrappedAction;
};

export const setPanels = (panels) => {
  const wrappedAction = (dispatch) => {
    dispatch({
      type: 'SET_PANELS',
      panels,
    });
    dispatch(saveCurrentFile());
  };

  return wrappedAction;
};

export const showColorPicker = () => ({ type: SHOW_COLOR_PICKER });
export const hideColorPicker = () => ({ type: HIDE_COLOR_PICKER });

export const doSaveCurrentFile = () => {
  const saving = (dispatch, getState) => {
    // TODO: This 'thunk' involves a break in
    // the fileArea and fileList separation of concerns
    // That-s why a new 'storage' reducer needs
    // to be created to handle storage operations
    const file = getState().currentFile.file;

    dispatch({ type: SAVE_CURRENT_FILE });

    if (typeof file.text === 'undefined') {
      log.log('Problem saving file');
    }

    saveFile(file).then((savedFile) => {
      setTimeout(() => {
        dispatch({
          type: CURRENT_FILE_SAVED,
          file: savedFile,
        });
      }, 1000);
    });
  };

  return _.throttle(saving, 3000);
};

const throttledSaveFile = _.throttle(doSaveCurrentFile, 3000);

export const saveCurrentFile = () => {
  const dispatched = (dispatch) => {
    dispatch(throttledSaveFile());
  };
  return dispatched;
};

export const confirmExportCurrentFile = () => (dispatch) => {
  const onConfirm = () => {
    dispatch(exportCurrentFile());
  };
  const onCancel = () => {
    dispatch(dismissConfirmationModal());
  };

  dispatch({
    type: CONFIRM_EXPORT_CURRENT_FILE,
    onConfirm,
    onCancel,
  });
};

export const exportCurrentFile = () => {
  const exporting = (dispatch, getState) => {
    const file = getState().currentFile.file;

    const result = exportOneFile(file);

    if (result === true) {
      dispatch({
        type: CURRENT_FILE_EXPORTED,
        file,
      });

      dispatch({ type: DISMISS_CONFIRMATION_MODAL });
    } else {
      dispatch({
        type: FILE_EXPORT_FAILED,
        message: result,
      });
    }

    // TO-DO: Deal with export errors
  };

  return exporting;
};

export const nextStyle = () => {
  const wrappedAction = (dispatch) => {
    dispatch({ type: NEXT_STYLE });

    dispatch(saveCurrentFile());
  };

  return wrappedAction;
};

export const confirmDeleteCurrentFile = () => (dispatch) => {
  const onConfirm = () => {
    dispatch(deleteCurrentFile());
  };
  const onCancel = () => {
    dispatch(dismissConfirmationModal());
  };

  dispatch({
    type: CONFIRM_DELETE_CURRENT_FILE,
    onConfirm,
    onCancel,
  });
};

export const onBlurEditArea = () => {
  log.log('onBlurEditArea');
};
