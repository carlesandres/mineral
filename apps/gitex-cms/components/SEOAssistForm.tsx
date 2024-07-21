'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import { readStream } from '@/utils/read-stream';
import { Example } from '@/types/Example';
import SEOAssistResponse from './SEOAssistResponse';
import { RefreshCcw, Save, Shield } from 'lucide-react';
import { supabaseBrowserClient } from '@/utils/supabase/create-browser-supabase-client';

export const FormSchema = z.object({
  prompt: z.string().min(2, {
    message: 'Prompt must be at least 2 characters.',
  }),
});

interface SEOAssistFormProps {
  example: Example;
  defaultPrompt?: string;
}

const SEOAssistForm = (props: SEOAssistFormProps) => {
  const { example } = props;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { prompt: props.defaultPrompt ?? '' },
  });
  const { handleSubmit } = form;
  const [seoDescription, setSeoDescription] = useState('');
  const supabase = supabaseBrowserClient();
  const [savingPrompt, setSavingPrompt] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  // TO-DO: This is only required because of react stric double rendering
  const init = useRef(false);

  const submitHandler = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      setSeoDescription('');
      setLoadingResponse(true);
      const { prompt } = data;
      const fullPrompt = `${prompt}
command: ${example.example}
short description: ${example.short_description}
long description: ${example.long_description}`;
      try {
        await readStream(
          '/api/fill-in-example',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: fullPrompt }),
          },
          setSeoDescription,
        );
      } catch (err) {
        setLoadingResponse(false);
        toast.error('Error requesting help');
        console.error(err);
      }
      setLoadingResponse(false);
    },
    [example],
  );

  useEffect(() => {
    if (!init.current) {
      console.log('--------------------------------------------------- 1');
      init.current = true;
      submitHandler({ prompt: form.getValues('prompt') });
    }
  }, [form, submitHandler, init]);

  const handleSavePrompt = useCallback(async () => {
    setSavingPrompt(true);
    const { error } = await supabase
      .from('assist_prompts')
      .insert([{ prompt: form.getValues('prompt') }]);
    if (error) {
      setSavingPrompt(false);
      console.error(error);
      toast.error('Error saving prompt');
      return;
    }
    toast.success('Prompt saved');
    setSavingPrompt(false);
  }, [form, supabase]);

  return (
    <div className="space-y-8">
      <h1 className="flex gap-2 items-center text-2xl font-bold ">
        <Shield size={24} />
        SEO Assist
      </h1>
      <div className="space-y-2">
        <div className="text-lg font-bold">{example.example}</div>
        <div className="text-gray-500">{example.short_description}</div>
      </div>
      <Form {...form}>
        <form
          className="example-form space-y-8"
          onSubmit={handleSubmit(submitHandler)}
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <FormItem className="sm:flex-1">
                  <FormControl>
                    <Textarea
                      autoFocus
                      rows={10}
                      placeholder="Prompt"
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="secondary"
              disabled={loadingResponse}
              type="submit"
              className="gap-2"
            >
              <RefreshCcw size={14} />
              <span>Regenerate</span>
            </Button>
            <Button
              disabled={savingPrompt}
              onClick={handleSavePrompt}
              variant="secondary"
              className="gap-2"
            >
              <Save size={14} />
              <span>Save Prompt</span>
            </Button>
          </div>
        </form>
      </Form>
      <SEOAssistResponse
        previousDescription={example.seo_description}
        seoDescription={seoDescription}
        setSeoDescription={setSeoDescription}
        loading={false}
        exampleId={example.id}
      />
    </div>
  );
};

export default SEOAssistForm;
