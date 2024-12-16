"use client";

import { useList } from "hooks/useList";
import { HiOutlinePlus, HiOutlineClipboard } from "react-icons/hi";
import Link from "next/link";
import { Button } from "components/ui/button";

const style =
  "mx-auto flex items-center justify-center space-x-2 sm:!px-6 sm:!py-4 sm:text-lg";

const LandingCTA = () => {
  const { list } = useList();

  if (!list.initialized) {
    return null;
  }

  if (list.notes.length > 0) {
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
