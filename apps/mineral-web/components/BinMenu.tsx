import { Menu, Transition } from "@headlessui/react";
import { FiMenu } from "react-icons/fi";
import MenuButton2 from "components/MenuButton2";
import { HiOutlinePlus, HiOutlineClipboard } from "react-icons/hi";
import { goToList, goToNewFile } from "utils/navigationHelpers";
import RoundBigButton from "./RoundBigButton";
import { useMemo } from "react";
import { getShownFiles } from "utils/fileUtils";
import EmptyBinButton from "./EmptyBinButton";
import { useList } from "hooks/useList";

const BinMenu = () => {
  const { list } = useList();
  const binnedNotes = useMemo(() => {
    return getShownFiles(list.notes, "BIN", "");
  }, [list.notes]);

  return (
    <Menu as="div" className="no-print fixed right-2 top-2">
      <Menu.Button as="div" className="menu-btn ">
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
        <Menu.Items
          className="mt-1 flex w-max flex-col
              rounded border
              border-[var(--border-color)]
              bg-[var(--solid-bg-color)]
              py-4 px-3"
        >
          <MenuButton2
            onClick={goToNewFile}
            icon={<HiOutlinePlus />}
            text="New note"
          />
          <MenuButton2
            icon={<HiOutlineClipboard />}
            onClick={() => goToList()}
            text="Go to Notes"
          />
          <EmptyBinButton binnedNotes={binnedNotes} />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default BinMenu;
