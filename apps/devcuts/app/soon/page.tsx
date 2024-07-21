import Auth from 'components/Auth';
import WaitList from 'components/WaitList';
import React from 'react';

const SoonPage = () => {
  return (
    <div className="container mx-auto mt-16 max-w-4xl p-4 text-center">
      <h1 className="my-8 font-bold text-2xl sm:text-4xl">
        Make great looking cheatsheets to share
      </h1>
      <p>Login if you have an account</p>
      <Auth className="pt-4 sm:pt-4" />
      <p className="mt-8 sm:mt-12">Or join the waitlist</p>
      <WaitList />
    </div>
  );
};

export default SoonPage;
