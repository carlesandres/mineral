'use client';

import Link from 'next/link';
import { SidebarMenuItem, SidebarMenuButton } from './ui/sidebar';
import { usePathname } from 'next/navigation';

interface SideBarLinkProps {
  title: string;
  url: string;
  icon: React.ReactNode;
}

const SideBarLink = (props: SideBarLinkProps) => {
  const { title, url, icon } = props;
  const pathname = usePathname();

  const selectedClass = pathname === url ? 'text-yellow-500' : '';

  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton asChild>
        <Link href={url} className={selectedClass}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SideBarLink;
