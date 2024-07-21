import { useList } from 'hooks/useList';
import Button from 'components/Button';
import { goToNewFile, goToList } from 'utils/navigationHelpers';
import { HiOutlinePlus, HiOutlineClipboard } from 'react-icons/hi';

const style =
  'mx-auto flex items-center justify-center space-x-2 sm:!px-6 sm:!py-4 sm:text-lg';

const LandingCTA = () => {
  const { list } = useList();

  if (!list.initialized) {
    return null;
  }

  if (list.notes.length > 0) {
    return (
      <Button className={style} onClick={() => goToList()}>
        <HiOutlineClipboard className="-mt-0.5 text-xl" />
        <span>Go to your dashboard</span>
      </Button>
    );
  }

  return (
    <Button className={style} onClick={goToNewFile}>
      <HiOutlinePlus />
      <span>Create a note</span>
    </Button>
  );
};

export default LandingCTA;
