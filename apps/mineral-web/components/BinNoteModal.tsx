import { emptyBin } from 'hooks/useNotesStore';
import { toast } from 'sonner';
import ConfirmDialog from './ConfirmDialog';

interface BinNoteModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const BinNoteModal = (props: BinNoteModalProps) => {
  const { show, setShow } = props;

  const handleEmptyBin = () => {
    emptyBin();
    toast.success('Bin emptied');
    setShow(false);
  };

  return (
    <ConfirmDialog
      show={show}
      title="Are you sure?"
      onConfirm={handleEmptyBin}
      onCancel={() => setShow(false)}
    >{`This will permanently delete all notes in the bin.`}</ConfirmDialog>
  );
};

export default BinNoteModal;
