'use client';

import { useInit } from 'hooks/use-init-app';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = (props: ClientLayoutProps) => {
  useInit();
  const { children } = props;
  return children;
};

export default ClientLayout;
