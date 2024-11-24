import { useCallback, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useList } from "hooks/useList";
import { FiMenu } from "react-icons/fi";
import { Note, Panels, PanelsPartial } from "types/Note";
import ConfirmExportModal from "components/ConfirmExportModal";
import useDeleteNote from "hooks/useDeleteNote";
import useUIZStore from "utils/useUIZStore";
import {
  HiOutlineArrowsPointingIn,
  HiOutlineArrowsPointingOut,
  HiOutlineTrash,
  HiOutlineListBullet,
  HiOutlineArrowDownTray,
  HiOutlinePrinter,
  HiOutlineSwatch,
  HiOutlineViewColumns,
} from "react-icons/hi2";
import { FaMarkdown } from "react-icons/fa";
import MenuButton2 from "components/MenuButton2";
import RoundBigButton from "./RoundBigButton";

interface Props {
  noteId: string;
}

const NoteMenu = (props: Props) => {
  const { noteId } = props;
  const { list, dispatchList } = useList();
  const note =
    noteId &&
    list?.notes.length &&
    list.notes.find((n: Note) => n.id === noteId);

  const { wide } = note || {};
  const expandIcon = wide ? (
    <HiOutlineArrowsPointingIn />
  ) : (
    <HiOutlineArrowsPointingOut />
  );
  const tocVisible = note?.panels?.toc;
  const [showConfirmExportModal, setShowConfirmExportModal] = useState(false);
  const binNote = useDeleteNote(noteId, note?.deletedAt);
  const { showMdCheat } = useUIZStore((state) => state);

  const openConfirmExportModal = () => setShowConfirmExportModal(true);
  const closeConfirmExportModal = () => setShowConfirmExportModal(false);

  const rotatePanels = useCallback(() => {
    const { viewer, editor } = note.panels;
    let nextPanels: PanelsPartial;
    if (viewer && editor) {
      nextPanels = { viewer: true, editor: false };
    } else if (viewer) {
      nextPanels = { viewer: false, editor: true };
    } else {
      nextPanels = { viewer: true, editor: true };
    }

    const panels = { ...note.panels, ...nextPanels };
    dispatchList({
      type: "merge",
      id: noteId,
      partial: { panels },
    });
  }, [dispatchList, noteId, note.panels]);

  const updatePanels = useCallback(
    (panels: Partial<Panels>) =>
      dispatchList({
        type: "merge-panels",
        id: noteId,
        panels,
      }),
    [noteId, dispatchList],
  );

  const updateWidth = useCallback(
    (wide: boolean) =>
      dispatchList({
        type: "merge",
        id: noteId,
        partial: { wide },
      }),
    [noteId, dispatchList],
  );

  const toggleToc = () => updatePanels({ toc: !tocVisible });
  const toggleFullWidth = () => updateWidth(!wide);

  const rotateTheme = useCallback(() => {
    dispatchList({
      type: "next-style",
      id: noteId,
    });
  }, [noteId, dispatchList]);

  const fullWidthText = wide ? "Compress" : "Expand";
  const toggleTocText = tocVisible ? "Hide" : "Show";

  if (!note) {
    return null;
  }

  return (
    <>
      <Menu as="div" className="no-print absolute inline-flex right-2 top-2">
        <Menu.Button as="div" className="menu-btn">
          <RoundBigButton>
            <FiMenu className="text-sm " />
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
              className="two-panes"
              text="Change layout"
              onClick={rotatePanels}
              icon={<HiOutlineViewColumns />}
            />
            <MenuButton2
              className="toggle-full-width"
              text={fullWidthText}
              onClick={toggleFullWidth}
              icon={expandIcon}
            />
            <MenuButton2
              text="Export"
              onClick={openConfirmExportModal}
              icon={<HiOutlineArrowDownTray />}
            />
            <MenuButton2
              text="Delete"
              onClick={binNote}
              icon={<HiOutlineTrash />}
            />
            <MenuButton2
              data-test-toc
              text={`${toggleTocText} Table of Contents`}
              onClick={toggleToc}
              icon={<HiOutlineListBullet />}
              disabled={!note.panels.viewer}
            />
            <MenuButton2
              data-test-change-style
              text="Change theme"
              onClick={rotateTheme}
              icon={<HiOutlineSwatch />}
              disabled={!note.panels.viewer}
            />
            <MenuButton2
              className="print"
              text="Print"
              onClick={() => window.print()}
              icon={<HiOutlinePrinter />}
              disabled={!note.panels.viewer}
            />
            <MenuButton2
              text="MD Cheatsheet"
              onClick={showMdCheat}
              icon={<FaMarkdown />}
            />
          </Menu.Items>
        </Transition>
      </Menu>
      <ConfirmExportModal
        show={showConfirmExportModal}
        note={note}
        onClose={closeConfirmExportModal}
      />
    </>
  );
};

export default NoteMenu;
