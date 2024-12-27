import React, {
  useCallback,
  useEffect,
  RefObject,
  ChangeEvent,
  MouseEventHandler,
  UIEventHandler,
} from 'react';
import { useState } from 'react';
import useSettingsStore from 'hooks/useSettingsStore';
import PanelLabel from 'components/PanelLabel';
import { HiOutlinePencil } from 'react-icons/hi';
import type { Note } from 'types/Note';
import CloseButton from './CloseButton';
import { updateNote } from 'hooks/useNotesStore';

interface Props extends Note {
  onScrollEditor: UIEventHandler<HTMLTextAreaElement>;
  onDoubleClick: MouseEventHandler<HTMLTextAreaElement>;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

const Editor = React.forwardRef(
  (props: Props, ref: RefObject<HTMLTextAreaElement>) => {
    const { id, panels, onClose } = props;
    const { lineHeightRem, dimBlurredEditor } = useSettingsStore();
    const [text, setText] = useState('');
    const showEditor = panels?.editor;
    const isViewerOpen = panels?.viewer;

    useEffect(() => {
      setText(props.text || '');
    }, [props.text]);

    useEffect(() => {
      const titleIsFocused =
        document.activeElement?.className.includes('title');
      if (showEditor && ref.current && !titleIsFocused) {
        // TO-DO: Put the cursor at the end of the text, when this
        // becomes contenteditable.
        ref.current.focus();
      }
    }, [ref, showEditor]);

    const changeText = useCallback(
      (newText: string) => {
        setText(newText);
        updateNote(id, { text: newText, updatedAt: new Date().getTime() });
      },
      [id],
    );

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
      changeText(event.target.value);

    if (!showEditor) {
      return null;
    }

    const { onScrollEditor } = props;

    // It would be better to add a bunch of classes based on the current settings
    // at a parent component
    // TO-DO: Add a class to dim the editor when it's blurred
    // const dimOnBlurClass = dimBlurredEditor ? 'dimmedOnBlur' : '';

    return (
      <div
        id="editorarea"
        className="editorarea flex-2 relative h-full font-mono"
      >
        <PanelLabel>
          <HiOutlinePencil />
        </PanelLabel>
        <style jsx>{`
          textarea {
            line-height: ${lineHeightRem}em;
          }

          textarea.dimmedOnBlur:not(:focus) {
            color: var(--editor-unfocused-color);
          }
        `}</style>
        <textarea
          className={`editor-content scrollable no-print h-full w-full resize-none rounded-none border-none bg-[color:var(--editor-bg-color)] p-[var(--editor-padding)] text-[color:var(--editor-text-color)] outline-none`}
          ref={ref}
          onDoubleClick={props.onDoubleClick}
          onChange={onChange}
          onScroll={onScrollEditor}
          value={text}
        />
        {isViewerOpen && (
          <CloseButton
            onClick={onClose}
            className="mr-1 text-gray-400 dark:text-gray-500"
          />
        )}
      </div>
    );
  },
);

Editor.displayName = 'Editor';

export default Editor;
