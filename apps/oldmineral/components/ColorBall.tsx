import { useCallback } from 'react';

export interface ColorBallProps {
  color: string;
  selected?: boolean;
  onClick?: (args0: string) => void;
  small?: boolean;
  className?: string;
}

const ColorBall = (props: ColorBallProps) => {
  const { color, onClick, selected, small, className = '' } = props;
  const sanitizedColor = color.replace('#', '');
  const selectedClass = selected ? 'ring ring-gray-500' : '';

  const clickHandler = useCallback(() => {
    if (onClick) {
      onClick(color);
    }
  }, [onClick, color]);

  const sizeClass = small ? 'h-4 w-4' : 'h-8 w-8';

  const ball = (
    <div
      className={`shrink-0 rounded-full
        transition hover:opacity-80
        color-${sanitizedColor} ${selectedClass} ${sizeClass} ${className}`}
      onClick={clickHandler}
      style={{ backgroundColor: color }}
    />
  );

  if (!onClick) {
    return ball;
  }

  return (
    <button className={`shrink-0`} onClick={clickHandler}>
      {ball}
    </button>
  );
};

export default ColorBall;
