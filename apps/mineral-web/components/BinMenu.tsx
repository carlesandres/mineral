import { useRoutingHelpers } from 'hooks/use-routing-helpers';
import { MoreVertical, Maximize2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function BinMenu() {
  // const notes = getNotes();
  // const binnedNotes = useMemo(() => {
  //   return getShownFiles(notes, 'BIN', '');
  // }, [notes]);
  const { goToNewFile, goToList } = useRoutingHelpers();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => goToList('')}>
          <Maximize2 className="mr-2 h-4 w-4" />
          <span>List</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={goToNewFile}>
          <Maximize2 className="mr-2 h-4 w-4" />
          <span>New</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
