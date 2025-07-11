import Link from 'next/link';
import { Button } from 'components/ui/button';

const GoToDashboardButton = () => {
  return (
    <Button asChild size="lg">
      <Link href="/notes">
        <span>Go to your notes</span>
      </Link>
    </Button>
  );
};

export default GoToDashboardButton;
