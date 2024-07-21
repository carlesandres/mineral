import { createServerSupabaseClient } from '@/utils/supabase/create-server-supabase-client';
import Auth from 'components/Auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const supabase = createServerSupabaseClient();
  const { data: { user } = {} } = await supabase.auth.getUser();

  if (user) {
    redirect('/account');
  }

  return <Auth />;
};

export default LoginPage;
