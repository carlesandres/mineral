import BaseCommandRow from '@/components/BaseCommandRow';
import { pageProtect } from '@/utils/page-protect';
import React from 'react';

const BaseCommandPage = async () => {
  const supabase = await pageProtect();
  const { data: commands, error } = await supabase
    .from('base_commands')
    .select()
    .order('command', { ascending: true });

  if (error) {
    throw error;
  }

  return (
    <div className="pt-32 mx-auto max-w-lg">
      <h1 className="text-3xl font-bold mb-8">Base Commands</h1>
      <ul className="flex flex-col gap-2">
        {commands.map((command) => (
          <BaseCommandRow {...command} key={command.id} />
        ))}
      </ul>
    </div>
  );
};

export default BaseCommandPage;
