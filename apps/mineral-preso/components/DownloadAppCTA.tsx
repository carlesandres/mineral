'use client';
import { cn } from '@/lib/utils';
import { Button } from 'components/ui/button';
import { Download } from 'lucide-react';
import { useState } from 'react';

type DowloadAppCTAProps = {
  className?: string;
};

const fileName = 'mineral-app/darwin/arm64/Mineral.dmg';

const DowloadAppCTA = (props: DowloadAppCTAProps) => {
  const { className = '' } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/get-presigned-url?fileName=${encodeURIComponent(fileName)}`,
      );
      const data = await response.json();

      if (data.url) {
        // Redirect to the pre-signed URL or open in new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error fetching pre-signed URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      className={className}
      onClick={handleDownload}
      disabled={isLoading}
    >
      <Download className={cn('mr-2 h-4 w-4', { 'animate-spin': isLoading })} />
      <span>Download our standalone App</span>{' '}
    </Button>
  );
};

export default DowloadAppCTA;
