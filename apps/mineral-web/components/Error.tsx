import { ReactNode } from 'react';

export interface ErrorProps {
  children: ReactNode;
}

const Error = (props: ErrorProps) => {
  if (!props.children) {
    return null;
  }

  return <p className="py-2 text-sm text-red-500">{props.children}</p>;
};

export default Error;
