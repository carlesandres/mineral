import Link from 'next/link';
import React from 'react';

const MiniHeader = () => {
  return (
    <header className="p-4">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/posts">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MiniHeader;
