'use client';

import React, { useEffect, useState } from 'react';
import type { BaseCommand } from 'types/BaseCommand';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabaseBrowserClient } from '@/utils/supabase/create-browser-supabase-client';

interface BaseCommandSelectorProps {
  value: string | null;
  onChange: (value: string) => void;
}

const BaseCommandSelector = (props: BaseCommandSelectorProps) => {
  const { value, onChange } = props;
  const [baseCommands, setBaseCommands] = useState<Array<BaseCommand>>([]);
  const supabase = supabaseBrowserClient();

  useEffect(() => {
    const fetchBaseCommands = async () => {
      const { data, error } = await supabase
        .from('base_commands')
        .select(`*`)
        .order('command');

      if (error) {
        return;
      }
      setBaseCommands(data as BaseCommand[]);
    };
    fetchBaseCommands();
  }, [supabase]);

  const items = baseCommands.map((baseCommand) => (
    <SelectItem
      key={baseCommand.id}
      className="flex items-center"
      value={baseCommand.id}
    >
      {baseCommand.command}
    </SelectItem>
  ));

  return (
    <Select value={value ?? undefined} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Stage" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] overflow-auto">
        <SelectGroup>{items}</SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BaseCommandSelector;
