import localforage from 'localforage';
import colors from 'components/colors';
import { getNextViewStyle } from 'utils/oneFileUtils';
import { DEFAULT_FILE_PANELS, viewStyles } from 'components/AppConstants';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { Note } from 'types/Note';
import log from './log';

import { z } from 'zod';

const noteSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  wide: z.boolean(),
  text: z.string(),
  createdAt: z.number(),
  deletedAt: z.number().nullable(),
  updatedAt: z.number().nullable(),
  color: z.string(),
  style: z.string(),
  panels: z.object({
    viewer: z.boolean(),
    editor: z.boolean(),
    toc: z.boolean(),
  }),
  showFooter: z.boolean(),
});

function isNote(data: unknown): data is Note {
  return noteSchema.safeParse(data).success;
}

const STORAGE_MESSAGES_KEY = 'MNRAL_MSG';

export const getFullList = async () => {
  const keys = await localforage.keys();

  const promises = keys.map((key) =>
    localforage.getItem(key).then((val) => {
      if (!uuidValidate(key)) {
        return null;
      }

      if (!isNote(val)) {
        log.warn('Invalid note found', key, val);
        return null;
      }
      return val;
    }),
  );

  const unsortedList = await Promise.all(promises);
  const nonEmptyList = unsortedList.filter((x) => Boolean(x)) as Note[];
  return nonEmptyList;
};

export const newFile = (file: Partial<Note> = {}): Note => {
  const {
    title = '',
    text = '',
    wide = false,
    deletedAt = null,
    updatedAt = null,
    color = colors[0],
    style = viewStyles[0],
    createdAt = new Date().getTime(),
    panels = {
      viewer: true,
      editor: true,
      toc: false,
    },
    showFooter = true,
  } = file;

  // TO-DO: Mention that imported files will lose its original id
  const id = uuidv4();

  return {
    id,
    title,
    wide,
    text,
    createdAt,
    deletedAt,
    updatedAt,
    color,
    style,
    panels,
    showFooter,
  };
};

export const saveFile = (file: Note, ignoreUpdate = false) => {
  file.updatedAt = (ignoreUpdate && file.updatedAt) || new Date().getTime();
  file.panels = file.panels || DEFAULT_FILE_PANELS;
  return localforage.setItem(file.id, file);
};

export const restoreFile = async (fileId: Note['id']) => {
  const file = await localforage.getItem(fileId);
  if (isNote(file)) {
    file.deletedAt = null;
    return saveFile(file);
  }
  return Promise.reject('Invalid note');
};

export const downloadFile = (title = 'download.txt', content: Note['text']) => {
  const link = document.createElement('a');
  const blob = new window.Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);

  if (content.length > 2097152) {
    return `Oooooh file too big: ${content.length}`;
  }

  link.download = title;
  link.href = url;
  link.click();
  return true;
};

// export const exportAll = (
//   files: Note[],
//   fileName: string,
//   includeDate = true,
// ) => {
//   const strFiles = stringifyFiles(files);
//   const { exportableFiles, failedFiles } = strFiles;
//
//   const MAX_FILE_SIZE = 2000000;
//   const arrayOfExports = [];
//   let currentSize = 0;
//   let currentExport = [];
//
//   exportableFiles.forEach((file) => {
//     currentSize += file.length;
//     if (currentSize > MAX_FILE_SIZE) {
//       arrayOfExports.push(currentExport);
//       currentExport = [];
//       currentSize = 0;
//     }
//     currentExport.push(file);
//   });
//   arrayOfExports.push(currentExport);
//
//   const date = includeDate ? `-${format(new Date(), 'P')}` : '';
//   const finalFilename = fileName || 'mineral-backup';
//
//   arrayOfExports.forEach((exportableArray, index) => {
//     try {
//       const exportableString = '[' + exportableArray.join(',') + ']';
//       const shownIndex = index ? `-${index + 1}` : '';
//       downloadFile(
//         `${finalFilename}${date}${shownIndex}.json`,
//         exportableString,
//       );
//       return 'success';
//     } catch (error) {
//       log.warn(error);
//       return 'fail';
//     }
//   });
//   return failedFiles;
// };
//
// export const exportOneFile = (file, title) => {
//   return downloadFile(title, file.text);
// };

const stringifyFiles = (files: Note[]) => {
  const failedFiles = [] as Note['id'][];
  const stringifiedFiles = files.map((f) => {
    try {
      const str = JSON.stringify(f);
      return str;
    } catch (e) {
      failedFiles.push(f.id);
      return undefined;
    }
  });

  // Remove all undefineds
  const exportableFiles = stringifiedFiles.filter((s) => s);

  return {
    exportableFiles,
    failedFiles,
  };
};

const wipeOutNote = (noteId: Note['id']) => localforage.removeItem(noteId);

export const wipeOutDeleted = (notes: Note[]) => {
  try {
    const notesInBin = notes.filter((note) => note.deletedAt);
    const notePromises = notesInBin.map((note) => wipeOutNote(note.id));
    const wholePromise = Promise.all(notePromises);
    return wholePromise;
  } catch (error) {
    Promise.reject(error);
  }
};

export const filterByType = (files: Note[], type: BoxType) => {
  if (type === 'INBOX') {
    return files.filter((file) => !file.deletedAt);
  }

  return files.filter((file) => file.deletedAt);
};

export const filteredFiles = (files: Note[], searchTerm = '') => {
  const trimmedSearchTerm = searchTerm.trim();
  if (!trimmedSearchTerm) {
    return files;
  }

  const regexp = new RegExp(searchTerm, 'gi');
  // const filterTitle = (f: Note) =>
  //   f.title && f.title.toLowerCase().match(regexp);
  const filterAll = (f: Note) =>
    f.title.toLowerCase().match(regexp) || f.text.match(regexp);
  // const filter = searchContents ? filterAll : filterTitle;
  return files.filter(filterAll);
};

// TODO: This is so similar to filteredFiles that
// extracting the commonality is a must
export const findLuckyFile = (files: Note[], searchTerm = '') => {
  const trimmedSearchTerm = searchTerm.trim();
  if (!trimmedSearchTerm) {
    return files[0];
  }

  const regexp = new RegExp(trimmedSearchTerm, 'gi');
  const foundFile = files.find((f) => f.title.toLowerCase().match(regexp));

  return foundFile;
};

export const findLuckyFileInInbox = (files: Note[], searchTerm: string) => {
  const inboxFiles = filterByType(files, 'INBOX');
  if (!inboxFiles.length) {
    return;
  }

  const file = findLuckyFile(files, searchTerm);
  if (!file) {
    return;
  }

  return file.id;
};

export type BoxType = 'INBOX' | 'BIN';

export const getShownFiles = (
  files: Note[],
  type: BoxType,
  searchTerm: string,
) => {
  const filtered = filterByType(files, type);

  if (!searchTerm || !searchTerm.trim()) {
    return filtered;
  }

  const searchedFiles = filteredFiles(filtered, searchTerm);
  return searchedFiles as Note[];
};

// export const importFile = (importObject) => {
//   const { title, contents, type } = importObject;
//
//   if (type.match('json')) {
//     const promise = new Promise((_resolve, reject) => {
//       try {
//         const files = JSON.parse(contents);
//         const filePromises = files.map((file) => addFile(file));
//         const wholePromise = Promise.all(filePromises);
//         return wholePromise;
//       } catch (error) {
//         reject(error);
//       }
//     });
//     return promise;
//   }
//
//   // If it's a 'simple' text file
//   return addFile({
//     type,
//     title,
//     text: contents,
//   });
// };

export const fileNextStyle = (file: Note) => {
  const newStyle = getNextViewStyle(file);
  const newFile = Object.assign({}, file, { style: newStyle });
  return newFile;
};

// export const getSlidesFromText = (text:string) => {
//   const tokens = marked.lexer(text);
//   const slides = [];
//
//   let accumulatedTokens = [];
//   tokens.forEach((currentToken) => {
//     const isH1 = currentToken.type === 'heading' && currentToken.depth === 1;
//     const isFirstSlide = !slides.length && !accumulatedTokens.length;
//     const isBreak = currentToken.type === 'hr';
//
//     if (isBreak || (isH1 && !isFirstSlide)) {
//       accumulatedTokens.links = {};
//       slides.push(marked.parser(accumulatedTokens));
//       if (isH1) {
//         accumulatedTokens = [currentToken];
//         return;
//       }
//       accumulatedTokens = [];
//       return;
//     }
//     accumulatedTokens.push(currentToken);
//   });
//
//   // For the remaining tokens after the last "break" token
//   if (accumulatedTokens.length) {
//     accumulatedTokens.links = {};
//     slides.push(marked.parser(accumulatedTokens));
//   }
//
//   return slides;
// };

// export const filesAreIdentical = (
//   file1,
//   file2,
//   propsToCompare = ['title', 'text']
// ) => {
//   const comparer = (areSameSoFar, nextProp) => {
//     if (!areSameSoFar) {
//       return false;
//     }
//
//     return file1[nextProp] === file2[nextProp];
//   };
//
//   const areIdentical = propsToCompare.reduce(comparer, true);
//   return areIdentical;
// };
//
// export const goFindDuplicates = (fileList) => {
//   console.log('finding duplicates');
//   // const duplicates = [];
//
//   // fileList.forEach( (file, index) => {
//   //   for (let i = index + 1; i <= fileList.length; i++) {
//   //   }
//   // });
// };

export const isFileAlreadyLoaded = (props) => {
  const { currentFile } = props;
  const requestedFileId = props.router.query.id;
  const currentFileId = currentFile?.file?.id;
  return currentFileId && currentFileId === requestedFileId;
};

export const messageBroadcast = (message: Record<string, any>) => {
  localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(message));
  localStorage.removeItem(STORAGE_MESSAGES_KEY);
};

export const messageReceive = (ev) => {
  if (ev.key !== STORAGE_MESSAGES_KEY) {
    return false;
  }

  const message = JSON.parse(ev.newValue);
  return message;
};

// TO-DO: This is returning an array and should only return
// the code language or 'undefined'
export const isCode = (title) => /(\.([^.]+))$/.exec(title);

export const isMDTitle = (title) => {
  const langArray = isCode(title);
  if (!langArray) {
    return true;
  }

  return ['md', 'markdown'].includes(langArray[2]);
};
