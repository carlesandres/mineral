'use client';
import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { ServerActionResponse } from 'types/ServerActionResponse';

interface ConfirmationModalProps {
  onConfirm: () => Promise<ServerActionResponse>;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
  onError?: () => void;
  successMessage?: string;
  errorMessage?: string;
  actionDescription?: string;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {
    open,
    onOpenChange,
    onSuccess,
    onConfirm,
    actionDescription = '',
    successMessage = 'Success',
    errorMessage = 'Error',
  } = props;
  props;

  const handleContinue = useCallback(async () => {
    const { error } = await onConfirm();
    if (!error) {
      toast.success(successMessage);
      onSuccess?.();
      return;
    }
    toast.error(errorMessage);
  }, [onConfirm, onSuccess, errorMessage, successMessage]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{'Are you sure?'}</AlertDialogTitle>
          <AlertDialogDescription>{actionDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
