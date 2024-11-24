import React, {
  useCallback,
  useEffect,
  RefObject,
  ChangeEvent,
  MouseEventHandler,
  UIEventHandler,
} from "react";
import { useState } from "react";
import { useList } from "hooks/useList";
import useSettingsStore from "utils/useSettingsStore";
import PanelLabel from "components/PanelLabel";
import { HiOutlinePencil } from "react-icons/hi";
import type { Note } from "types/Note";
import CloseButton from "./CloseButton";

interface Props extends Note {
  onScrollEditor: UIEventHandler<HTMLTextAreaElement>;
  onDoubleClick: MouseEventHandler<HTMLTextAreaElement>;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

const Editor = React.forwardRef(
  (props: Props, ref: RefObject<HTMLTextAreaElement>) => {
    const { id, panels, onClose } = props;
    const { lineHeightRem, dimBlurredEditor } = useSettingsStore();
    const [text, setText] = useState("");
    const { dispatchList } = useList();
    const showEditor = panels?.editor;
    const isViewerOpen = panels?.viewer;

    useEffect(() => {
      setText(props.text || "");
    }, [props.text]);

    useEffect(() => {
      const titleIsFocused = document.activeElement.className.includes("title");
      if (showEditor && ref.current && !titleIsFocused) {
        // TO-DO: Put the cursor at the end of the text, when this
        // becomes contenteditable.
        ref.current.focus();
      }
    }, [ref, showEditor]);

    const changeText = useCallback(
      (newText: string) => {
        setText(newText);
        dispatchList({
          type: "merge",
          id,
          partial: {
            text: newText,
            updatedAt: new Date().getTime(),
          },
        });
      },
      [id, dispatchList],
    );

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
      changeText(event.target.value);

    if (!showEditor) {
      return null;
    }

    const { onScrollEditor } = props;

    // It would be better to add a bunch of classes based on the current settings
    // at a parent component
    const dimOnBlurClass = dimBlurredEditor ? "dimmedOnBlur" : "";

    return (
      <div
        id="editorarea"
        className="editorarea flex-2 relative flex h-full flex-col overflow-hidden font-mono"
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
          className={`editor-content scrollable no-print
            resize-none rounded-none bg-[color:var(--editor-bg-color)]
            p-[var(--editor-padding)]
            text-[color:var(--editor-text-color)]
            border-none
            outline-none ${dimOnBlurClass}`}
          ref={ref}
          onDoubleClick={props.onDoubleClick}
          onChange={onChange}
          onScroll={onScrollEditor}
          value={text}
        />
        {isViewerOpen && (
          <CloseButton
            onClick={onClose}
            className="mr-1 text-gray-400 dark:text-gray-500 "
          />
        )}
      </div>
    );
  },
);

Editor.displayName = "Editor";

export default Editor;
