import Auth from 'components/Auth';
import SignOutButton from 'components/SignOutButton';
import { createServerSupabaseClient } from 'utils/create-server-supabase-client';

export const dynamic = 'force-dynamic';

const LoginPage = async () => {
  const supabase = createServerSupabaseClient();
  const { data: { user } = {} } = await supabase.auth.getUser();

  if (!user) {
    return <Auth />;
  }

  const username = user.user_metadata.full_name || user.email;

  return (
    <div className="container mx-auto mt-16 max-w-4xl p-4 text-center">
      <h1 className="mt-20 text-2xl font-bold">Hi {username}!</h1>
      <div className="mt-16 flex justify-center gap-4">
        <SignOutButton />
      </div>
    </div>
  );
};

export default LoginPage;
