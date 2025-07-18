import React, { useCallback, useState } from 'react';
import ColorBall from 'components/ColorBall';
import colors from 'components/colors';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
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
    <Button
      key={color}
      onClick={() => changeColor(color)}
      variant="ghost"
      size="icon"
    >
      <ColorBall key={color} selected={color === selectedColor} color={color} />
    </Button>
  ));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ColorBall color={selectedColor} small />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a color for your note</DialogTitle>
        </DialogHeader>
        <p className="">A color label can help you find your notes faster.</p>
        <div className="flex w-full flex-wrap justify-start gap-4 overflow-hidden">
          {colorballs}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ColorSelector;
