"use client";

import { ListProvider } from "hooks/useList";

interface ClientLayoutProps {
  children: React.ReactNode;
}
const ClientLayout = (props: ClientLayoutProps) => {
  const { children } = props;
  return <ListProvider>{children}</ListProvider>;
};

export default ClientLayout;
