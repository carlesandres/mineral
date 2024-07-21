import React from 'react';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';
import FlagForm from '@/components/FlagForm';
import FlagList from '@/components/FlagList';

interface BaseCommandDetailsPageProps {
  params: {
    id: string;
  };
}

const BaseCommandDetailsPage = async (props: BaseCommandDetailsPageProps) => {
  const { params } = props;
  const { id } = params;
  const supabase = createServerSupabaseClient();

  const { data: baseCommand, error } = await supabase
    .from('base_commands')
    .select(`*`)
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return (
    <div className="baseCommands content mx-auto max-w-4xl p-4">
      <Link href="/" className="block py-6 text-blue-500 hover:text-blue-600">
        List
      </Link>
      <h1 className="my-8 text-3xl font-bold">
        Base command:{' '}
        <span className="text-blue-600">{baseCommand.command}</span>{' '}
      </h1>
      <FlagForm base_command={baseCommand} />
      <FlagList base_command_id={id} />
    </div>
  );
};

export default BaseCommandDetailsPage;
