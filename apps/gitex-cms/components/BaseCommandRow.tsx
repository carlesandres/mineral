import React from 'react';
import Link from 'next/link';
import type { BaseCommand } from 'types/BaseCommand';

export interface BaseCommandRowProps extends BaseCommand {}

const BaseCommandRow = (props: BaseCommandRowProps) => {
  const { command, id } = props;

  return (
    <Link
      href={`/base_command/${id}`}
      className={`flex w-full items-center rounded bg-gray-100
        transition hover:bg-gray-200`}
    >
      <div className="flex-1 p-2 text-left font-bold">{command}</div>
    </Link>
  );
};

export default BaseCommandRow;
