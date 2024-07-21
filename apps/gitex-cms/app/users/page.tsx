import  Image  from 'next/image';
import { pageProtect } from '@/utils/page-protect';

export const dynamic = 'force-dynamic';

const UsersPage = async () => {
  const supabase = await pageProtect();

  const { data: users, error } = await supabase.from('profiles').select('*');

  if (error) {
    return <div>Error</div>;
  }

  const { data: ev, error: err2 } = await supabase.from('inactive_users').select('*');

  if (err2) {
    return <div>Something went wrong</div>;
  }

  const numInactiveUsers = ev.length;

  const renderedUsers = users.map((user) => {
    return (
      <div key={user.id} className="flex items-center gap-4">
        <Image
          src={user.avatar_url || ''}
          alt={user.username || '(No username)'}
          className="rounded-full"
          width={32}
          height={32}
        />
          <div className="text-lg font-bold">{user.full_name}</div>
          <div className="text-gray-500">{user.website}</div>
      </div>
    );
  });

  return (
    <div className="container mx-auto mt-16 max-w-4xl p-4">
      <h1 className="font-bold text-2xl">{`Users: ${users.length}. Inactive users: ${numInactiveUsers}`}</h1>
      <div className="flex flex-col gap-4">
        {renderedUsers}
      </div>
    </div>
  );
};

export default UsersPage;
