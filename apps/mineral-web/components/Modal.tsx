import { forwardRef, ReactNode, Ref } from 'react';
import { Dialog } from '@headlessui/react';
import CloseButton from 'components/CloseButton';
import { motion } from 'motion/react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

const Modal = forwardRef((props: ModalProps, ref: Ref<HTMLDivElement>) => {
  const { isOpen, onClose, children, title, className } = props;

  const renderedTitle = title ? (
    <Dialog.Title className="border-b border-[var(--border-soft-color)] bg-[var(--solid-bg-color)] p-4 font-semibold">
      {title}
    </Dialog.Title>
  ) : null;

  return (
    <Dialog
      as={motion.div}
      ref={ref}
      className="relative z-50"
      open={isOpen}
      onClose={onClose}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 p-4 font-mono backdrop-blur-sm backdrop-filter">
        <Dialog.Panel
          className={`relative flex max-h-full w-full max-w-md flex-col overflow-hidden rounded border border-[var(--border-color)] bg-[var(--editor-bg-color)] text-[var(--text-color)] sm:max-h-[calc(100vh-8rem)] ${className}`}
        >
          <CloseButton onClick={props.onClose} />
          {renderedTitle}

          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
});

Modal.displayName = 'Modal';

export default Modal;
