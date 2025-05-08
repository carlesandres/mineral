'use client';

import { useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import useNotesStore, { getNoteById } from 'hooks/useNotesStore';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css'; // Import styles
import Markdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef, useState } from 'react';
import useSettingsStore from '@/hooks/useSettingsStore';
import { text } from 'stream/consumers';

const SlidePageClient = () => {
  const { initialized } = useNotesStore((state) => state);
  const searchParams = useSearchParams();
  const noteId = searchParams?.get('id');
  const { gfm } = useSettingsStore();

  const remarkPlugins = gfm ? [remarkGfm] : [];
  // Add state to track if Reveal is initialized
  const [revealInitialized, setRevealInitialized] = useState(false);

  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

  // Initialize Reveal.js only once after component mounts and content is available
  useEffect(() => {
    if (
      !noteId ||
      !deckDivRef.current ||
      revealInitialized ||
      deckRef.current
    ) {
      return;
    }

    const initReveal = async () => {
      try {
        deckRef.current = new Reveal(deckDivRef.current!, {
          transition: 'slide',
        });

        await deckRef.current.initialize();
        setRevealInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Reveal.js:', error);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initReveal();
    }, 100);

    return () => {
      clearTimeout(timer);
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
          setRevealInitialized(false);
        }
      } catch (e) {
        console.warn('Reveal.js destroy call failed.');
      }
    };
  }, [noteId, revealInitialized]);

  // Move note fetching to a separate effect to prevent re-renders
  const [note, setNote] = useState<any>(null);
  const [title, setTitle] = useState('(Untitled note)');

  useEffect(() => {
    if (!noteId || !initialized) return;

    const foundNote = getNoteById(noteId);
    if (foundNote) {
      setNote(foundNote);
      setTitle(foundNote.title || '(Untitled note)');
    }
  }, [noteId, initialized]);

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

  return (
    <div className="relative flex h-screen print:h-auto">
      <div className="reveal">
        <div className="slides" ref={deckDivRef}>
          <div
            className={`prose h-full w-full max-w-none overflow-y-auto p-20 dark:prose-invert prose-code:before:content-none prose-code:after:content-none print:text-gray-950 print:prose-headings:text-gray-950 print:prose-a:text-gray-950`}
          >
            <Markdown
              rehypePlugins={[rehypeSlug]}
              remarkPlugins={remarkPlugins}
            >
              {note.text}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidePageClient;
