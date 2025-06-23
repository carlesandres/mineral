import React from 'react';
import Link from 'next/link';
import CreateNoteButton from './CreateNoteButton';

const EmptyList = () => (
  <div className="empty-list mt-16 w-full text-center text-base sm:mt-32">
    <p className="mb-4">Your notes list is empty.</p>
    <p className="my-2 flex justify-center">
      <CreateNoteButton />
    </p>

    <p className="mb-2 mt-24 text-lg">New to mineral?</p>
    <Link
      href="/intro#features"
      className={`text-blue-500 underline hover:text-blue-600 dark:hover:text-blue-400`}
    >
      Check out the features
    </Link>
  </div>
);

export default EmptyList;
