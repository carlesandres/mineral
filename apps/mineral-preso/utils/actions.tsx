import { Expand, Shrink } from 'lucide-react';

export const getWideButton = (wide?: boolean) => {
  return {
    icon: wide ? Shrink : Expand,
    text: wide ? 'Easy read' : 'Wide view',
  };
};
