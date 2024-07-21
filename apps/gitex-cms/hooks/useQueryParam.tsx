import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';

export const useQueryParam = (paramName: string, defaultValue?: string) => {
  const router = useRouter();
  const rawParam = router.query[paramName] as string | undefined;

  // For some components, the router.isReady is always true, because we
  // decide to delay its rendering until the router is ready.
  // In those cases we cannot delegate setting the default to the default
  // to a useEffect
  const sanitizedParam = rawParam ?? defaultValue;
  const param = Array.isArray(sanitizedParam)
    ? sanitizedParam[0]
    : sanitizedParam;

  const setParam = useCallback(
    (newValue: string) => {
      const { query } = router;
      router.replace({ query: { ...query, [paramName]: newValue } });
    },
    [router, paramName],
  );

  useEffect(() => {
    if (router.isReady) {
      const param = router.query[paramName];
      if (param === undefined && defaultValue !== undefined) {
        setParam(defaultValue);
        return;
      }
    }
  }, [router, paramName, defaultValue, setParam]);

  return [param, setParam] as const;
};
