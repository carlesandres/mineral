'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
import { Input } from './ui/input';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import { readStream } from '@/utils/read-stream';
import { supabaseBrowserClient } from '@/utils/supabase/create-browser-supabase-client';
import { useSearchParams } from 'next/navigation';

export const FormSchema = z.object({
  prompt: z.string().min(2, {
    message: 'Prompt must be at least 2 characters.',
  }),
  example: z.string().min(2, {
    message: 'Example must be at least 2 characters.',
  }),
});

type Setter = (data: string) => string;
type UpdateCb = (setter: Setter) => void;

interface AssistFormProps {
  defaultPrompt?: string;
  onResultChange: UpdateCb;
  promptTableName?: 'assist_prompts' | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AssistForm = (props: AssistFormProps) => {
  const { onResultChange, promptTableName, loading, setLoading } = props;
  const searchParams = useSearchParams();
  const example = searchParams.get('example') ?? '';
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { prompt: props.defaultPrompt ?? '', example },
  });
  const { handleSubmit } = form;
  const supabase = supabaseBrowserClient();
  const [savingPrompt, setSavingPrompt] = useState(false);

  useEffect(() => {
    form.setValue('example', example);
  }, [example, form]);

  const submitHandler = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      onResultChange(() => '');
      setLoading(true);
      const { prompt, example } = data;
      const fullPrompt = `${prompt}\n\n"""${example}"""`;
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
          onResultChange,
        );
      } catch (err) {
        toast.error('Error requesting help');
        console.error(err);
      }
      setLoading(false);
    },
    [onResultChange, setLoading],
  );

  const handleSavePrompt = useCallback(async () => {
    if (promptTableName !== 'assist_prompts') {
      return;
    }
    setSavingPrompt(true);
    const { error } = await supabase
      .from(promptTableName)
      .insert([{ prompt: form.getValues('prompt') }]);
    if (error) {
      setSavingPrompt(false);
      console.error(error);
      toast.error('Error saving prompt');
      return;
    }
    toast.success('Prompt saved');
    setSavingPrompt(false);
  }, [form, supabase, promptTableName]);

  return (
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
                    rows={18}
                    placeholder="Prompt"
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="example"
          render={({ field }) => {
            const { ref, ...rest } = field;
            return (
              <FormItem className="sm:flex-1">
                <FormControl>
                  <Input autoFocus placeholder="Example" {...rest} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex items-center justify-between gap-4">
          <Button disabled={loading} type="submit">
            Generate Response
          </Button>
          {promptTableName && (
            <Button
              disabled={savingPrompt}
              onClick={handleSavePrompt}
              variant="secondary"
            >
              Save Prompt
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AssistForm;
