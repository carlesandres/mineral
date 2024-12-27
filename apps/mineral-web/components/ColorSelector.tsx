import React, { useCallback } from 'react';
import ColorBall from 'components/ColorBall';
import colors from 'components/colors';
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog';
import { updateNote } from 'hooks/useNotesStore';
import type { Note } from 'types/Note';

interface ColorSelectorProps {
  selectedColor?: string;
  noteId: Note['id'];
}

const ColorSelector = (props: ColorSelectorProps) => {
  const { selectedColor, noteId } = props;

  const changeColor = useCallback(
    (color: string) => {
      updateNote(noteId, { color });
    },
    [noteId],
  );

  const colorballs = colors.map((color) => (
    <ColorBall
      key={color}
      onClick={() => changeColor(color)}
      selected={color === selectedColor}
      color={color}
    />
  ));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ColorBall color={selectedColor} small />
      </DialogTrigger>
      <DialogContent>
        <div className="p-4">
          <p className="px-4 py-2">
            Different colors can help you find your notes faster in the notes
            list.
          </p>
          <div className="flex w-full flex-wrap justify-start gap-4 overflow-hidden sm:p-4">
            {colorballs}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ColorSelector;
