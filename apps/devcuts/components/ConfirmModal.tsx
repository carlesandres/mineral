import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import { DialogHeader } from './ui/dialog';

interface Props {
  children: React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
  show?: boolean;
}

const ConfirmModal = (props: Props) => {
  const { show = true } = props;

  if (!show) {
    return null;
  }

  console.log('showing dialog');

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            <div className="sm:m m-4 h-fit w-full max-w-lg rounded bg-white p-8 sm:mt-20">
              {props.children}
              <div className="mt-2 flex justify-center space-x-2">
                <Button
                  className="w-24 bg-green-200"
                  variant="secondary"
                  onClick={props.onConfirm}
                >
                  Yes
                </Button>
                <Button
                  className="w-24 bg-red-200"
                  variant="secondary"
                  onClick={props.onClose}
                >
                  No
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
