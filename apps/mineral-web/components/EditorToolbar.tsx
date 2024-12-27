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

  const wideClass = wide ? 'wide' : 'sm:mx-0';

  return (
    <div
      className={`editor-toolbar no-print flex items-center justify-between border-b border-[var(--border-soft-color)] bg-[var(--solid-bg-color)] px-2 py-0.5 print:border-none`}
    >
      <Input
        type="text"
        ref={titleRef}
        autoFocus={!title}
        value={title}
        placeholder="(Untitled)"
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={`title overflow-hidden text-ellipsis whitespace-nowrap rounded-none border-0 border-b border-b-transparent px-0 shadow-none focus-visible:border-b-blue-500 focus-visible:ring-0 sm:!text-base ${wideClass}`}
      />
    </div>
  );
};

export default EditorToolbar;
