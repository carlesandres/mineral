import { Note } from 'types/Note';
import { getNextViewStyle } from 'utils/oneFileUtils';

export interface ListState {
  notes: Note[];
}

function listReducer(state: ListState, action: any) {
  const { notes } = state;

  switch (action.type) {
    case 'set-list': {
      const newNotes = action.notes;
      return { ...state, notes: [...newNotes], initialized: true };
    }
    case 'append': {
      const newNotes = [...notes, action.note];
      return { ...state, notes: newNotes };
    }
    case 'update': {
      const { note } = action;
      if (!note) {
        console.warn('"update" action called without a note');
        return state;
      }
      const index = notes.findIndex((dbNote: Note) => dbNote.id === note.id);
      if (index === -1) {
        console.warn('Weird, the note has not been found');
        return state;
      }

      const newNotes = [...notes];
      note.updatedAt = new Date().getTime();
      newNotes[index] = { ...note };

      return { ...state, notes: newNotes };
    }
    case 'merge': {
      const { id, partial } = action;
      if (!id) {
        console.warn('"merge" action called without a note id');
        return state;
      }
      const index = notes.findIndex((dbNote: Note) => dbNote.id === id);
      if (index === -1) {
        console.warn('Weird, the note has not been found');
        return state;
      }

      const newNotes = [...notes];
      newNotes[index] = { ...newNotes[index], ...partial };

      return { ...state, notes: newNotes };
    }
    case 'merge-panels': {
      const { id, panels } = action;
      if (!id) {
        console.warn('"merge" action called without a note id');
        return state;
      }
      const index = notes.findIndex((dbNote: Note) => dbNote.id === id);
      if (index === -1) {
        console.warn('Weird, the note has not been found');
        return state;
      }

      const newNotes = [...notes];
      const oldPanels = newNotes[index]?.panels || {};
      const newPanels = { ...oldPanels, ...panels };
      newNotes[index] = { ...newNotes[index], panels: newPanels };

      return { ...state, notes: newNotes };
    }
    case 'next-style': {
      const { id } = action;
      if (!id) {
        console.warn('"merge" action called without a note id');
        return state;
      }
      const index = notes.findIndex((dbNote: Note) => dbNote.id === id);
      if (index === -1) {
        console.warn('Weird, the note has not been found');
        return state;
      }

      const newNotes = [...notes];
      const currentStyle = notes[index].style;
      const nextStyle = getNextViewStyle(currentStyle);
      newNotes[index] = { ...newNotes[index], style: nextStyle };

      return { ...state, notes: newNotes };
    }
    case 'remove': {
      if (!action.id) {
        return state;
      }
      const { notes } = state;
      const index = notes.findIndex((note: Note) => note.id === action.id);
      if (index === -1) {
        return { ...state };
      }

      const newNotes = [...notes];
      newNotes.splice(index, 1);

      return { ...state, notes: newNotes };
    }
    case 'bin': {
      const { notes } = state;
      if (!action.id) {
        console.warn('"bin" action called without a note id');
        return state;
      }
      const index = notes.findIndex((note) => note.id === action.id);
      if (index === -1) {
        console.warn('Weird, the note has not been found');
        return state;
      }
      const newNotes = [...notes];
      newNotes[index].deletedAt = new Date().getTime();

      return { ...state, notes: newNotes };
    }
    case 'empty-bin': {
      const { notes } = state;
      const notesToKeep = notes.filter((n) => !n.deletedAt);
      console.log('notesToKeep', notesToKeep);
      return { ...state, notes: notesToKeep };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export default listReducer;
