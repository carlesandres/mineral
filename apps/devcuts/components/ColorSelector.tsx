import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import ColorPalette from 'components/ColorPalette';
import { useState, useCallback } from 'react';

interface ColorSelectorProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorSelector(props: ColorSelectorProps) {
  const { value, onChange } = props;
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (color: string) => {
      onChange(color);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-6 h-6 rounded-full" style={{ background: value }} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pick a color</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ColorPalette value={value} onSelected={handleSelect} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
