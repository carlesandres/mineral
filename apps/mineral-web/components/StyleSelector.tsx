import { HTMLAttributes } from 'react';
import Button from 'components/Button';
import { HiOutlineSwatch } from 'react-icons/hi2';
// import { getNoteById } from 'utils/useNotesStore';

export interface StyleSelectorProps extends HTMLAttributes<HTMLButtonElement> {
  noteId: string;
  themeName: string;
  show: boolean;
}

const StyleSelector = (props: StyleSelectorProps) => {
  const { noteId, themeName, show, ...restProps } = props;

  // TO-DO: Implement this in useNotesStore
  // const rotateTheme = useCallback(
  //   () =>
  //     dispatchList({
  //       type: 'next-style',
  //       id: noteId,
  //     }),
  //   [noteId]
  // );

  if (!show) {
    return null;
  }

  return (
    <Button className="w-24" onClick={() => {}} variant="small" {...restProps}>
      <HiOutlineSwatch className="text-base" />
      <span className="bg-transparent text-xs">{themeName}</span>
    </Button>
  );
};

export default StyleSelector;
