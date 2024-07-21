'use client';
import { Sheet } from 'types/Sheet';
import React, { useCallback } from 'react';
import ControlledConfirmDialog, {
  ControlledConfirmDialogProps,
} from './ControlledConfirmDialog';
import router from 'next/router';
import toast from 'react-hot-toast';
import { deleteSheet } from 'utils/server-actions/delete-sheet';

interface DeleteSheetModalProps extends ControlledConfirmDialogProps {
  sheet: Sheet;
}

const DeleteSheetModal = (props: DeleteSheetModalProps) => {
  const { sheet, onConfirm, ...rest } = props;
  const sheetId = sheet.id;

  const handleDelete = useCallback(async () => {
    const { error } = await deleteSheet(sheetId);
    if (!error) {
      toast.success('Collection deleted');
      router.push(`/`);
      if (onConfirm) {
        onConfirm();
      }
      return;
    }
    toast.error('Error deleting collection');
  }, [sheetId, onConfirm]);

  return <ControlledConfirmDialog onConfirm={handleDelete} {...rest} />;
};

export default DeleteSheetModal;
