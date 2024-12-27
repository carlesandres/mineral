import React, { useCallback, useState } from 'react';
import ColorBall from 'components/ColorBall';
import colors from 'components/colors';
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog';
import { updateNote } from 'hooks/useNotesStore';
import type { Note } from 'types/Note';
import { Button } from './ui/button';

interface ColorSelectorProps {
  selectedColor?: string;
  noteId: Note['id'];
}

const ColorSelector = (props: ColorSelectorProps) => {
  const { selectedColor, noteId } = props;
  const [open, setOpen] = useState(false);

  const changeColor = useCallback(
    (color: string) => {
      updateNote(noteId, { color });
      setOpen(false);
    },
    [noteId],
  );

  const colorballs = colors.map((color) => (
    <button key={color} onClick={() => changeColor(color)}>
      <ColorBall key={color} selected={color === selectedColor} color={color} />
    </button>
  ));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ColorBall color={selectedColor} small />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <div className="p-4">
          <p className="px-4 py-2">
            A color can help you find your note faster in the list.
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
