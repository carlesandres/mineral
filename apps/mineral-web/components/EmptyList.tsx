import React from 'react';
import Link from 'next/link';
import { HiOutlinePlus } from 'react-icons/hi';

const btnClass = `inline-flex rounded space-x-2 font-semibold bg-gray-100 hover:bg-gray-200
    dark:bg-gray-700 cursor-pointer px-4 py-2 drop-shadow clickable`;

const EmptyList = () => (
  <div className="empty-list mt-16 w-full text-center text-base">
    <p className="mb-4">Oh! Your notes list is empty.</p>
    <p className="my-2 flex justify-center">
      <Link href="/new" className={btnClass}>
        <HiOutlinePlus />
        <span>Create a new note</span>
      </Link>
    </p>

    <p className="mt-24 mb-2 text-lg">
      New to <strong className="font-mono">mineral</strong>?
    </p>
    <Link
      href="/features"
      className={`text-blue-500 underline
      hover:text-blue-600 dark:hover:text-blue-400`}
    >
      Check out the list of features
    </Link>
  </div>
);

export default EmptyList;
