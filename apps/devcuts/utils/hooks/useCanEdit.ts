'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'types/supabase';

const isDev = process.env.NODE_ENV === 'development';

export default function useCanEdit(userId: string | undefined) {
  const supabase = createClientComponentClient<Database>();
  const [canEdit, setCanEdit] = useState(false);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    const getProfileDetails = async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      // Maybe we could embed this permission in the jwt token
      setCanEdit(data?.can_edit ?? false);
      setInitialised(true);
    };

    if (userId && !initialised) {
      getProfileDetails(userId);
    }
  }, [userId, supabase, initialised]);

  return canEdit && isDev;
}
