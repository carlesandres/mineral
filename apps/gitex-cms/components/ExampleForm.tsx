'use client';

import { useCallback, useState } from 'react';
import type { Example, ExampleInsert } from 'types/Example';
import { useForm, Controller } from 'react-hook-form';
import BaseCommandSelector from 'components/BaseCommandSelector';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Button } from 'components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SelectRelatedExample from './SelectRelatedExample';
import { defaultExample } from 'utils/default-example';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { marked } from 'marked';
import { cn } from '@/lib/utils';
import { mdStyle } from '@/utils/md-style';
import { AlertTriangle, ThumbsUp } from 'lucide-react';
import { supabaseBrowserClient } from '@/utils/supabase/create-browser-supabase-client';

export const FormSchema = z.object({
  example: z.string().min(1, {
    message: 'Hook must be at least 2 characters.',
  }),
  short_description: z.string(),
  base_command_id: z.string().uuid().min(1, {
    message: 'Base command cannot be empty',
  }),
  long_description: z.string(),
  difficulty: z.coerce
    .number()
    .min(1, { message: 'Difficulty must be between 1 and 4' })
    .max(4, { message: 'Difficulty must be between 1 and 4' }),
  draft: z.boolean(),
  specific_example: z.string(),
  editor_notes: z.string(),
  in_cheatsheet: z.boolean(),
  seo_description: z.string(),
});

export interface ExampleFormProps {
  cheat: Example | null;
  relatedExamples: Example[] | null;
}

const ExampleForm = (props: ExampleFormProps) => {
  const cheat = props.cheat ?? defaultExample;
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: cheat,
  });
  const { handleSubmit, control } = form;
  const [loading, setLoading] = useState(false);
  const supabase = supabaseBrowserClient();
  const { relatedExamples } = props;

  const { seo_description, short_description } = cheat;
  const usedSeoDescription = seo_description ?? short_description;
  const seoLengthGood =
    usedSeoDescription.length <= 160 && usedSeoDescription.length >= 110;
  const seoWarning = seoLengthGood ? (
    <ThumbsUp size={16} className="text-green-500" />
  ) : (
    <AlertTriangle size={16} className="text-yellow-500" />
  );

  const submitHandler = useCallback(
    async (values: ExampleInsert) => {
      const newExample: ExampleInsert = { ...values };
      if (cheat?.id) {
        // It's a completely new example
        newExample.id = cheat.id;
      }
      setLoading(true);
      const { error } = await supabase
        .from('examples')
        .upsert(newExample)
        .select();

      setLoading(false);

      if (error) {
        setError(error.message);
        toast.error('Error creating example');
      } else {
        const message = cheat.id ? 'Example updated' : 'Example created';
        toast.success(message);
      }
    },
    [cheat?.id, supabase],
  );

  const long_description = form.watch('long_description');

  if (error) {
    return <div className="text-red-500">{`There was an error`}</div>;
  }

  if (!cheat) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-8">
      <Form {...form}>
        <form
          className="example-form space-y-8"
          onSubmit={handleSubmit(submitHandler)}
        >
          <FormField
            control={form.control}
            name="example"
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <FormItem className="sm:flex-1">
                  <FormLabel>Example</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder="Example" {...rest} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="short_description"
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <FormItem className="sm:flex-1">
                  <FormLabel>Short description</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder="Short description"
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="div">
            <FormLabel>Long description</FormLabel>
            <Tabs defaultValue="input" className="h-[300px] overflow-auto">
              <TabsList className="grid grid-cols-2 w-[300px]">
                <TabsTrigger value="input">Input</TabsTrigger>
                <TabsTrigger value="md">Markdown</TabsTrigger>
              </TabsList>
              <TabsContent value="input">
                <FormField
                  control={form.control}
                  name="long_description"
                  render={({ field }) => {
                    const { ref, ...rest } = field;
                    return (
                      <FormItem className="sm:flex-1">
                        <FormControl>
                          <Textarea
                            autoFocus
                            placeholder="Long description"
                            rows={8}
                            {...rest}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </TabsContent>
              <TabsContent value="md" className="h-[300px] overflow-auto">
                <div
                  className={cn(`h-full p-4 bg-white text-sm rounded`, mdStyle)}
                  dangerouslySetInnerHTML={{
                    __html: marked(long_description ?? ''),
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex items-center justify-between gap-4">
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => {
                const { ref, ...rest } = field;
                return (
                  <FormItem className="sm:flex-1">
                    <FormLabel>Difficulty</FormLabel>
                    <FormControl>
                      <Input autoFocus maxLength={1} type="number" {...rest} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="draft"
              render={({ field }) => {
                const { value, onChange, ...rest } = field;
                return (
                  <FormItem className="sm:flex-1 flex flex-col">
                    <FormLabel>Is draft?</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
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
              name="in_cheatsheet"
              render={({ field }) => {
                const { value, onChange, ...rest } = field;
                return (
                  <FormItem className="sm:flex-1 flex flex-col">
                    <FormLabel>Add to cheatsheet?</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormItem className="sm:flex-1 flex flex-col">
              <FormLabel>Base command</FormLabel>
              <Controller
                name="base_command_id"
                control={control}
                render={({ field: { ref, ...restField } }) => (
                  <BaseCommandSelector {...restField} />
                )}
              />
            </FormItem>
          </div>

          <FormField
            control={form.control}
            name="specific_example"
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <FormItem className="sm:flex-1">
                  <FormLabel>Specific example</FormLabel>
                  <FormControl>
                    <Textarea autoFocus {...rest} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex gap-4 items-center justify-start">
            <Button asChild variant="outline">
              <Link
                href={`/seo-assist?id=${cheat.id}`}
                className="flex items-center gap-2"
              >
                <span>Generate SEO description</span>
                {seoWarning}
              </Link>
            </Button>
          </div>

          <FormField
            control={form.control}
            name="seo_description"
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <FormItem className="sm:flex-1">
                  <FormLabel>SEO description</FormLabel>
                  <FormControl>
                    <Textarea autoFocus {...rest} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="editor_notes"
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <FormItem className="sm:flex-1">
                  <FormLabel>Editor notes</FormLabel>
                  <FormControl>
                    <Textarea
                      autoFocus
                      placeholder="Long description"
                      rows={8}
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex items-center gap-4">
            <Button disabled={loading} type="submit">
              Save
            </Button>
            <Button asChild variant="outline">
              <Link
                href="https://app.supabase.com/project/zxejoirpyhfqhnricbdd/editor/27118"
                target="_blank"
                className="link"
              >
                Add new base command
              </Link>
            </Button>
          </div>
        </form>
        {relatedExamples && relatedExamples.length > 0 && (
          <SelectRelatedExample
            relatedExamples={relatedExamples}
            exampleId={cheat.id}
            className="my-20"
          />
        )}
      </Form>
    </div>
  );
};

export default ExampleForm;
