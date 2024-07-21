'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import {
  difficultyColors,
  levels,
  stageIcons,
  stages,
} from '@/utils/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';

const StagesFilter = () => {
  const searchParams = useSearchParams()!;
  const stage = searchParams.get('stage') ?? stages[0];
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const handleFilterChange = useCallback(
    (tab: string) => {
      const params = new URLSearchParams(searchParams);

      params.set('stage', tab);
      const href = `${pathname}?${params.toString()}`;
      router.replace(href);
    },
    [router, searchParams, pathname],
  );

  const renderedLevels = levels.map((level) => {
    const color = difficultyColors[levels.indexOf(level)];
    return (
      <SelectItem key={level} value={level} className="touch-none">
        <div className="flex items-center">
          <div className={cn('w-3 h-3 rounded-full mx-2', color)} />
          <span className="capitalize">{level}</span>
        </div>
      </SelectItem>
    );
  });

  const renderedStages = stages.map((stage) => {
    const levels = stage === 'learning' ? renderedLevels : null;
    const Icon = stageIcons[stage];
    return [
      <SelectItem key={stage} value={stage} className="select-none">
        <div className="flex gap-2 items-center">
          <Icon size={14} />
          <span className="capitalize">{stage}</span>
        </div>
      </SelectItem>,
      levels,
    ];
  });

  return (
    // This is a workarounf for the fact that selecting an element in a touch device
    // triggers an 'onTouchStart' event, which is passive and cannot be prevented.
    // It's a known issue for which there is no solution within radix-ui
    <div className={cn('transition-all', open && 'pb-60 md:pb-0')}>
      <Select
        value={stage}
        onValueChange={handleFilterChange}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Stage" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{renderedStages}</SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StagesFilter;
