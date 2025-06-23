import { MouseEvent } from 'react';
interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const FloatingActions = (props: Props) => {
  const stopProp = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className="absolute top-0 right-2 bottom-0 hidden items-center gap-1.5 text-xl group-hover:flex"
      onClick={stopProp}
    >
      {props.children}
    </div>
  );
};

export default FloatingActions;
