import React from 'react';
import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';
import FlagRow from './FlagRow';

interface FlagListProps {
  base_command_id: string;
}

const FlagList = async (props: FlagListProps) => {
  const { base_command_id } = props;
  const supabase = createServerSupabaseClient();

  const { data: flags, error } = await supabase
    .from('command_flags')
    .select(`*`)
    .eq('base_command_id', base_command_id);

  if (error) {
    console.log(error);
    throw error;
  }

  console.log(flags);

  return (
    <div>
      <h2>Flags</h2>
      <ul className="flex flex-col gap-2">
        {flags.map((flag) => (
          <FlagRow key={flag.id} flag={flag} />
        ))}
      </ul>
    </div>
  );
};

export default FlagList;
