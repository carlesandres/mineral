'use client';

import useUIZStore from '@/hooks/useUIZStore';
import { SidebarMenuButton } from './ui/sidebar';

const Kbd = ({ children }) => (
  <kbd className="pointer-events-none flex items-center justify-center rounded border bg-white px-1.5 font-mono text-base font-medium opacity-100 select-none hover:opacity-100 dark:bg-black">
    {children}
  </kbd>
);

const CmdKButton = () => {
  const { setCmdPaletteVisible } = useUIZStore();
  const handleCmdK = () => setCmdPaletteVisible(true);

  return (
    <SidebarMenuButton onClick={handleCmdK}>
      <span className="text-xs">Command Palette:</span>
      <Kbd>⌘ K</Kbd>
    </SidebarMenuButton>
  );
};

export default CmdKButton;
