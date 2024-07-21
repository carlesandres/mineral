'use client';
import React, { FormEvent } from 'react';
import { Trash } from 'lucide-react';
import type { CommandFlag } from '@/types/CommandFlag';
import toast from 'react-hot-toast';
import { supabaseBrowserClient } from '@/utils/supabase/create-browser-supabase-client';

interface DeleteFlagButtonProps {
  flag: CommandFlag;
}

const DeleteFlagButton = (props: DeleteFlagButtonProps) => {
  const supabase = supabaseBrowserClient();
  const { flag } = props;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const id = formData.get('id') as string;
    const { error } = await supabase
      .from('command_flags')
      .delete()
      .match({ id });

    if (error) {
      toast.error('There was an error deleting the flag.');
      return;
    }

    toast.success('Flag deleted successfully.');
    window.location.reload();
  }

  return (
    <form onSubmit={onSubmit}>
      <input hidden name="id" defaultValue={flag.id} />
      <button type="submit" className="">
        <Trash size={16} />
      </button>
    </form>
  );
};

export default DeleteFlagButton;
