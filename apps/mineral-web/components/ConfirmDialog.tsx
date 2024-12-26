import React, { Ref, forwardRef } from 'react';
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

const ConfirmDialog = forwardRef(
  (props: ConfirmDialogProps, ref: Ref<HTMLDivElement>) => {
    return (
      <Modal
        ref={ref}
        onClose={props.onCancel}
        title={props.title}
        isOpen={props.show}
      >
        <div className="p-4">{props.children}</div>
        <ConfirmButtons {...props} />
      </Modal>
    );
  },
);

ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
