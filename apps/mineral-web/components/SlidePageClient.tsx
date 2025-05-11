'use client';

import { useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import useNotesStore, { getNoteById } from 'hooks/useNotesStore';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import useSettingsStore from '@/hooks/useSettingsStore';
import remarkGfm from 'remark-gfm';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from './ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const SlidePageClient = () => {
  const { initialized } = useNotesStore((state) => state);
  const searchParams = useSearchParams();
  const noteId = searchParams?.get('id');
  const { gfm } = useSettingsStore();
  const [api, setApi] = useState<CarouselApi | null>(null);

  const remarkPlugins = gfm ? [remarkGfm] : [];

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        api.scrollPrev();
      }

      if (event.key === 'ArrowRight') {
        api.scrollNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [api]);

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
    <div className="mx-auto flex h-full w-full items-center justify-center bg-blue-100 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
      <AspectRatio ratio={16 / 9} className="overflow-hidden p-20">
        <Carousel className="mx-auto w-full" setApi={setApi}>
          <CarouselContent className="flex gap-4">
            {slideContents.map((content, index) => (
              <CarouselItem
                key={index}
                className="overflow-rounded-lg mb-20 h-full bg-red-500"
              >
                <div className="prose dark:prose-invert prose-code:before:content-none prose-code:after:content-none print:prose-headings:text-gray-950 print:prose-a:text-gray-950 w-full max-w-none print:text-gray-950">
                  <Markdown
                    rehypePlugins={[rehypeSlug]}
                    remarkPlugins={remarkPlugins}
                  >
                    {content}
                  </Markdown>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </AspectRatio>
    </div>
  );
};

export default SlidePageClient;
