import { useRouter } from 'next/navigation';
import useSettingsStore from 'hooks/useSettingsStore';
import { newFile } from 'utils/fileUtils';
import { fileUrl } from 'utils/paths';
import { setNote } from './useNotesStore';
import { Note } from 'types/Note';

const useCreateFile = () => {
  const router = useRouter();
  const { startWithPreview } = useSettingsStore();

  const panels = startWithPreview
    ? { viewer: true, editor: true, toc: false }
    : { viewer: false, editor: true, toc: false };

  const createFile = async (noteProps: Partial<Note> = {}) => {
    const note = newFile({ ...noteProps, panels });
    if (!note) {
      // TO-DO: Toast
      return;
    }
    setNote(note);
    router.push(fileUrl(note.id));
  };

  return createFile;
};

export default useCreateFile;
