'use client';

import React, { useCallback, useState } from 'react';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { Save } from 'lucide-react';
import { supabaseBrowserClient } from '@/utils/supabase/create-browser-supabase-client';
import Link from 'next/link';

interface SEOAssistResponseProps {
  previousDescription: string;
  seoDescription: string;
  setSeoDescription: (value: string) => void;
  loading: boolean;
  exampleId: string;
}

const SEOAssistResponse = (props: SEOAssistResponseProps) => {
  const { previousDescription, seoDescription, loading, exampleId } = props;
  const supabase = supabaseBrowserClient();
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    setSaving(true);
    const example = {
      seo_description: seoDescription,
    };
    const { error: error2 } = await supabase
      .from('examples')
      .update(example)
      .eq('id', exampleId)
      .select('id')
      .single();

    setSaving(false);
    if (error2) {
      console.error(error2);
      toast.error('Error saving example');
      return;
    }
    toast.success('SEO description saved');
  }, [seoDescription, supabase, exampleId]);

  if (loading) {
    return null;
  }

  const hasRightLength =
    seoDescription.length >= 110 && seoDescription.length <= 160;

  return (
    <div className="space-y-4 pb-16">
      <Label>Suggested SEO description</Label>
      <Textarea
        value={seoDescription}
        onChange={(e) => props.setSeoDescription(e.target.value)}
        rows={5}
      />
      <p
        className={cn('text-sm font-bold', {
          'text-red-500': !hasRightLength,
          'text-green-500': hasRightLength,
        })}
      >
        Characters: {seoDescription.length}
      </p>
      {previousDescription && (
        <>
          <hr />
          <Label>Previous SEO description</Label>
          <p className="">{previousDescription}</p>
        </>
      )}
      <div className="flex items-center gap-4">
        <Button
          onClick={handleSave}
          className="gap-2"
          disabled={saving || !hasRightLength}
        >
          <Save size={12} />
          <span>Save</span>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`/examples/${exampleId}`}>
            <span>Example details</span>
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`/?missing_info=seo`}>
            <span>List</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SEOAssistResponse;
