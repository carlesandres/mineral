import React from 'react';
import Modal from 'components/Modal';
import ConfirmButtons from 'components/ConfirmButtons';

interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  show: boolean;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    title,
    onCancel,
    onConfirm,
    show,
    children,
    confirmLabel = 'Yes',
    cancelLabel = 'No',
  } = props;
  return (
    <Modal onOpenChange={onCancel} title={title} isOpen={show}>
      {children}
      <ConfirmButtons
        onCancel={onCancel}
        onConfirm={onConfirm}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
      />
    </Modal>
  );
};

export default ConfirmDialog;
