import Image from 'next/image';

interface LogoProps {
  onClick?: () => void;
  className?: string;
  size?: number;
}

const Logo = (props: LogoProps) => {
  const { onClick, className = 'h-8 m-8', size = 40 } = props;

  const img = (
    <Image alt="Textmarkr logo" src="/favicon.png" width={size} height={size} />
  );

  if (!onClick) {
    return img;
  }

  return (
    <button className={`navbar-brand small ${className}`} onClick={onClick}>
      {img}
    </button>
  );
};

export default Logo;
