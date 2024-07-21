'use client';

import { useSearchParams } from 'next/navigation';

export const useSingleQueryParam = (
  paramName: string,
  defaultValue: string | null = null,
) => {
  const searchParams = useSearchParams();
  const param = searchParams?.get(paramName) ?? defaultValue;

  return param;
};
