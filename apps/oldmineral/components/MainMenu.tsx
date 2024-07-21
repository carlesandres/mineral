import {
  HiOutlineCog,
  HiOutlineInformationCircle,
  HiOutlineClipboard,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Menu } from '@headlessui/react';
import { FiMenu } from 'react-icons/fi';
import MenuButton2 from './MenuButton2';
import RoundBigButton from './RoundBigButton';

const MainMenu = () => {
  const router = useRouter();

  return (
    <Menu as="div" className="no-print z-10 fixed left-2 top-2 inline-flex">
      <Menu.Button as="div" className="menu-btn">
        <RoundBigButton>
          <FiMenu className="text-sm " />
        </RoundBigButton>
      </Menu.Button>
      <Transition
        className="absolute left-0 top-full z-10"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items
          className="mt-1 flex w-max flex-col
              rounded border
              border-[var(--border-color)]
              bg-[var(--solid-bg-color)]
              px-3 py-4"
        >
          <MenuButton2
            text="Notes"
            onClick={() => router.push('/notes')}
            icon={<HiOutlineClipboard />}
          />
          <MenuButton2
            text="Bin"
            onClick={() => router.push('/bin')}
            icon={<HiOutlineTrash />}
          />
          <MenuButton2
            text="Settings"
            onClick={() => router.push('/settings')}
            icon={<HiOutlineCog />}
          />
          <MenuButton2
            text="Tricks"
            onClick={() => router.push('/tricks')}
            icon={<HiOutlineInformationCircle />}
          />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MainMenu;
