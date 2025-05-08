'use client';

import { useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import useNotesStore, { getNoteById } from 'hooks/useNotesStore';
import { useEffect } from 'react';
import { Deck, Slide } from 'spectacle';
import Markdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import useSettingsStore from '@/hooks/useSettingsStore';
import remarkGfm from 'remark-gfm';

const SlidePageClient = () => {
  const { initialized } = useNotesStore((state) => state);
  const searchParams = useSearchParams();
  const noteId = searchParams?.get('id');
  const { gfm } = useSettingsStore();

  const remarkPlugins = gfm ? [remarkGfm] : [];

  if (!noteId) {
    notFound();
  }

  const note = getNoteById(noteId);

  const title = note?.title || '(Untitled note)';
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  if (!initialized) {
    return null;
  }

  if (!noteId) {
    notFound();
  }

  if (!note) {
    // Show loading state instead of immediately calling notFound()
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // Split the markdown content by horizontal rules (---) to create separate slides
  const slideContents = note.text.split(
    /\n---\n|\r\n---\r\n|\r---\r|\n---\r|\r---\n/,
  );

  return (
    <div className="relative flex h-screen print:h-auto">
      <div
        className={`prose h-full w-full max-w-none overflow-y-auto p-20 dark:prose-invert prose-code:before:content-none prose-code:after:content-none print:text-gray-950 print:prose-headings:text-gray-950 print:prose-a:text-gray-950`}
      >
        <Deck>
          {slideContents.map((content, index) => (
            <Slide key={index}>
              <Markdown
                rehypePlugins={[rehypeSlug]}
                remarkPlugins={remarkPlugins}
              >
                {content}
              </Markdown>
            </Slide>
          ))}
        </Deck>
      </div>
    </div>
  );
};

export default SlidePageClient;
