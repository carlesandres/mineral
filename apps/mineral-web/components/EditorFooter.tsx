import React from 'react';
import CloseButton from 'components/CloseButton';
// import StyleSelector from 'components/StyleSelector';
import EditorStatistics from 'components/EditorStatistics';
import { Note } from 'types/Note';
import { motion } from 'motion/react';
import ColorSelector from './ColorSelector';
import { ChevronUp } from 'lucide-react';
import { Button } from 'components/ui/button';

interface Props extends Note {
  onToggle: () => void;
}

const EditorFooter = (props: Props) => {
  const {
    showFooter,
    onToggle,
    id: noteId,
    createdAt,
    panels,
    text,
    // style = '',
    color = '#111111',
  } = props;

  // const viewerVisible = panels?.viewer ?? false;
  const editorVisible = panels?.editor ?? false;

  const expandButton = showFooter ? null : (
    <Button
      size="icon"
      variant="ghost"
      className="no-print chart absolute bottom-0 right-0"
      onClick={onToggle}
    >
      <ChevronUp size={16} />
    </Button>
  );

  return (
    <>
      {expandButton}
      <motion.div
        className=""
        animate={{ height: showFooter ? 'auto' : '0' }}
        transition={{ duration: 0.15 }}
      >
        <div
          className={`editor-footer monospace relative flex items-center justify-between overflow-hidden border-t px-2 py-1.5 pr-12 transition-all dark:text-gray-800 print:hidden`}
        >
          <div className="flex items-center justify-start gap-2 text-sm text-gray-500">
            <ColorSelector noteId={noteId} selectedColor={color} />
            <EditorStatistics
              show={editorVisible}
              text={text}
              createdAt={createdAt}
            />
          </div>
          {/*
          <StyleSelector
            noteId={noteId}
            themeName={style}
            show={viewerVisible}
          />
          */}
          <CloseButton onClick={onToggle} className="-mt-1" />
        </div>
      </motion.div>
    </>
  );
};

export default EditorFooter;
