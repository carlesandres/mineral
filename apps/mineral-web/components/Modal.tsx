import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export interface ModalProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

const Modal = (props: ModalProps) => {
  const { isOpen, children, title } = props;

  const renderedTitle = title ? (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
    </DialogHeader>
  ) : null;

  // TO-DO: It should not be necessary to set bg-white here.
  return (
    <Dialog open={isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="bg-white">
        {renderedTitle}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
