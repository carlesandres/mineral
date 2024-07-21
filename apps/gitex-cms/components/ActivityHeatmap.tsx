'use client';

import React, { useContext, useEffect, useState } from 'react';
import HeatMap from './HeatMap';
import { H3 } from './typography';
import { SessionContext } from 'utils/sessionContext';
import StatCard from './StatCard';
import { supabaseBrowserClient } from '@/utils/supabase/create-browser-supabase-client';

type ActivityPoint = {
  date: string;
  value: number;
};

const ActivityHeatmap = () => {
  const [activity, setActivity] = useState<ActivityPoint[] | null>(null);
  const supabase = supabaseBrowserClient();
  const session = useContext(SessionContext);
  const userId = session?.user?.id;
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    async function getActivity(userId: string) {
      const { data, error } = await supabase
        .from('user_event_count')
        .select('event_date, event_count')
        .eq('user_id', userId)
        .order('event_date', { ascending: true });

      if (error) {
        console.log(error);
        return;
      }
      setEventCount(data.length);

      // TO-DO: Fix this type
      const renamedData = data.map((d) => ({
        date: d.event_date,
        value: d.event_count,
      })) as ActivityPoint[];

      setActivity(renamedData);
    }

    if (userId) {
      getActivity(userId);
    }
  }, [userId, supabase]);

  if (!activity) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <H3>Activity</H3>
      <StatCard
        className="mb-8"
        amount={`${eventCount}`}
        subtext="Days trained"
        variant="success"
      />
      <HeatMap data={activity} />
    </div>
  );
};

export default ActivityHeatmap;
