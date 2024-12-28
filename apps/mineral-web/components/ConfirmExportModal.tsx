import { useCallback, useState, ChangeEvent } from 'react';
import ConfirmDialog from 'components/ConfirmDialog';
import type { Note } from 'types/Note';
import TextInput from 'components/TextInput';
import { toast } from 'sonner';

interface Props {
  show: boolean;
  onClose: () => void;
  note: Note;
}

const inputStyle = `border-b bg-transparent flex-1
p-2 hover:border-gray-500 cursor-pointer text-base
dark:text-gray-300 print:border-none print:text-black`;

const ConfirmExportModal = (props: Props) => {
  const { note, show, onClose } = props;
  const [fileName, setFileName] = useState(`${note.title}.txt`);

  const changeFileName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setFileName(event.target.value),
    [],
  );
  const exportCurrentFile = useCallback(() => {
    // exportOneFile(note, fileName);
    toast.error('Export still not available');
    onClose();
  }, [onClose]);

  return (
    <ConfirmDialog
      show={show}
      onCancel={onClose}
      onConfirm={exportCurrentFile}
      title="Export note as text file"
      confirmLabel="Proceed"
      cancelLabel="Cancel"
    >
      <div className="flex items-center space-x-2 pt-4">
        <label htmlFor="">File name:</label>
        <TextInput
          autoFocus
          className={inputStyle}
          placeholder="(default: mineral-backup)"
          onChange={changeFileName}
          value={fileName}
        />
      </div>
    </ConfirmDialog>
  );
};

export default ConfirmExportModal;
