import { getFullList, saveFile } from 'utils/fileUtils';

export const reloadList = async (dispatchList) => {
  const notes = await getFullList();
  dispatchList({ type: 'set-list', notes });
};

export const saveNote = (dispatchList, note) => {
  dispatchList({ type: 'update', note });
  return saveFile(note);
};
