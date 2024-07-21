import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { useCallback } from 'react';
import { ArrowUp, MoreVertical, Pencil, Trash } from 'lucide-react';
import React from 'react';
import { Cheat } from 'types/Cheat';
import DoneCheatButton from './DoneCheatButton';
import { deleteCheat } from 'utils/server-actions/delete-cheat';
import toast from 'react-hot-toast';
import { moveCheatToTop } from 'utils/server-actions/moveCheatToTop';

interface CheatMenuProps {
  cheat: Cheat;
  handleEdit: () => void;
}

const CheatMenu = (props: CheatMenuProps) => {
  const { cheat, handleEdit } = props;

  const handleDelete = useCallback(async () => {
    const res = await deleteCheat(cheat);
    if (res.status !== 204) {
      toast.error('Something went wrong.');
      return;
    }
    toast.success('Cheat deleted.');
  }, [cheat]);

  const moveToTop = useCallback(async () => {
    const res = await moveCheatToTop(cheat, cheat.id);

    if (res.status !== 204) {
      toast.error('Something went wrong.');
      return;
    }
    toast.success('Cheat updated.');
  }, [cheat]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="print:hidden">
        <MoreVertical size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuItem
          className="flex gap-2 items=center"
          onClick={handleEdit}
        >
          <Pencil size={12} />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DoneCheatButton cheat={cheat} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 items=center"
          onClick={handleDelete}
        >
          <Trash size={12} />
          <span>Delete</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 items=center"
          onClick={moveToTop}
        >
          <ArrowUp size={12} />
          <span>Move to top</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CheatMenu;
