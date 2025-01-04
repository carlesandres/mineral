import { useCallback, useState } from 'react';
import { Button } from 'components/ui/button';
import { Note, Panels, PanelsPartial } from 'types/Note';
import ConfirmExportModal from 'components/ConfirmExportModal';
import useDeleteNote from 'hooks/useDeleteNote';
import {
  HiOutlineTrash,
  HiOutlineListBullet,
  HiOutlineArrowDownTray,
  HiOutlinePrinter,
  HiOutlineViewColumns,
} from 'react-icons/hi2';
import { getNotes, updateNote } from 'hooks/useNotesStore';
import { MoreVertical, Maximize2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';

interface Props {
  noteId: string;
}

const NoteMenu = (props: Props) => {
  const { noteId } = props;
  const notes = getNotes();
  const note = notes.find((n: Note) => n.id === noteId);

  const { wide } = note || {};
  const tocVisible = note?.panels?.toc;
  const viewerVisible = note?.panels?.viewer;
  const [showConfirmExportModal, setShowConfirmExportModal] = useState(false);
  const binNote = useDeleteNote(noteId, note?.deletedAt);

  const openConfirmExportModal = () => setShowConfirmExportModal(true);
  const closeConfirmExportModal = () => setShowConfirmExportModal(false);

  const rotatePanels = useCallback(() => {
    if (!note) {
      return;
    }
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
    updateNote(note.id, { panels });
  }, [note]);

  const updatePanels = useCallback(
    (panels: Partial<Panels>) => {
      if (!note) {
        return;
      }
      updateNote(note.id, { panels: { ...note.panels, ...panels } });
    },
    [note],
  );

  const updateWidth = useCallback(
    (wide: boolean) => {
      if (!note) {
        return;
      }
      updateNote(note.id, { wide });
    },
    [note],
  );

  const toggleToc = () => updatePanels({ toc: !tocVisible });
  const toggleFullWidth = () => updateWidth(!wide);

  // TO-DO: Re-enable this by writing method in useNotesStore.ts
  // const rotateTheme = useCallback(() => {
  //   dispatchList({
  //     type: 'next-style',
  //     id: noteId,
  //   });
  // }, [noteId, dispatchList]);

  const fullWidthText = wide ? 'Compress' : 'Expand';
  const toggleTocText = tocVisible ? 'Hide' : 'Show';

  if (!note) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="no-print">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={rotatePanels}>
            <HiOutlineViewColumns className="mr-2 h-4 w-4" />
            <span>Change layout</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleFullWidth}>
            <Maximize2 className="mr-2 h-4 w-4" />
            <span>{fullWidthText}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openConfirmExportModal}>
            <HiOutlineArrowDownTray className="mr-2 h-4 w-4" />
            <span>Export</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={binNote}>
            <HiOutlineTrash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
          {viewerVisible && (
            <DropdownMenuItem onClick={toggleToc}>
              <HiOutlineListBullet className="mr-2 h-4 w-4" />
              <span>{`${toggleTocText} Table of Contents`}</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => window.print()}>
            <HiOutlinePrinter className="mr-2 h-4 w-4" />
            <span>Print</span>
          </DropdownMenuItem>
          {/* TO-DO: Re-enable this when a proper cheatsheet is written
          <DropdownMenuItem onClick={showMdCheat}>
            <FaMarkdown className="mr-2 h-4 w-4" />
            <span>MD Cheatsheet</span>
          </DropdownMenuItem>
          */}
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmExportModal
        show={showConfirmExportModal}
        note={note}
        onClose={closeConfirmExportModal}
      />
    </>
  );
};

export default NoteMenu;
