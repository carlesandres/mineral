'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';

interface SomeoneChangedProps {
  sheetId: string;
}

type PayloadEntry = {
  id: string;
};

const SomeoneChanged = (props: SomeoneChangedProps) => {
  const { sheetId } = props;
  const supabase = createClientComponentClient<Database>();
  const [someOneChanged, setSomeOneChanged] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel('realtime cheats')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cheats',
          filter: `sheet_id=eq.${sheetId}`,
        },
        (payload) => {
          console.log('payload', payload);
          const newA = payload.new as PayloadEntry;
          const old = payload.old as PayloadEntry;

          if (newA && old && newA.id !== old.id) {
            setSomeOneChanged(true);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sheetId, supabase]);

  const handleReload = () => {
    window.location.reload();
  };

  if (!someOneChanged) {
    return null;
  }

  return (
    <Card className="bg-red-50 border-red-700 text-red-700">
      <CardHeader>
        <CardTitle>Someone changed this sheet</CardTitle>
        <CardDescription>
          {' '}
          This sheet has been changed by someone else. Do you want to reload the
          page?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="bg-red-700 " onClick={handleReload}>
          Reload
        </Button>
      </CardContent>
    </Card>
  );
};

export default SomeoneChanged;
