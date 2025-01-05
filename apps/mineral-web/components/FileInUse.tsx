import Link from 'next/link';
import { Button } from './ui/button';

const FileInUse = () => (
  <div className="mt-16 sm:mt-32">
    <h1 className="text-2xl font-bold">
      This file has been opened in another tab or window
    </h1>
    <p className="p-4">{`Opening the same note on multiple tabs is not
    currently supported.`}</p>
    <div className="flex w-full justify-center gap-4">
      <Button
        className="btn standalone clickable"
        onClick={() => {
          window.location.reload();
        }}
      >
        Reopen note in this tab
      </Button>
      <Link href="/">Go to Dashboard</Link>
    </div>
  </div>
);
export default FileInUse;
