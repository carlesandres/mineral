import { MouseEventHandler } from 'react';

interface ResizeSliderProps {
  show: boolean;
  name: string;
  resizing: string;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
}

const ResizeSlider = (props: ResizeSliderProps) => {
  if (!props.show) {
    return null;
  }

  return (
    <div
      data-name={props.name}
      className={`resizer w-2 ${props.resizing}`}
      onMouseDown={props.onMouseDown}
    />
  );
};

export default ResizeSlider;