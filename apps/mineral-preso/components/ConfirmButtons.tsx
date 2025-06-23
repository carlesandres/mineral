import { useRef, KeyboardEvent, MouseEventHandler } from 'react';
import { Button } from './ui/button';
const buttonBaseClass = `min-w-[96px]`;

interface ConfirmButtonsProps {
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
}

// TO-DO: Rethink as shadcb component
const ConfirmButtons = (props: ConfirmButtonsProps) => {
  const { disabled = false, confirmLabel = 'Yes', cancelLabel = 'No' } = props;
  const confirmRef = useRef<HTMLButtonElement | null>(null);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const handleKeydown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.stopPropagation();

      const cancelHasFocus = cancelRef?.current === document.activeElement;
      if (cancelHasFocus) {
        confirmRef.current?.focus();
      } else {
        cancelRef.current?.focus();
      }
    }
  };

  return (
    <div
      className="row mt-4 space-x-4 pt-4 text-center"
      onKeyDown={handleKeydown}
    >
      <Button
        disabled={disabled}
        ref={confirmRef}
        className={`${buttonBaseClass} !bg-green-600 hover:!bg-green-700`}
        onClick={props.onConfirm}
      >
        <span>{confirmLabel}</span>
      </Button>
      <Button
        disabled={disabled}
        ref={cancelRef}
        className={`${buttonBaseClass} !bg-red-600 hover:!bg-red-700`}
        onClick={props.onCancel}
      >
        <span>{cancelLabel}</span>
      </Button>
    </div>
  );
};

export default ConfirmButtons;
