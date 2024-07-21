import React from 'react';
import NavigationLink from 'components/NavigationLink';
import { AlignJustify } from 'lucide-react';
import Link from 'next/link';
import FeedbackButton from './FeedbackButton';
import ClientInit from 'components/ClientInit';
import UserAvatar from './UserAvatar';
import { Button } from './ui/button';

const navigation = [
  { name: 'Devcuts', href: '/', icon: <AlignJustify size={16} /> },
];

const DesktopNav = async () => {
  return (
    <>
      <ClientInit />
      <header className="fixed top-0 z-10 w-full bg-white border-b border-gray-100 print:hidden">
        <nav
          className="mx-auto max-w-5xl px-2 sm:px-6 2xl:px-0"
          aria-label="Top"
        >
          <div className="flex gap-4 h-16 w-full items-center justify-between lg:border-none">
            <div className="flex items-center gap-8 flex-1">
              <div className="sm:hidden">
                <Button asChild variant="ghost">
                  <Link href="/">Dashboard</Link>
                </Button>
              </div>
              <div className="hidden space-x-8 sm:flex">
                {navigation.map((link) => (
                  <NavigationLink key={link.name} href={link.href}>
                    {link.icon || null}
                    <span>{link.name}</span>
                  </NavigationLink>
                ))}
              </div>
            </div>
            <FeedbackButton />
            <UserAvatar />
          </div>
        </nav>
      </header>
    </>
  );
};

export default DesktopNav;
