import { Button } from './ui/button';
import { MoreVertical, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { useState } from 'react';
import BinNoteModal from './BinNoteModal';

const BinMenu = () => {
  const [showEmptyBinModal, setShowEmptyBinModal] = useState(false);

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
          <DropdownMenuItem onClick={() => setShowEmptyBinModal(true)}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Empty bin</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BinNoteModal show={showEmptyBinModal} setShow={setShowEmptyBinModal} />
    </>
  );
};

export default BinMenu;
