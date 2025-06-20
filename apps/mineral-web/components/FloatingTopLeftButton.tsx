import { HTMLAttributes, forwardRef, Ref } from 'react';
import RoundBigButton from 'components/RoundBigButton';

interface Props extends HTMLAttributes<HTMLButtonElement> {}

const FloatingTopLeftButton = (props: Props, ref: Ref<HTMLButtonElement>) => {
  const { className, children, ...restProps } = props;
  return (
    <RoundBigButton
      ref={ref}
      className={`fixed top-2 left-2 z-20 print:hidden ${className}`}
      {...restProps}
    >
      {children}
    </RoundBigButton>
  );
};

export default forwardRef(FloatingTopLeftButton);
