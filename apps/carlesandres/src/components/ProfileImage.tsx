import Image from 'next/image';
import { cn } from '../utils/utils';
import profileImage from '../../public/profile.png';

export interface ProfileImageProps {
  size?: number;
  className?: string;
}

const ProfileImage = (props: ProfileImageProps) => {
  const { size = 128, className } = props;

  return (
    <Image
      className={cn('rounded-full', className)}
      src={profileImage}
      alt="Carles Andrés profile picture"
      width={size}
      height={size}
    />
  );
};

export default ProfileImage;
