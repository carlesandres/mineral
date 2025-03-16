import Link from 'next/link';
import { Button } from 'components/ui/button';
import { Clipboard } from 'lucide-react';

const GoToDashboardButton = () => {
  return (
    <Button asChild size="lg">
      <Link href="/notes">
        <Clipboard className="text-xl" />
        <span>Open dashboard</span>
      </Link>
    </Button>
  );
};

export default GoToDashboardButton;
