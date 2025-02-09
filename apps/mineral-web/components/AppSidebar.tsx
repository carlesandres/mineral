import {
  Cog,
  Gem,
  Info,
  Layers,
  LayoutDashboard,
  PlusCircle,
  Trash,
} from 'lucide-react';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from 'components/ui/sidebar';
import SidebarLink from './SidebarLink';
import CmdKButton from './CmdKButton';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/notes',
    icon: LayoutDashboard,
  },
  {
    title: 'Bin',
    url: '/bin',
    icon: Trash,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Cog,
  },
  {
    title: 'Features',
    url: '/intro',
    icon: Layers,
  },
  {
    title: 'About',
    url: '/about',
    icon: Info,
  },
];

const actions = [
  {
    title: 'New note',
    url: '/new',
    icon: PlusCircle,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/intro">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-gray-500">
                  <Gem className="size-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-semibold text-yellow-500">
                    mineral
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarLink
                  key={item.title}
                  title={item.title}
                  url={item.url}
                  icon={<item.icon />}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {actions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <CmdKButton />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
