"use client";

import { useLanding } from "hooks/useLanding";

const HomePageClient = () => {
  useLanding();

  return <div>Loading...</div>;
};

export default HomePageClient;
