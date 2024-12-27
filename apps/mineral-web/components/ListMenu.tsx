import { Button } from './ui/button';
import {
  HiOutlineUpload,
  HiOutlineDownload,
  HiOutlineTrash,
  HiOutlinePlus,
} from 'react-icons/hi';
import useUIZStore from 'hooks/useUIZStore';
import { useRoutingHelpers } from 'hooks/use-routing-helpers';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';

const ListMenu = () => {
  const { showBackupModal, showFileImport } = useUIZStore();
  const { goToNewFile, goToBin } = useRoutingHelpers();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={goToNewFile}>
          <HiOutlinePlus className="mr-2 h-4 w-4" />
          <span>New note</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={showBackupModal}>
          <HiOutlineDownload className="mr-2 h-4 w-4" />
          <span>Backup</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={showFileImport}>
          <HiOutlineUpload className="mr-2 h-4 w-4" />
          <span>Import note</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={goToBin}>
          <HiOutlineTrash className="mr-2 h-4 w-4" />
          <span>BIN</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListMenu;
