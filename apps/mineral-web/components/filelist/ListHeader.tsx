import React, { RefObject } from 'react';
import { Input } from 'components/ui/input';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface ListHeaderProps {
  onChange: (event: any) => any;
  searchTerm: string;
  onClear: () => any;
  placeHolder?: string;
}

const ListHeader = React.forwardRef(
  (props: ListHeaderProps, ref: RefObject<HTMLInputElement>) => {
    const {
      onChange,
      searchTerm = '',
      onClear,
      placeHolder = 'Search Notes',
    } = props;

    const clearButtonClass = searchTerm ? '' : 'hidden';

    return (
      <div className="filelist-header flex w-full gap-8">
        <div className="relative flex-1">
          <Input
            ref={ref}
            type="text"
            autoComplete="off"
            autoFocus
            className={`search-box w-full`}
            placeholder={placeHolder}
            value={searchTerm}
            onChange={onChange}
          />
          <Button
            onClick={onClear}
            size="icon"
            variant="ghost"
            className={`absolute top-0 right-0 flex cursor-pointer ${clearButtonClass}`}
          >
            <X />
          </Button>
        </div>
      </div>
    );
  },
);

ListHeader.displayName = 'ListHeader';

export default ListHeader;
