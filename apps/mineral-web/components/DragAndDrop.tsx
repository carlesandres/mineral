import { useRef, useEffect, useState, ReactNode, useCallback } from 'react';

interface DragAndDropProps {
  className?: string;
  children: ReactNode;
  handleDrop: (files: FileList) => Promise<void>;
}

const DragAndDrop = (props: DragAndDropProps) => {
  const { className = '' } = props;
  const [hovering, setHovering] = useState(false);
  const droppable = useRef<HTMLDivElement | null>(null);
  const { current } = droppable;

  const handleDragIn = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!event.dataTransfer) {
      return;
    }

    if (event.dataTransfer.items?.length > 0) {
      setHovering(true);
    }
  }, []);

  const handleDragOut = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!event.dataTransfer) {
      return;
    }

    if (event.dataTransfer.items?.length > 0) {
      setHovering(false);
    }
  }, []);

  const handleDrag = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!event.dataTransfer) {
      return;
    }

    if (event.dataTransfer.items?.length > 0) {
      setHovering(true);
    }
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (!event.dataTransfer) {
        return;
      }

      if (event.dataTransfer.items?.length > 0) {
        props.handleDrop(event.dataTransfer.files);
        event.dataTransfer.clearData();
      }
    },
    [props],
  );

  useEffect(() => {
    if (current) {
      current.addEventListener('dragenter', handleDragIn);
      current.addEventListener('dragleave', handleDragOut);
      current.addEventListener('dragover', handleDrag);
      current.addEventListener('drop', handleDrop);
    }

    return () => {
      if (current) {
        current.removeEventListener('dragenter', handleDragIn);
        current.removeEventListener('dragleave', handleDragOut);
        current.removeEventListener('dragover', handleDrag);
        current.removeEventListener('drop', handleDrop);
      }
    };
  }, [current, handleDragIn, handleDragOut, handleDrag, handleDrop]);

  const innerClassName = hovering ? 'ring-2 ring-blue-500' : '';

  return (
    <div ref={droppable} className={`${innerClassName} ${className}`}>
      {props.children}
    </div>
  );
};

export default DragAndDrop;
