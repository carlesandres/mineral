import { viewStyles } from 'components/AppConstants';

export const getNextViewStyle = (currentStyle) => {
  if (!currentStyle) {
    return viewStyles[0];
  }

  const currStyleIndex = viewStyles.indexOf(currentStyle);

  if (currStyleIndex === -1) {
    return viewStyles[0];
  }

  const nextStyleIndex = (currStyleIndex + 1) % viewStyles.length;

  return viewStyles[nextStyleIndex];
};
