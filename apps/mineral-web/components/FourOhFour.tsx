import Link from 'next/link';
import { HiOutlineClipboard } from 'react-icons/hi';
import { Button } from 'components/ui/button';

const FourOhFour = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-8 text-center text-3xl font-bold sm:mb-24 sm:text-5xl">
          Oops! Page does not exist
        </h1>
        <Button asChild>
          <Link href="/notes">
            <HiOutlineClipboard />
            <span>Go to your notes</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FourOhFour;
