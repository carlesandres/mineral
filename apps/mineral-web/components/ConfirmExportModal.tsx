import { useCallback, useState, ChangeEvent, useEffect } from 'react';
import ConfirmDialog from 'components/ConfirmDialog';
import type { Note } from 'types/Note';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { downloadFile } from '@/utils/fileUtils';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

interface Props {
  show: boolean;
  onClose: () => void;
  note: Note;
}

// const inputStyle = `border-b bg-transparent flex-1
// p-2 hover:border-gray-500 cursor-pointer text-base
// dark:text-gray-300 print:border-none print:text-black`;
//
const ConfirmExportModal = (props: Props) => {
  const { note, show, onClose } = props;
  const proposedFilename = `${note.title || 'mineral-note'}`;
  const [fileName, setFileName] = useState('');
  const [saveAsMd, setSaveAsMd] = useState(false);

  useEffect(() => {
    setFileName(proposedFilename);
  }, [proposedFilename]);

  const changeFileName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setFileName(event.target.value),
    [],
  );

  const handleSaveAsMd = (checked: boolean) => {
    setSaveAsMd(checked);
  };

  const exportCurrentFile = useCallback(() => {
    const extension = saveAsMd ? 'md' : 'txt';
    const fullFileName = `${fileName}.${extension}`;
    downloadFile(fullFileName, note.text);
    toast.error('Export still not available');
    onClose();
  }, [onClose, note, fileName, saveAsMd]);

  return (
    <ConfirmDialog
      show={show}
      onCancel={onClose}
      onConfirm={exportCurrentFile}
      title="Export note as text file"
      confirmLabel="Proceed"
      cancelLabel="Cancel"
    >
      <div className="space-y-8 pt-4">
        <div className="grid gap-2">
          <Label htmlFor="file-name">File name:</Label>
          <Input
            id="file-name"
            autoFocus
            placeholder="(default: mineral-backup)"
            onChange={changeFileName}
            value={fileName}
          />
        </div>
        <div className="flex gap-2">
          <Checkbox
            id="save-as-md"
            checked={saveAsMd}
            onCheckedChange={handleSaveAsMd}
          />
          <Label htmlFor="save-as-md">Save as .md</Label>
        </div>
      </div>
    </ConfirmDialog>
  );
};

export default ConfirmExportModal;
