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
import type { Note } from 'types/Note';
import CloseButton from './CloseButton';
import { updateNote } from 'hooks/useNotesStore';
import { Eye } from 'lucide-react';

interface Props extends Note {
  onScrollEditor: UIEventHandler<HTMLTextAreaElement>;
  onDoubleClick: MouseEventHandler<HTMLTextAreaElement>;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

const Editor = React.forwardRef(
  (props: Props, ref: RefObject<HTMLTextAreaElement>) => {
    const { id, panels, onClose } = props;
    const { lineHeightRem } = useSettingsStore();
    const [text, setText] = useState('');
    const showEditor = panels?.editor;

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
    //
    const isTwoPanels = panels?.viewer && panels?.editor;
    const closeButtonIcon = isTwoPanels ? undefined : <Eye />;

    return (
      <div
        id="editorarea"
        className="editorarea relative h-full w-full min-w-0 flex-[2] font-mono print:hidden"
      >
        <style jsx>{`
          textarea {
            line-height: ${lineHeightRem}em;
          }

          textarea.dimmedOnBlur:not(:focus) {
            color: var(--editor-unfocused-color);
          }
        `}</style>
        <textarea
          className={`editor-content panel-padding focus-bg scrollable h-full w-full resize-none rounded-none border-none bg-transparent print:hidden`}
          ref={ref}
          onDoubleClick={props.onDoubleClick}
          onChange={onChange}
          onScroll={onScrollEditor}
          value={text}
        />
        <CloseButton onClick={onClose} className="mr-1">
          {closeButtonIcon}
        </CloseButton>
      </div>
    );
  },
);

Editor.displayName = 'Editor';

export default Editor;
