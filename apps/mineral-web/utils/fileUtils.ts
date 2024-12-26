import localforage from 'localforage';
import colors from 'components/colors';
import { getNextViewStyle } from 'utils/oneFileUtils';
import { DEFAULT_FILE_PANELS, viewStyles } from 'components/AppConstants';
import { marked } from 'marked';
import format from 'date-fns/format';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { Note } from 'types/Note';
import log from './log';

const STORAGE_MESSAGES_KEY = 'MNRAL_MSG';

export const getFullList = async () => {
  const keys = await localforage.keys();

  const promises = keys.map((key) =>
    localforage.getItem(key).then((val) => {
      if (!uuidValidate(key)) {
        return null;
      }

      const obj= {
        ...val,
        internalId: key,
      };
      return obj as Note;
    })
  );

  const unsortedList = await Promise.all(promises);
  const nonEmptyList = unsortedList.filter((x) => x);
  return nonEmptyList;
};

export const newFile = (file:Partial<Note> = {}):Note => {
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

export const addFile = (fileDefaults) => saveFile(newFile(fileDefaults), true);

export const readLocalFile = async (...rest) => {
  const file = await localforage.getItem(...rest);
  if (!file) {
    return null;
  }

  // TO-DO: This should be moved to a "validation" method
  if (Array.isArray(file.panels)) {
    file.panels = {
      viewer: true,
      editor: true,
      toc: false,
    };
  }

  return file;
};

export const saveFile = (file, ignoreUpdate = false) => {
  // console.log('saving file', file.id);
  file.updatedAt = (ignoreUpdate && file.updatedAt) || new Date().getTime();
  file.panels = file.panels || DEFAULT_FILE_PANELS;
  return localforage.setItem(file.id, file);
};

export const restoreFile = (fileId) =>
  localforage.getItem(fileId).then((file) => {
    file.deletedAt = null;
    return saveFile(file);
  });

export const downloadFile = (title = 'download.txt', content) => {
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

export const exportAll = (files, fileName, includeDate = true) => {
  const strFiles = stringifyFiles(files);
  const { exportableFiles, failedFiles } = strFiles;

  const MAX_FILE_SIZE = 2000000;
  const arrayOfExports = [];
  let currentSize = 0;
  let currentExport = [];

  exportableFiles.forEach((file) => {
    currentSize += file.length;
    if (currentSize > MAX_FILE_SIZE) {
      arrayOfExports.push(currentExport);
      currentExport = [];
      currentSize = 0;
    }
    currentExport.push(file);
  });
  arrayOfExports.push(currentExport);

  const date = includeDate ? `-${format(new Date(), 'P')}` : '';
  const finalFilename = fileName || 'mineral-backup';

  arrayOfExports.forEach((exportableArray, index) => {
    try {
      const exportableString = '[' + exportableArray.join(',') + ']';
      const shownIndex = index ? `-${index + 1}` : '';
      downloadFile(
        `${finalFilename}${date}${shownIndex}.json`,
        exportableString
      );
      return 'success';
    } catch (error) {
      log.warn(error);
      return 'fail';
    }
  });
  return failedFiles;
};

export const exportOneFile = (file, title) => {
  return downloadFile(title, file.text);
};

const stringifyFiles = (files) => {
  const failedFiles = [];
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

const wipeOutFile = (fileId) => localforage.removeItem(fileId);

export const wipeOutDeleted = (files) => {
  try {
    const filePromises = files.map((file) => wipeOutFile(file.id));
    const wholePromise = Promise.all(filePromises);
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

const escapeRegExp = (string) =>
  string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

export const filteredFiles = (files, searchTerm = '') => {
  const trimmedSearchTerm = searchTerm.trim();
  if (!trimmedSearchTerm) {
    return files;
  }

  const realSearchTerm = escapeRegExp(trimmedSearchTerm.match('#?(.*)')[1]);
  const searchContents = trimmedSearchTerm.startsWith('#');

  const regexp = new RegExp(realSearchTerm, 'gi');
  const filterTitle = (f) => f.title && f.title.toLowerCase().match(regexp);
  const filterAll = (f) =>
    f.title.toLowerCase().match(regexp) || f.text.match(regexp);
  const filter = searchContents ? filterAll : filterTitle;
  return files.filter(filter);
};

// TODO: This is so similar to filteredFiles that
// extracting the commonality is a must
export const findLuckyFile = (files, searchTerm = '') => {
  const trimmedSearchTerm = searchTerm.trim();
  if (!trimmedSearchTerm) {
    return files;
  }

  const regexp = new RegExp(trimmedSearchTerm, 'gi');
  const foundFile = files.find((f) => f.title.toLowerCase().match(regexp));

  return foundFile;
};

export const findLuckyFileInInbox = (files, searchTerm) => {
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

export const getShownFiles = (files: Note[], type: BoxType, searchTerm:string) => {
  const filtered = filterByType(files, type);

  if (!searchTerm || !searchTerm.trim()) {
    return filtered;
  }

  const searchedFiles = filteredFiles(filtered, searchTerm);
  return searchedFiles as Note[];
};

export const importFile = (importObject) => {
  const { title, contents, type } = importObject;

  if (type.match('json')) {
    const promise = new Promise((_resolve, reject) => {
      try {
        const files = JSON.parse(contents);
        const filePromises = files.map((file) => addFile(file));
        const wholePromise = Promise.all(filePromises);
        return wholePromise;
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  // If it's a 'simple' text file
  return addFile({
    type,
    title,
    text: contents,
  });
};

export const fileNextStyle = (file) => {
  const newStyle = getNextViewStyle(file);
  const newFile = Object.assign({}, file, { style: newStyle });
  return newFile;
};

export const getSlidesFromText = (text) => {
  const tokens = marked.lexer(text);
  const slides = [];

  let accumulatedTokens = [];
  tokens.forEach((currentToken) => {
    const isH1 = currentToken.type === 'heading' && currentToken.depth === 1;
    const isFirstSlide = !slides.length && !accumulatedTokens.length;
    const isBreak = currentToken.type === 'hr';

    if (isBreak || (isH1 && !isFirstSlide)) {
      accumulatedTokens.links = {};
      slides.push(marked.parser(accumulatedTokens));
      if (isH1) {
        accumulatedTokens = [currentToken];
        return;
      }
      accumulatedTokens = [];
      return;
    }
    accumulatedTokens.push(currentToken);
  });

  // For the remaining tokens after the last "break" token
  if (accumulatedTokens.length) {
    accumulatedTokens.links = {};
    slides.push(marked.parser(accumulatedTokens));
  }

  return slides;
};

export const filesAreIdentical = (
  file1,
  file2,
  propsToCompare = ['title', 'text']
) => {
  const comparer = (areSameSoFar, nextProp) => {
    if (!areSameSoFar) {
      return false;
    }

    return file1[nextProp] === file2[nextProp];
  };

  const areIdentical = propsToCompare.reduce(comparer, true);
  return areIdentical;
};

export const goFindDuplicates = (fileList) => {
  console.log('finding duplicates');
  // const duplicates = [];

  // fileList.forEach( (file, index) => {
  //   for (let i = index + 1; i <= fileList.length; i++) {
  //   }
  // });
};

export const isFileAlreadyLoaded = (props) => {
  const { currentFile } = props;
  const requestedFileId = props.router.query.id;
  const currentFileId = currentFile?.file?.id;
  return currentFileId && currentFileId === requestedFileId;
};

export const messageBroadcast = (message) => {
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

// New way
export const changeCurrentNote = (dispatch, note) => {
  dispatch({ type: 'read', file: note });
};

// New way
export const readFile = async (dispatch, fileId) => {
  console.log('reading file from db');
  dispatch({ type: 'clear-file' });
  const file = await readLocalFile(fileId);
  if (file) {
    dispatch({ type: 'read', file });
  } else {
    dispatch({ type: 'error-reading' });
  }
};

export const createNewFile = async (fileObj) => {
  try {
    const file = await addFile(fileObj);
    return file;
  } catch (err) {
    console.log(err);
  }
};
