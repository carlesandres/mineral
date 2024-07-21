import { ReactNode } from 'react';

export interface PanelLabelProps {
  children: ReactNode;
}

const PanelLabel = (props: PanelLabelProps) => {
  return (
    <div
      className="no-print absolute top-1 left-1 p-1
      font-sans text-base text-gray-400 dark:text-gray-500"
    >
      {props.children}
    </div>
  );
};

export default PanelLabel;
