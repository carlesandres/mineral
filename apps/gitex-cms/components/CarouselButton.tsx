import React from 'react';

export interface CarouselButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CarouselButton = (props: CarouselButtonProps) => {
  const { className, children, ...rest } = props;

  return (
    <button
      className={`absolute hidden w-20 items-center justify-center 
        bg-gray-200 py-2 uppercase
        drop-shadow transition-colors duration-200
        hover:enabled:bg-gray-300 disabled:text-gray-400 sm:flex ${className}`}
      {...rest}
    >
      {props.children}
    </button>
  );
};

export default CarouselButton;
