import Link from 'next/link';
import Image, { ImageProps } from 'next/image';

interface AppBannerProps {
  href: string;
  title: string;
  description: string;
  image: ImageProps['src'];
}

const AppBanner = (props: AppBannerProps) => {
  const { href, title, description, image } = props;
  return (
    <Link
      href={href}
      className="flex flex-col font-mono items-center flex-1 rounded-lg border border-blue-400 bg-blue-50/50 
      transition-colors hover:border-zinc-600 hover:bg-zinc-50 p-6 space-y-3"
    >
      <Image src={image} alt={title} width={75} height={75} />
      <div className="font-bold">{title}</div>
      <div className=" text-sm text-balance">{description}</div>
    </Link>
  );
};

export default AppBanner;
