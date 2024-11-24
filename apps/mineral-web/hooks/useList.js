import { createContext, useReducer, useContext, useEffect } from 'react';
import { getFullList, saveFile } from 'utils/fileUtils';
import listReducer from 'utils/listReducer';

const ListContext = createContext();

const defaultState = {
  initialized: false,
  notes: [],
};

export const reloadList = async (dispatchList) => {
  const notes = await getFullList();
  dispatchList({ type: 'set-list', notes });
};

export const binNote = (dispatchList, note) => {
  const newNote = { ...note, deletedAt: new Date().getTime() };
  return saveNote(dispatchList, newNote);
};

export const saveNote = (dispatchList, note) => {
  dispatchList({ type: 'update', note });
  return saveFile(note);
};

export function ListProvider({ children }) {
  const [state, dispatch] = useReducer(listReducer, defaultState);
  const value = { state, dispatch };

  useEffect(() => {
    reloadList(dispatch);
  }, []);

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
}

export function useList() {
  const context = useContext(ListContext);
  const { state, dispatch } = context;
  if (typeof context === 'undefined') {
    throw new Error('useList must be used within a ListProvider');
  }

  return { list: state, dispatchList: dispatch };
}
