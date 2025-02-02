import _ from 'lodash';
import log from 'utils/log';

import {
  CURRENT_FILE_SAVED,
  DISMISS_CONFIRMATION_MODAL,
  HIDE_COLOR_PICKER,
  SAVE_CURRENT_FILE,
  SHOW_COLOR_PICKER,
} from 'components/AppConstants';

import { saveFile } from 'utils/fileUtils';

// This is VVVVVVEEEEEERRRRRRYYYYYY WRONG!!!!
export const dismissConfirmationModal = () => ({
  type: DISMISS_CONFIRMATION_MODAL,
});

export const showColorPicker = () => ({ type: SHOW_COLOR_PICKER });
export const hideColorPicker = () => ({ type: HIDE_COLOR_PICKER });

// TO-DO: Re-enable auto-save
// const throttledSaveFile = _.throttle(doSaveCurrentFile, 3000);

// export const saveCurrentFile = () => {
//   const dispatched = (dispatch) => {
//     dispatch(throttledSaveFile());
//   };
//   return dispatched;
// };

// export const confirmExportCurrentFile = () => (dispatch) => {
//   const onConfirm = () => {
//     dispatch(exportCurrentFile());
//   };
//   const onCancel = () => {
//     dispatch(dismissConfirmationModal());
//   };
//
//   dispatch({
//     type: CONFIRM_EXPORT_CURRENT_FILE,
//     onConfirm,
//     onCancel,
//   });
// };

// export const exportCurrentFile = () => {
//   const exporting = (dispatch, getState) => {
//     const file = getState().currentFile.file;
//
//     const result = exportOneFile(file);
//
//     if (result === true) {
//       dispatch({
//         type: CURRENT_FILE_EXPORTED,
//         file,
//       });
//
//       dispatch({ type: DISMISS_CONFIRMATION_MODAL });
//     } else {
//       dispatch({
//         type: FILE_EXPORT_FAILED,
//         message: result,
//       });
//     }
//
//     // TO-DO: Deal with export errors
//   };
//
//   return exporting;
// };
