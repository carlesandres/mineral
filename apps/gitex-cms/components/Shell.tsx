import NavigationLink from './NavigationLink';

const navigation = [
  { name: 'List', href: '/' },
  { name: 'Base commands', href: '/base_command' },
  { name: 'Assist', href: '/assist' },
  { name: 'Concepts', href: '/concepts' },
  { name: 'Users', href: '/users' },
  {
    name: 'Supabase',
    href: 'https://app.supabase.com/project/zxejoirpyhfqhnricbdd/editor',
    target: '_blank',
  },
];

export default async function Shell() {
  return (
    <>
      <div className="flex px-4 sm:px-0 justify-between">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="hidden sm:-my-px sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const { name, ...rest } = item;
                return (
                  <NavigationLink key={name} {...rest}>
                    {name}
                  </NavigationLink>
                );
              })}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              type="button"
              className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
