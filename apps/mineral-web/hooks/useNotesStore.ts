import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';
import { Note } from 'types/Note';
import { saveFile } from '../utils/fileUtils';

interface StoreState {
  initialized: boolean;
  notes: Record<string, Note>;
}

const useNotesStore = create<StoreState>(() => ({
  initialized: false,
  notes: {},
}));

export const loadNotes = () => {
  const notes = localStorage.getItem('notes') || '[]';
  setNotes(JSON.parse(notes));
  setInitialized(true);
};

const setInitialized = (initialized: boolean) =>
  useNotesStore.setState((state) => ({ ...state, initialized }));

const setNotes = (notes: Note[]) =>
  useNotesStore.setState((state) => {
    const newState = produce(state, (draftState) => {
      notes.forEach((note) => {
        draftState.notes[note.id] = note;
      });
    });
    return newState;
  });

export const setNote = (note: Note) =>
  useNotesStore.setState((state) => {
    const newState = produce(state, (draftState) => {
      draftState.notes[note.id] = note;
      saveFile(draftState.notes[note.id]);
    });
    return newState;
  });

export const updateNote = (noteId: string, note: Partial<Note>) =>
  useNotesStore.setState((state) => {
    const newState = produce(state, (draftState) => {
      draftState.notes[noteId] = { ...draftState.notes[noteId], ...note };
      saveFile(draftState.notes[noteId]);
    });
    return newState;
  });

export const binNote = (noteId: string) =>
  updateNote(noteId, { deletedAt: new Date().getTime() });

export const unbinNote = (noteId: string) =>
  updateNote(noteId, { deletedAt: null, updatedAt: new Date().getTime() });

export const deleteNote = (noteId: string) =>
  useNotesStore.setState((state) => {
    const newState = produce(state, (draftState) => {
      delete draftState.notes[noteId];
    });
    return newState;
  });

export const getNotes = () => Object.values(useNotesStore.getState().notes);

export const getNoteById = (noteId: string) =>
  useNotesStore.getState().notes[noteId];

export default useNotesStore;
