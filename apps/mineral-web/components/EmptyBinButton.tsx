import { useState, useCallback } from 'react';
import ConfirmDialog from 'components/ConfirmDialog';
import { useList } from 'hooks/useList';
import useSettingsStore from 'utils/useSettingsStore';
import { HiOutlineTrash } from 'react-icons/hi';
import useUIZStore from 'utils/useUIZStore';
import SuccessToast from 'components/SuccessToast';
import type { Note } from 'types/Note';
import MenuButton2 from './MenuButton2';

interface Props {
  binnedNotes: Note[];
}

const EmptyBinButton = ({ binnedNotes }: Props) => {
  const [showEmptyConfirmModal, setShowEmptyConfirmModal] = useState(false);
  const { dispatchList } = useList();
  const { toast } = useUIZStore();
  const { emptyBinConfirm } = useSettingsStore();

  const hideConfirmModal = () => setShowEmptyConfirmModal(false);

  const emptyBin = useCallback(async () => {
    dispatchList({ type: 'empty-bin' });
    setShowEmptyConfirmModal(false);
    // TO-DO: This notification should be a triggered by the action
    // based on whether it succeeded or not
    toast(<SuccessToast>Bin Emptied!</SuccessToast>);
  }, [dispatchList, toast]);

  const tryEmptying = useCallback(() => {
    if (emptyBinConfirm) {
      setShowEmptyConfirmModal(true);
      return;
    }
    emptyBin();
  }, [emptyBinConfirm, emptyBin]);

  const emptyBinButton = binnedNotes.length ? (
    <MenuButton2
      text="Empty Bin"
      onClick={tryEmptying}
      icon={<HiOutlineTrash />}
    ></MenuButton2>
  ) : null;

  return (
    <>
      <ConfirmDialog
        show={showEmptyConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={emptyBin}
        title="Are you sure you want to empty the bin?"
      >
        {`${binnedNotes.length} notes will be deleted`}
      </ConfirmDialog>
      {emptyBinButton}
    </>
  );
};

export default EmptyBinButton;
