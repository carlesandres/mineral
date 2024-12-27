import React from 'react';
import CloseButton from 'components/CloseButton';
import StyleSelector from 'components/StyleSelector';
import EditorStatistics from 'components/EditorStatistics';
import { BsFillBarChartFill } from 'react-icons/bs';
import { Note } from 'types/Note';
import { motion } from 'motion/react';
import ColorSelector from './ColorSelector';

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
    style = '',
    color = '#111111',
  } = props;

  const viewerVisible = panels?.viewer ?? false;
  const editorVisible = panels?.editor ?? false;

  const expandButton = showFooter ? null : (
    <button
      className="no-print chart absolute bottom-0 right-0 cursor-pointer p-2 text-gray-800 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-300"
      onClick={onToggle}
    >
      <BsFillBarChartFill />
    </button>
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
          className={`editor-footer monospace no-print relative flex items-center justify-between overflow-hidden border-t border-[var(--border-soft-color)] bg-[var(--solid-bg-color)] px-4 py-3 pr-12 text-sm text-gray-500 transition-all dark:text-gray-800`}
        >
          <div className="flex items-center justify-start gap-4">
            <ColorSelector noteId={noteId} selectedColor={color} />
            <EditorStatistics
              show={editorVisible}
              text={text}
              createdAt={createdAt}
            />
          </div>
          <StyleSelector
            noteId={noteId}
            themeName={style}
            show={viewerVisible}
          />
          <CloseButton onClick={onToggle} className="-mt-1" />
        </div>
      </motion.div>
    </>
  );
};

export default EditorFooter;
