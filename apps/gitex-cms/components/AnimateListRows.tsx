'use client';

import React from 'react';
import { AnimatePresence, motion, usePresence } from 'framer-motion';

const defaultTransition = {
  type: 'spring',
  stiffness: 500,
  damping: 50,
  mass: 1,
};

// TO-DO: Pass the transition as a prop
export interface AnimateListRowsProps {
  children?: React.ReactNode;
  height: number | 'auto';
  className?: string;
}

const AnimateListRows = (props: AnimateListRowsProps) => {
  const { children, height, className } = props;
  const [isPresent, safeToRemove] = usePresence();

  return (
    <AnimatePresence>
      {React.Children.map(children, (child) => (
        <motion.div
          layout
          animate={isPresent ? 'in' : 'out'}
          initial="out"
          transition={defaultTransition}
          variants={{
            in: { height, opacity: 1 },
            out: { height: 0, opacity: 0 },
          }}
          onAnimationComplete={() => !isPresent && safeToRemove()}
          style={{ position: isPresent ? 'static' : 'absolute' }}
          className={className}
        >
          {child}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default AnimateListRows;
