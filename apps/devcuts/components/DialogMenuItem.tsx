import React from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from 'components/ui/alert-dialog';
import { AlertDialogHeader, AlertDialogFooter } from './ui/alert-dialog';
import { DropdownMenuItem } from 'components/ui/dropdown-menu';

interface DialogMenuItemProps {
  triggerChildren: React.ReactNode;
  // children: React.ReactNode;
  title: string;
  description: string;
  onSelect?: () => void;
  onCancel?: () => void;
  onOpenChange?: (open: boolean) => void;
}

const DialogMenuItem = (props: DialogMenuItemProps) => {
  const {
    triggerChildren,
    onSelect,
    onCancel,
    onOpenChange,
    title,
    description,
  } = props;

  const handleOpenChange = (open: boolean) => {
    console.log('open', open);
    if (onOpenChange) {
      // onOpenChange(open);
    }
  };

  return (
    <AlertDialog onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onClick={(event) => event.stopPropagation()}>
          {triggerChildren}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSelect}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogMenuItem;
