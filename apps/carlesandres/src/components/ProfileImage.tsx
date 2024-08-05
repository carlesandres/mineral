import Image from 'next/image';
import { cn } from '../utils/utils';
import profileImage from '../../public/profile.png';

export interface ProfileImageProps {
  size?: number;
  className?: string;
}

const ProfileImage = (props: ProfileImageProps) => {
  const { className } = props;

  return (
    <div
      className={cn(
        `relative h-16 w-16 overflow-hidden rounded-full sm:h-32 sm:w-32`,
        className,
      )}
    >
      <Image src={profileImage} alt="Carles Andrés profile picture" fill />
    </div>
  );
};

export default ProfileImage;
