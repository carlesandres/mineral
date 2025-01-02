import { useState } from 'react';
import ConfirmDialog from 'components/ConfirmDialog';
import type { Note } from 'types/Note';
import { Button } from './ui/button';

interface Props {
  binnedNotes: Note[];
}

const EmptyBinButton = ({ binnedNotes }: Props) => {
  const [showEmptyConfirmModal, setShowEmptyConfirmModal] = useState(false);

  const hideConfirmModal = () => setShowEmptyConfirmModal(false);

  // TO-DO: This should be implemnted in useNotesStore
  // const emptyBin = useCallback(async () => {
  //   dispatchList({ type: 'empty-bin' });
  //   setShowEmptyConfirmModal(false);
  //   // TO-DO: This notification should be a triggered by the action
  //   // based on whether it succeeded or not
  //   toast(<SuccessToast>Bin Emptied!</SuccessToast>);
  // }, [dispatchList, toast]);
  //
  // const tryEmptying = useCallback(() => {
  //   if (emptyBinConfirm) {
  //     setShowEmptyConfirmModal(true);
  //     return;
  //   }
  //   emptyBin();
  // }, [emptyBinConfirm, emptyBin]);

  const emptyBinButton = binnedNotes.length ? (
    <Button
      onClick={() => {}}
    >Empty bin</Button>
  ) : null;

  return (
    <>
      <ConfirmDialog
        show={showEmptyConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={() => {}}
        title="Are you sure you want to empty the bin?"
      >
        {`${binnedNotes.length} notes will be deleted`}
      </ConfirmDialog>
      {emptyBinButton}
    </>
  );
};

export default EmptyBinButton;
