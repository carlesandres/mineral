import { Button } from './ui/button';
import { MoreVertical, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { emptyBin } from '@/hooks/useNotesStore';
import { useState } from 'react';
import { toast } from 'sonner';
import ConfirmDialog from './ConfirmDialog';

const BinMenu = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const handleEmptyBin = () => {
    emptyBin();
    toast.success('Bin emptied');
    setShowConfirm(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open bin menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowConfirm(true)}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Empty bin</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        show={showConfirm}
        title="Are you sure?"
        onConfirm={handleEmptyBin}
        onCancel={() => setShowConfirm(false)}
      >{`This will permanently delete all notes in the bin.`}</ConfirmDialog>
    </>
  );
};

export default BinMenu;
