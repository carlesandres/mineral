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
  return (
    <Modal
      onOpenChange={props.onCancel}
      title={props.title}
      isOpen={props.show}
    >
      <div className="p-4">{props.children}</div>
      <ConfirmButtons {...props} />
    </Modal>
  );
};

export default ConfirmDialog;
