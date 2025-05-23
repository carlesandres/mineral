import React from 'react';
import GoToDashboardButton from './GoToDashboardButton';

const EmptyBinView = () => (
  <div className="empty-list mt-16 w-full text-center text-base sm:mt-32">
    <p className="mb-4">Your bin is empty.</p>
    <p className="my-2 flex justify-center">
      <GoToDashboardButton />
    </p>
  </div>
);

export default EmptyBinView;
