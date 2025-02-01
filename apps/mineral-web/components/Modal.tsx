import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export interface ModalProps {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  title: string;
  className?: string;
}

const Modal = (props: ModalProps) => {
  const { isOpen, children, title } = props;

  return (
    <Dialog open={isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
