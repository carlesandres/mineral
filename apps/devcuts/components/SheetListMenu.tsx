'use client';

import { Sheet } from 'types/Sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import DeleteSheetConfirmation from './DeleteSheetConfirmation';
import { useCallback, useState } from 'react';
import { Copy, Eye, EyeOff, MoreVertical, Pen, Trash } from 'lucide-react';
import CloneSheetConfirmation from './CloneSheetConfirmation';
import { useRouter, useSearchParams } from 'next/navigation';
import { SquareArrowOutUpRight } from 'lucide-react';

interface SheetListMenuProps {
  sheet: Sheet;
  onEdit?: () => void;
}

export function SheetListMenu(props: SheetListMenuProps) {
  const { onEdit } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCloneModal, setShowCloneModal] = useState(false);
  const { sheet } = props;
  const hideDoneParam = useSearchParams().get('hidedone');
  const hideDone = hideDoneParam === 'true' || hideDoneParam === null;
  const router = useRouter();
  const sheetId = sheet.id;

  const handleToggleHideDone = useCallback(() => {
    const newHideDone = !hideDone;
    router.push(`/sheets/${sheetId}?hidedone=${newHideDone}`);
  }, [hideDone, sheetId, router]);

  const onMenuOpenChange = useCallback((isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  }, []);

  const onDeleteModalOpenChange = useCallback((isOpen: boolean) => {
    setShowDeleteModal(isOpen);
    setIsMenuOpen(false);
  }, []);

  const onCloneModalOpenChange = useCallback((isOpen: boolean) => {
    setShowCloneModal(isOpen);
    setIsMenuOpen(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    setTimeout(() => {
      setShowDeleteModal(true);
    }, 0);
  }, []);

  const handleConfirmClone = useCallback(() => {
    setTimeout(() => {
      setShowCloneModal(true);
    }, 0);
  }, []);

  const showIcon = hideDone ? <Eye size={12} /> : <EyeOff size={12} />;
  const showVerb = hideDone ? 'Show' : 'Hide';

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={onMenuOpenChange}>
        <DropdownMenuTrigger className="print:hidden">
          <MoreVertical size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent hidden={showDeleteModal || showCloneModal}>
          <DropdownMenuItem
            onClick={onEdit}
            className="flex gap-2 items-center"
          >
            <Pen size={12} />
            <span>Edit sheet</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleConfirmDelete}
            className="flex gap-2 items-center"
          >
            <Trash size={12} />
            <span>Delete sheet</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleConfirmClone}
            className="flex gap-2 items-center"
          >
            <Copy size={12} />
            <span>Clone sheet</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!sheet.slug}
            onClick={() => router.push(`/sheet/${sheet.slug}`)}
            className="flex gap-2 items-center"
          >
            <SquareArrowOutUpRight size={12} />
            <span>Public page</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleToggleHideDone}
            className="flex gap-2 items-center"
          >
            {showIcon}
            <span>{showVerb} done</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteSheetConfirmation
        sheet={sheet}
        open={showDeleteModal}
        onOpenChange={onDeleteModalOpenChange}
      />
      <CloneSheetConfirmation
        sheet={sheet}
        open={showCloneModal}
        onOpenChange={onCloneModalOpenChange}
      />
    </>
  );
}
