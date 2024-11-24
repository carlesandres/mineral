import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useQueryParam = (name: string) => {
  const router = useRouter();
  const [param, setParam] = useState('');
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    if (router.isReady && !initialised) {
      const param = router.query[name] as string;
      setParam(param || '');
      setInitialised(true);
    }
  }, [router, name, initialised]);

  return { param, initialised };
};
