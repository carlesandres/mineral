import React, { ChangeEvent, useCallback, KeyboardEvent } from 'react';
import { useState, useRef } from 'react';
import { Note } from 'types/Note';
import { Input } from './ui/input';

interface EditorToolbarProps {
  note: Note;
  onChange: (title: string) => void;
  editorRef: React.RefObject<HTMLTextAreaElement | null>;
}

const EditorToolbar = (props: EditorToolbarProps) => {
  const { note, editorRef } = props;
  const { wide } = note;
  const [title, setTitle] = useState(props.note?.title || '');
  const titleRef = useRef<HTMLInputElement | null>(null);

  const editorOpen = note.panels.editor;
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && editorOpen) {
        e.preventDefault();
        if (editorRef?.current) {
          editorRef.current.focus();
        }
      }
    },
    [editorRef, editorOpen],
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.currentTarget.value;

    setTitle(title);
    props.onChange(title);
  };

  if (!note) {
    return null;
  }

  const wideClass = wide ? 'sm: ml-8' : 'sm:mx-0';

  // TO-DO: Change the padding-left in the input depending on
  // whether the note menu is available or not
  return (
    <div
      className={`editor-toolbar no-print flex items-center justify-between border-b border-[var(--border-soft-color)] bg-[var(--solid-bg-color)] print:border-none`}
    >
      <input
        type="text"
        ref={titleRef}
        autoFocus={!title}
        value={title}
        placeholder="(untitled)"
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={`title focus-bg mx-6 flex-1 overflow-hidden text-ellipsis whitespace-nowrap border-none bg-transparent px-4 py-2 shadow-none ring-0 sm:!text-base ${wideClass}`}
      />
    </div>
  );
};

export default EditorToolbar;
