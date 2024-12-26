'use client';

import { HiOutlinePlus, HiOutlineClipboard } from 'react-icons/hi';
import Link from 'next/link';
import { Button } from 'components/ui/button';
import useNotesStore, { getNotes } from 'hooks/useNotesStore';

const style =
  'mx-auto flex items-center justify-center space-x-2 sm:!px-6 sm:!py-4 sm:text-lg';

const LandingCTA = () => {
  const { initialized } = useNotesStore((state) => state);
  const notes = getNotes();

  if (!initialized) {
    return null;
  }

  if (notes.length > 0) {
    return (
      <Button asChild variant="secondary" size="lg">
        <Link className={style} href="/notes">
          <HiOutlineClipboard className="text-xl" />
          <span>Go to your dashboard</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild>
      <Link className={style} href="/new">
        <HiOutlinePlus />
        <span>Create a note</span>
      </Link>
    </Button>
  );
};

export default LandingCTA;
