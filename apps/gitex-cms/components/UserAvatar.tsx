'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogIn, User } from 'lucide-react';
import { Button } from './ui/button';
import { User  as IUser } from '@supabase/supabase-js';

interface UserAvatarProps {
  user?: IUser | null;
}

const UserAvatar = (props: UserAvatarProps) => {
  const { user } = props;

  if (!user) {
    return (
      <Button variant="secondary" asChild>
        <Link href="/login" className="flex gap-2 items-center justify-center">
          <LogIn size={14} />
          <span>Login</span>
        </Link>
      </Button>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;

  if (!avatarUrl) {
    return (
      <Link
        href="/account"
        className="flex p-2 items-center justify-center hover:opacity-80 bg-gray-300 rounded-full"
      >
        <User size={20} />
      </Link>
    );
  }

  return (
    <Link href="/account" className="hover:opacity-80">
      <Image
        src={avatarUrl}
        alt="User avatar"
        width={40}
        height={40}
        className="rounded-full"
        priority
      />
    </Link>
  );
};

export default UserAvatar;
