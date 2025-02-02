import React from 'react';

interface HeadingProps {
  level: number;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ level, children }) => {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    default:
      return <h4>{children}</h4>; // Fallback to h1 if an unexpected level is provided
  }
};

export default Heading;
