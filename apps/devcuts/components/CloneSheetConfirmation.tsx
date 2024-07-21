'use client';
import React, { useCallback } from 'react';
import { Sheet } from 'types/Sheet';
import { useRouter } from 'next/navigation';
import ConfirmationModal from './ConfirmationModal';
import { cloneSheet } from 'utils/server-actions/clone-sheet';

interface CloneSheetConfirmationProps {
  sheet: Sheet;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const CloneSheetConfirmation = (props: CloneSheetConfirmationProps) => {
  const { sheet, open, onOpenChange } = props;
  props;
  const sheetId = sheet.id;
  const router = useRouter();

  const handleClone = useCallback(async () => {
    const res = await cloneSheet(sheetId);
    const { data: newSheetId, error } = res;
    if (error) {
      console.error('Error cloning sheet', error);
    } else {
      router.push(`/sheets/${newSheetId}`);
    }
    return res;
  }, [sheetId, router]);

  return (
    <ConfirmationModal
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={handleClone}
      actionDescription="You are about to clone the whole collection. Including all done and undone tasks."
      successMessage="Collection cloned successfully."
      errorMessage="Error cloning collection."
    />
  );
};

export default CloneSheetConfirmation;
