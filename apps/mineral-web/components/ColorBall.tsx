import { cn } from '@/lib/utils';
import { defaultNoteColour } from './constants';

export interface ColorBallProps {
  color?: string;
  selected?: boolean;
  small?: boolean;
  className?: string;
}

const ColorBall = (props: ColorBallProps) => {
  const { color = defaultNoteColour, selected, small, className = '' } = props;

  return (
    <div
      className={cn(
        `size-8 shrink-0 cursor-pointer rounded-full transition hover:opacity-80`,
        {
          'ring-1 ring-offset-1': selected,
          'size-4': small,
        },
        className,
      )}
      style={{ backgroundColor: color }}
    />
  );
};

export default ColorBall;
