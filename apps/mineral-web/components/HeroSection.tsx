import React from 'react';
import { appName } from 'components/constants';
import LandingCTA from 'components/LandingCTA';

const HeroSection = () => {
  return (
    <div className="container mx-auto pb-4 text-center">
      <h1
        className="!mb-0 inline-block font-mono !text-4xl
            font-bold lowercase !text-yellow-500 sm:!text-8xl"
      >
        {appName}
      </h1>
      <h2
        className=" pb-16 font-mono
            !text-lg font-bold text-gray-600 dark:text-gray-300 sm:pb-32
            "
      >
        A minimalistic editor for your quick notes
      </h2>
      <LandingCTA />
    </div>
  );
};

export default HeroSection;
