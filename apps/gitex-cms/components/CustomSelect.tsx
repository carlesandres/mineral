import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type SelectOption = [string, React.ReactNode];

export interface CustomSelectProps {
  className?: string;
  placeholder: string;
  label: string;
  options: SelectOption[];
  value: string | number;
  onChange: (value: string) => void;
}

const CustomSelect = (props: CustomSelectProps) => {
  const selectRef = React.useRef<HTMLDivElement>(null);
  const renderedOptions = props.options.map(([value, element]) => (
    <SelectItem key={value} value={value}>
      {element}
    </SelectItem>
  ));

  // // const handleSelectedTabChange = (event: FormEventHandler<HTMLDivElement>) => {
  // const handleSelectedTabChange = (event: any) => {
  //   console.log('event', event);
  //   props.onChange(event.target.value);
  // };

  return (
    <div className={cn('custom-select', props.className)} ref={selectRef}>
      <Select value={String(props.value)} onValueChange={props.onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{renderedOptions}</SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
