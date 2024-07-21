import Link from 'next/link';
import ProfileImage from '@/components/ProfileImage';

const Header = () => (
  <header className="flex w-full bg-gray-50 p-4 sm:p-6">
    <div className="flex items-center gap-4">
      <Link href="/" className="flex items-center space-x-4 hover:opacity-80">
        <ProfileImage size={32} />
        <span>Home</span>
      </Link>
      <Link href="/non-blog" className="font-bold">
        <span>Non-blog</span>
      </Link>
    </div>
  </header>
);

export default Header;
