import { Cog, Gem, Layers, LayoutDashboard, Trash } from 'lucide-react';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from 'components/ui/sidebar';

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
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/intro">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Gem className="size-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-semibold">Mineral</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
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
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
