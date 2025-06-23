import Link from 'next/link';
import { Button } from 'components/ui/button';
import { PlusCircle } from 'lucide-react';

const LandingCTA = () => {
  return (
    <Button asChild size="lg">
      <Link href="/new">
        <PlusCircle className="text-xl" />
        <span>Create a note</span>
      </Link>
    </Button>
  );
};

export default LandingCTA;
