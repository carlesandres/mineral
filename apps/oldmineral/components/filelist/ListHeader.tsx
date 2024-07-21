import React, { RefObject } from 'react';
import Icon from 'components/Icon';
import Inputbox from 'components/Inputbox';

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
          <Inputbox
            ref={ref}
            type="text"
            autoComplete="off"
            autoFocus
            className={`search-box w-full !border-b-[var(--border-color)]`}
            placeholder={placeHolder}
            value={searchTerm}
            onChange={onChange}
          />
          <div
            onClick={onClear}
            className={`absolute top-2 right-1 flex h-6 w-6
            cursor-pointer items-center justify-center
            rounded-full hover:text-blue-500 ${clearButtonClass}`}
          >
            <Icon width={12} height={12} viewBox={'0 2 24 24'} icon={'close'} />
          </div>
        </div>
      </div>
    );
  }
);

ListHeader.displayName = 'ListHeader';

export default ListHeader;
