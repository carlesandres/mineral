import React, { useCallback } from 'react';
import type { Example } from 'types/Example';
import Link from 'next/link';
import { exampleProgress } from 'utils/example-progress';
import ProgressIcon from 'components/ProgressIcon';
import EditorNotesPreview from './EditorNotesPreview';
import { Check, Copy, ShieldHalf, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { supabaseBrowserClient } from '@/utils/supabase/create-browser-supabase-client';

export interface CMSExampleRowProps extends Example {}

const colors = ['bg-green-200', 'bg-yellow-200', 'bg-red-200', 'bg-purple-200'];

const CMSExampleRow = (props: CMSExampleRowProps) => {
  const {
    example,
    short_description,
    draft,
    seo_description,
    id,
    difficulty,
    in_cheatsheet,
  } = props;
  const supabase = supabaseBrowserClient();

  const textColor = draft ? 'text-gray-400' : 'text-gray-900';

  const usedSeoDescription = seo_description ?? short_description;
  const seoLengthGood =
    usedSeoDescription.length <= 160 && usedSeoDescription.length >= 110;

  const progress = exampleProgress(props);

  const handleCopyCommand = useCallback(() => {
    navigator.clipboard.writeText(example);
    toast.success('Copied!');
  }, [example]);

  const difficultyColor = colors[difficulty - 1];

  const toggleInCheatsheet = useCallback(async () => {
    const { error } = await supabase
      .from('examples')
      .update({ in_cheatsheet: !in_cheatsheet })
      .eq('id', id);

    if (error) {
      console.error(error);
      return;
    }
    window.location.reload();
  }, [id, in_cheatsheet, supabase]);

  return (
    <div className="flex items-center w-full gap-2">
      <Link
        href={`/examples/${id}`}
        className={`flex flex-1 items-center rounded bg-gray-100 
        px-3 transition hover:bg-gray-200
         ${textColor} `}
      >
        <div className="flex-1 p-2 text-left font-bold">{example}</div>
        <div className="hidden flex-1 p-2 text-left">{short_description}</div>
      </Link>
      <div
        className={cn(
          'flex items-center justify-center rounded-full h-6 w-6 bg-gray-100 p-1 text-sm',
          difficultyColor,
        )}
      >
        {difficulty}
      </div>
      <Copy size={16} onClick={handleCopyCommand} className="cursor-pointer" />
      <EditorNotesPreview editorNotes={props.editor_notes} />
      <ProgressIcon progress={progress} />
      <Link href={`/assist?example=${encodeURIComponent(example)}`}>
        <Sparkles
          size={20}
          className={cn(
            'p-0.5 rounded-full text-blue-500 hover:bg-blue-100 cursor-pointer transition',
          )}
        />
      </Link>
      <Link href={`/seo-assist?id=${id}`}>
        <ShieldHalf
          size={20}
          className={cn(
            'p-0.5 rounded-full',
            seoLengthGood
              ? 'invisible'
              : 'text-red-500 hover:bg-red-100 cursor-pointer transition',
          )}
        />
      </Link>
      <div
        className="flex items-center justify-center bg-gray-200 rounded-full h-6 cursor-pointer text-gray-500 w-6 hover:bg-gray-300"
        onClick={toggleInCheatsheet}
      >
        {in_cheatsheet && <Check size={16} />}
      </div>
    </div>
  );
};

export default CMSExampleRow;
