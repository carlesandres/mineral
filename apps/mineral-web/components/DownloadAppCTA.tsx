import { Button } from 'components/ui/button';
import { Download } from 'lucide-react';

type DowloadAppCTAProps = {
  className?: string;
};

const DowloadAppCTA = (props: DowloadAppCTAProps) => {
  if (process.env.BUILD_STATIC) {
    return null;
  }

  const { className = '' } = props;

  return (
    <Button variant="secondary" className={className}>
      <Download className="mr-2 h-4 w-4" />
      <span>Download our standalone App</span>{' '}
    </Button>
  );
};

export default DowloadAppCTA;
