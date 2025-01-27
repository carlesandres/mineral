import { ReactNode } from 'react';

export interface PanelLabelProps {
  children: ReactNode;
}

const PanelLabel = (props: PanelLabelProps) => {
  return (
    <div className="absolute left-1 top-1 p-1 font-sans text-base text-gray-400 dark:text-gray-500 print:hidden">
      {props.children}
    </div>
  );
};

export default PanelLabel;
