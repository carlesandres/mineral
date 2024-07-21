import { useRouter } from 'next/router';
import useSettingsStore from 'utils/useSettingsStore';
import { useList } from 'hooks/useList';
import { createNewFile } from 'utils/fileUtils';
import { fileUrl } from 'utils/paths.js';

const useCreateFile = () => {
  const router = useRouter();
  const { startWithPreview } = useSettingsStore();
  const { dispatchList } = useList();

  const panels = startWithPreview
    ? { viewer: true, editor: true }
    : { viewer: false, editor: true };

  const createFile = async (noteProps) => {
    const note = await createNewFile({ ...noteProps, panels });
    dispatchList({
      type: 'append',
      note: note,
    });
    router.push(fileUrl(note.id));
  };

  return createFile;
};

export default useCreateFile;
