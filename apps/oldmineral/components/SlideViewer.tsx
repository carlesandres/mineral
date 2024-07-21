import React from 'react';
import { marked } from 'marked';
import hilite from 'utils/custom-hilite.js';
import { useEffect } from 'react';

interface Props {
  slides: string[];
  currentSlide: number;
  title: string;
  style?: string;
  onDoubleClick?: () => void;
}

const SlideViewer = (props: Props) => {
  useEffect(() => {
    const init = async () => {
      const hljs = await import('highlight.js');
      hljs.default.highlightAll();
      marked.setOptions({
        breaks: true,
        highlight: hilite,
      });
    };

    init();
  }, []);

  const { slides } = props;

  if (!slides.length) {
    return (
      <div className="generic-content">
        <p className="text-gray-500">This note is empty</p>
      </div>
    );
  }

  const { currentSlide, title } = props;
  const slide = `${slides[currentSlide - 1] || ''}`;
  const viewerContent = { __html: marked.parse(slide) };
  const viewerClass = `slide-viewer prose max-w-full viewerarea ${
    props.style || ''
  }`;
  const renderedTitle = title ? <h3 className="slide-title">{title}</h3> : null;

  return (
    <div className={viewerClass}>
      {renderedTitle}
      <div
        className="slide min-h-full"
        onDoubleClick={props.onDoubleClick}
        dangerouslySetInnerHTML={viewerContent}
      />
    </div>
  );
};

export default SlideViewer;
