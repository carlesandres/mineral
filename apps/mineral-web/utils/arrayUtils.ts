export const replaceFileInArray = (files, file) => {
  const deletedIndex = files.findIndex((f) => f.id === file.id);

  if (deletedIndex < 0) {
    return null;
  }

  const newFiles = files
    .slice(0, deletedIndex)
    .concat(file, files.slice(deletedIndex + 1, files.length));
  return newFiles;
};

export const moveFileToTopOfArray = (files, file) => {
  const filesWithout = removeFileFromArray(files, file.id);
  const filesUpdated = pushFileToTopOfArray(filesWithout, file);
  return filesUpdated;
};

export const removeFileFromArray = (files, fileId) => {
  const deletedIndex = files.findIndex((f) => f.id === fileId);

  // This might be a bit overkill in terms of memory usage
  // TODO: We also must check the performance of this operation
  if (deletedIndex === -1) {
    return Array.from(files);
  }

  const newFiles = files
    .slice(0, deletedIndex)
    .concat(files.slice(deletedIndex + 1, files.length));
  return newFiles;
};

export const pushFileToTopOfArray = (files, file) => {
  const newFiles = [file].concat(files);
  return newFiles;
};

export const removeFilesInArray = (files, filesDeleted) => {
  const deletedFilesIds = filesDeleted.map((f) => f.id);

  const purgedFiles = files.filter((f) => !deletedFilesIds.includes(f.id));

  return purgedFiles;
};
