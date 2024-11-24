import { useRef, useEffect, useState, ReactNode } from 'react';

interface DragAndDropProps {
  className?: string;
  children: ReactNode;
  handleDrop: (files: FileList) => Promise<void>;
}

const DragAndDrop = (props: DragAndDropProps) => {
  const { className = '' } = props;
  const [hovering, setHovering] = useState(false);
  const droppable = useRef<HTMLDivElement>();
  const { current } = droppable;

  const handleDragIn = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.items?.length > 0) {
      setHovering(true);
    }
  };
  const handleDragOut = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.items?.length > 0) {
      setHovering(false);
    }
  };

  const handleDrag = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.items?.length > 0) {
      setHovering(true);
    }
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.items?.length > 0) {
      props.handleDrop(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  };

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
  }, [current]);

  const innerClassName = hovering ? 'ring-2 ring-blue-500' : '';

  return (
    <div ref={droppable} className={`${innerClassName} ${className}`}>
      {props.children}
    </div>
  );
};

export default DragAndDrop;
