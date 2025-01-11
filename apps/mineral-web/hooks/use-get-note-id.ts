import { usePathname, useSearchParams } from 'next/navigation';

export const useGetNoteid = () => {
  const params = useSearchParams();
  const id = params.get('id') || {};

  const isNotePage = usePathname().startsWith('/note');

  if (!isNotePage) {
    return null;
  }

  if (typeof id !== 'string') {
    return null;
  }

  return id;
};
