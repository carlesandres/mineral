"use client";

interface HomeRedirectProps {}

const HomeRedirect = (props: HomeRedirectProps) => {
  return <div></div>;
};

export default HomeRedirect;

import { useEffect } from "react";
import Router from "next/router";
import { useList } from "hooks/useList";

const HomePage = () => {
  const { list } = useList();

  useEffect(() => {
    if (!list.initialized) {
      return;
    }

    if (!list.notes.length) {
      Router.replace("/intro");
      return;
    }
    Router.replace("/notes");
  }, [list]);

  return null;
};

export default HomePage;
