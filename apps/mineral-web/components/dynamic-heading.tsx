import React, { Component } from 'react';

interface DynamicHeadingProps {
  level?: number; // Accept level as a number
  id: string;
  children: React.ReactNode; // Define children as a valid React node
}

// Type guard to check if level is a valid heading level (1 to 6)
const isValidHeadingLevel = (level: number): level is 1 | 2 | 3 | 4 | 5 | 6 => {
  return level >= 1 && level <= 6;
};

const DynamicHeading: React.FC<DynamicHeadingProps> = ({
  level = 1,
  id,
  children,
}) => {
  // Validate level using the type guard
  const validLevel = isValidHeadingLevel(level) ? level : 1; // Default to 1 if invalid
  const Tag = `h${validLevel}`;

  return (
    <Component as={Tag} id={id}>
      {children}
    </Component>
  );
};

export default DynamicHeading;
