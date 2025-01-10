import { Button } from './ui/button';
import { Cog, LayoutDashboard, MoreVertical, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { useRoutingHelpers } from 'hooks/use-routing-helpers';

const MainMenu = () => {
  const { goToList, goToSettings, goToBin } = useRoutingHelpers();

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
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>List</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={goToBin}>
          <Trash className="mr-2 h-4 w-4" />
          <span>Bin</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={goToSettings}>
          <Cog className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MainMenu;
