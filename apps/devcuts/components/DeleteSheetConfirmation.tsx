'use client';
import React from 'react';
import { Sheet } from 'types/Sheet';
import { deleteSheet } from 'utils/server-actions/delete-sheet';
import { useRouter } from 'next/navigation';
import ConfirmationModal from './ConfirmationModal';

interface DeleteSheetConfirmationProps {
  sheet: Sheet;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteSheetConfirmation = (props: DeleteSheetConfirmationProps) => {
  const { sheet, open, onOpenChange } = props;
  props;
  const sheetId = sheet.id;
  const router = useRouter();

  const handleDelete = () => deleteSheet(sheetId);

  return (
    <ConfirmationModal
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={handleDelete}
      onSuccess={() => router.push('/')}
      actionDescription="Deleting the sheet will also delete the cheats inside. This action cannot be undone."
      successMessage="Collection deleted"
      errorMessage="Error deleting collection"
    />
  );
};

export default DeleteSheetConfirmation;
