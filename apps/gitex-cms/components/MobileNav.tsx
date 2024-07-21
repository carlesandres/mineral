import React from 'react';
import NavigationLink from 'components/NavigationLink';
import { BarChart3, Search, GitPullRequest } from 'lucide-react';

export interface HeaderProps {}

const navigation = [
  { name: 'Learn', href: '/', icon: <GitPullRequest className="h-4 w-4" /> },
  {
    name: 'Stats',
    href: '/stats',
    icon: <BarChart3 className="h-4 w-4" />,
  },
  { name: 'Search', href: '/search', icon: <Search className="h-4 w-4" /> },
];

const MobileNav = () => {
  return (
    <footer className="fixed bottom-0 z-10 h-16 w-full bg-white border-t border-gray-100 sm:hidden print:hidden">
      <nav className="mx-auto max-w-4xl px-6 sm:px-0" aria-label="Top">
        <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <NavigationLink key={link.name} href={link.href}>
              {link.icon || null}
              <span>{link.name}</span>
            </NavigationLink>
          ))}
        </div>
      </nav>
    </footer>
  );
};

export default MobileNav;
