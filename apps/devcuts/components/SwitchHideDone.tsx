'use client';

import React, { useCallback } from 'react';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { useRouter, useSearchParams } from 'next/navigation';

interface SwitchDoneProps {
  sheetId: string;
}

const SwitchDone = (props: SwitchDoneProps) => {
  const { sheetId } = props;
  const hideDoneParam = useSearchParams().get('hidedone');
  const hideDone = hideDoneParam === 'true' || hideDoneParam === null;
  const router = useRouter();

  const handleToggleHideDone = useCallback(() => {
    const newHideDone = !hideDone;
    router.push(`/sheets/${sheetId}?hidedone=${newHideDone}`);
  }, [hideDone, sheetId, router]);

  return (
    <div className="hidden sm:flex items-center space-x-2">
      <Switch checked={!hideDone} onCheckedChange={handleToggleHideDone} />
      <Label>Show done</Label>
    </div>
  );
};

export default SwitchDone;
