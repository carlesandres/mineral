import { ChangeEvent, useCallback, useState } from 'react';
import { exportAll } from 'utils/fileUtils';
import { Note } from 'types/Note';
import ConfirmDialog from 'components/ConfirmDialog';
import TextInput from 'components/TextInput';
import Checkbox from 'components/Checkbox';
import useUIZStore from 'hooks/useUIZStore';
import SuccessToast from 'components/SuccessToast';
import useNotesStore from 'hooks/useNotesStore';

const inputStyle = `border-b bg-transparent flex-1
p-2 hover:border-gray-500 form-control cursor-pointer text-base
dark:text-gray-300 print:border-none print:text-black`;

const BackupModal = () => {
  const { notes } = useNotesStore((state) => state);
  const [fileName, setFileName] = useState('');
  const [addDateToFilename, setAddDateToFilename] = useState(true);
  const { toast, backupModalVisible, hideBackupModal } = useUIZStore();

  const changeFileName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setFileName(event.target.value),
    [],
  );
  const toggleAddDate = useCallback(
    () => setAddDateToFilename((state) => !state),
    [],
  );

  const backup = useCallback(() => {
    if (!notes?.length) {
      return;
    }

    // TO-DO: Show some visual indication that we are collecting
    // the notes to backup
    const notesToBackup = notes.filter((n: Note) => !n.deletedAt);
    exportAll(notesToBackup, fileName, addDateToFilename);
    hideBackupModal();
    toast(<SuccessToast>Backup downloaded</SuccessToast>);
  }, [notes, fileName, addDateToFilename, hideBackupModal, toast]);

  return (
    <ConfirmDialog
      show={backupModalVisible}
      onCancel={hideBackupModal}
      onConfirm={backup}
      title="Backup to a JSON file"
      confirmLabel="Proceed"
      cancelLabel="Cancel"
    >
      <div className="">
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
        <Checkbox
          label="Add date to file name"
          checked={addDateToFilename}
          onChange={toggleAddDate}
        />
      </div>
    </ConfirmDialog>
  );
};

export default BackupModal;
