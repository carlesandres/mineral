export interface ColorBallProps {
  color?: string;
  selected?: boolean;
  small?: boolean;
  className?: string;
}

const ColorBall = (props: ColorBallProps) => {
  const { color = '#111111', selected, small, className = '' } = props;
  const sanitizedColor = color.replace('#', '');
  const selectedClass = selected ? 'ring ring-gray-500' : '';

  const sizeClass = small ? 'h-4 w-4' : 'h-8 w-8';

  return (
    <div
      className={`shrink-0 rounded-full transition hover:opacity-80 color-${sanitizedColor} ${selectedClass} ${sizeClass} ${className}`}
      style={{ backgroundColor: color }}
    />
  );
};

export default ColorBall;
