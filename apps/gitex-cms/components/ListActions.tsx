import Link from 'next/link';
import { Button } from 'components/ui/button';

const ListActions = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <Button asChild>
        <Link href="/examples/new">+ New example</Link>
      </Button>
    </div>
  );
};

export default ListActions;
