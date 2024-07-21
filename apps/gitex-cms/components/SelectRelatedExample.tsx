'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'react-hot-toast';
import { Example } from '@/types/Example';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RelatedExamplesList from './RelatedExamplesList';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabaseBrowserClient } from '@/utils/supabase/create-browser-supabase-client';

const FormSchema = z.object({
  relatedExample: z.string({
    required_error: 'Please select a related command.',
  }),
});

interface SelectRelatedExampleProps {
  exampleId?: Example['id'];
  relatedExamples: Example[];
  className?: string;
}

const SelectRelatedExample = (props: SelectRelatedExampleProps) => {
  const { relatedExamples, exampleId, className = '' } = props;
  const [unrelatedExamples, setUnrelatedExamples] = useState<Example[] | null>(
    null,
  );
  const supabase = supabaseBrowserClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const fetchExamples = async () => {
      const { data, error } = await supabase.from('examples').select('*');

      if (error) {
        console.error(error);
        return;
      }

      const unrelatedExamples = data.filter((example) => {
        return !relatedExamples.some(
          (relatedExample) => relatedExample.id === example.id,
        );
      });

      setUnrelatedExamples(unrelatedExamples);
    };

    fetchExamples();
  }, [relatedExamples, supabase]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      if (!exampleId) {
        toast.error('Error creating related example');
        return;
      }
      const { error } = await supabase
        .from('see_also')
        .insert({ example_id1: exampleId, example_id2: data.relatedExample });

      if (error) {
        console.error(error);
        toast.error('Error creating related example');
        return;
      }

      toast.success('Related example created');
    },
    [exampleId, supabase],
  );

  if (!unrelatedExamples) {
    return null;
  }

  const listItems = unrelatedExamples
    .sort((a, b) => a.example.localeCompare(b.example))
    .map((example) => (
      <SelectItem key={example.id} value={example.id}>
        {example.example}
      </SelectItem>
    ));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Related commands</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="relatedExample"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New related command</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a new related command" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <ScrollArea className="h-[200px]">{listItems}</ScrollArea>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <RelatedExamplesList relatedExamples={relatedExamples} />
      </CardContent>
    </Card>
  );
};

export default SelectRelatedExample;
