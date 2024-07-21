import { Popover, PopoverTrigger, PopoverContent } from 'components/ui/popover';
import { Scroll, ScrollText } from 'lucide-react';
import React from 'react';

interface EditorNotesPreviewProps {
  editorNotes: string;
}

const EditorNotesPreview = (props: EditorNotesPreviewProps) => {
  const { editorNotes } = props;

  if (!editorNotes) {
    return <Scroll size={16} className="text-gray-300" />;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <ScrollText size={16} />
      </PopoverTrigger>
      <PopoverContent>{editorNotes}</PopoverContent>
    </Popover>
  );
};

export default EditorNotesPreview;
