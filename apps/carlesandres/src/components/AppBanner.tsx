import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/utils/utils';

interface AppBannerProps {
  href: string;
  title: string;
  description: string;
  image: ImageProps['src'];
  className?: string;
}

const AppBanner = (props: AppBannerProps) => {
  const { href, title, description, image, className } = props;
  return (
    <Link
      href={href}
      className={cn(
        'flex max-w-56 flex-1 flex-col items-center space-y-3 rounded-lg border border-blue-400 bg-blue-50/50 p-6 font-mono transition-colors hover:border-zinc-600 hover:bg-zinc-50',
        className,
      )}
    >
      <Image src={image} alt={title} width={75} height={75} />
      <div className="font-bold">{title}</div>
      <div className="text-balance text-sm">{description}</div>
    </Link>
  );
};

export default AppBanner;
