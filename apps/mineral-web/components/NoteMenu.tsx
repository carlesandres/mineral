import { useCallback, useState } from 'react';
import { Button } from 'components/ui/button';
import { Note, Panels, PanelsPartial } from 'types/Note';
import ConfirmExportModal from 'components/ConfirmExportModal';
import useDeleteNote from 'hooks/useDeleteNote';
import { getNotes, updateNote } from 'hooks/useNotesStore';
import {
  MoreVertical,
  Maximize2,
  Copy,
  Trash,
  ListOrdered,
  Printer,
  Download,
  Columns3,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { toast } from 'sonner';
import { copyToClipboard } from 'utils/copy-to-clipboard';

interface Props {
  noteId: string;
}

const NoteMenu = (props: Props) => {
  const { noteId } = props;
  const notes = getNotes();
  const note = notes.find((n: Note) => n.id === noteId);

  const { wide, text } = note || {};
  const tocVisible = note?.panels?.toc;
  const viewerVisible = note?.panels?.viewer;
  const [showConfirmExportModal, setShowConfirmExportModal] = useState(false);
  const binNote = useDeleteNote(noteId, note?.deletedAt);

  const openConfirmExportModal = () => setShowConfirmExportModal(true);
  const closeConfirmExportModal = () => setShowConfirmExportModal(false);
  const isSideBySide = note?.panels.viewer && note.panels.editor;

  const toggleSideBySide = useCallback(() => {
    if (!note) {
      return;
    }
    let nextPanels: PanelsPartial = {};
    if (isSideBySide) {
      nextPanels = { viewer: false, editor: true };
    } else {
      nextPanels = { viewer: true, editor: true };
    }

    const panels = { ...note.panels, ...nextPanels };
    updateNote(note.id, { panels });
  }, [note, isSideBySide]);

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

  // TO-DO: Extract this whole function to the utils
  const copyToCb = useCallback(async () => {
    if (!text) {
      toast.error('Failed to copy to clipboard');
      return;
    }
    const success = await copyToClipboard(text);
    if (success) {
      toast.success('Copied to clipboard');
    } else {
      toast.error('Failed to copy to clipboard');
    }
  }, [text]);

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
  const changeLayoutText = isSideBySide ? 'Single column' : 'Side by side';

  if (!note) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="print:hidden">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={toggleSideBySide}>
            <Columns3 className="mr-2 h-4 w-4" />
            <span>{changeLayoutText}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleFullWidth}>
            <Maximize2 className="mr-2 h-4 w-4" />
            <span>{fullWidthText}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openConfirmExportModal}>
            <Download className="mr-2 h-4 w-4" />
            <span>Export</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={binNote}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => copyToCb()}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy to clipboard</span>
          </DropdownMenuItem>
          {viewerVisible && (
            <DropdownMenuItem onClick={toggleToc}>
              <ListOrdered className="mr-2 h-4 w-4" />
              <span>{`${toggleTocText} Table of Contents`}</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
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
