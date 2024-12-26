import { Menu, Transition } from '@headlessui/react';
import { FiMenu } from 'react-icons/fi';
import MenuButton2 from 'components/MenuButton2';
import {
  HiOutlineUpload,
  HiOutlineDownload,
  HiOutlineTrash,
  HiOutlinePlus,
} from 'react-icons/hi';
import useUIZStore from 'utils/useUIZStore';
import RoundBigButton from './RoundBigButton';
import { useRoutingHelpers } from 'utils/use-routing-helpers';

const ListMenu = () => {
  const { showBackupModal, showFileImport } = useUIZStore();
  const { goToNewFile, goToBin } = useRoutingHelpers();

  return (
    <Menu as="div" className="no-print fixed right-2 top-2">
      <Menu.Button as="div" className="menu-btn">
        <RoundBigButton>
          <FiMenu />
        </RoundBigButton>
      </Menu.Button>
      <Transition
        className="absolute right-0 top-full z-10"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="mt-1 flex w-max flex-col rounded border border-[var(--border-color)] bg-[var(--solid-bg-color)] px-3 py-4">
          <MenuButton2
            onClick={goToNewFile}
            icon={<HiOutlinePlus />}
            text="New note"
          />
          <MenuButton2
            onClick={showBackupModal}
            icon={<HiOutlineDownload />}
            text="Backup"
          />
          <MenuButton2
            onClick={showFileImport}
            icon={<HiOutlineUpload />}
            text="Import note"
          />
          <MenuButton2
            icon={<HiOutlineTrash />}
            onClick={goToBin}
            text="Go to Bin"
          />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ListMenu;
