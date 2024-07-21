import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { MoreVertical, Pencil, Trash } from 'lucide-react';
import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { deleteSheet } from 'utils/server-actions/delete-sheet';

interface SheetMenuProps {
  sheetId: string;
  setIsEditMode: (isEditMode: boolean) => void;
}

const SheetMenu = (props: SheetMenuProps) => {
  const { sheetId, setIsEditMode } = props;

  const handleEdit = useCallback(() => setIsEditMode(true), [setIsEditMode]);

  const handleDelete = useCallback(async () => {
    const res = await deleteSheet(sheetId);
    if (res.error) {
      console.log('res', res);
      toast.error('Something went wrong.');
      throw new Error('Something went wrong.');
    }
    toast.success('Sheet deleted.');
  }, [sheetId]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleEdit}>
          <Pencil size={12} />
          <span className="ml-2">Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <Trash size={12} />
          <span className="ml-2">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SheetMenu;
