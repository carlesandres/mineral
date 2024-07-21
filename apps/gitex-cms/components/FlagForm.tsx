'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from 'components/ui/button';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { BaseCommand } from '@/types/BaseCommand';
import { supabaseBrowserClient } from '@/utils/supabase/create-browser-supabase-client';

export const FormSchema = z.object({
  flag: z.string().min(1, {
    message: 'Flag must be at least 2 characters.',
  }),
});

type FormType = z.infer<typeof FormSchema>;

export interface FlagFormProps {
  base_command: BaseCommand;
}

const FlagForm = (props: FlagFormProps) => {
  const base_command = props.base_command;
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      flag: '',
    },
  });
  const { handleSubmit } = form;
  const [loading, setLoading] = useState(false);
  const supabase = supabaseBrowserClient();
  const router = useRouter();

  const submitHandler = useCallback(
    async (values: FormType) => {
      const finalValues = {
        ...values,
        base_command_id: base_command.id,
      };
      setLoading(true);
      const { error, data } = await supabase
        .from('command_flags')
        .insert(finalValues)
        .select();

      setLoading(false);

      if (error) {
        console.log('error', error);
        setError(error.message);
        toast.error('Error creating example');
      } else {
        const message = base_command.id ? 'Flag added' : 'Example created';
        toast.success(message);
        if (!base_command.id) {
          router.push(`/examples/${data[0].id}`);
        }
      }
    },
    [base_command?.id, supabase, router],
  );

  if (error) {
    return <div className="text-red-500">{`There was an error`}</div>;
  }

  if (!base_command) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-8">
      <Form {...form}>
        <form
          className="example-form space-y-8 border p-4 rounded-lg bg-white"
          onSubmit={handleSubmit(submitHandler)}
        >
          <FormField
            control={form.control}
            name="flag"
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <FormItem className="sm:flex-1">
                  <FormControl>
                    <Input autoFocus placeholder="Flag" {...rest} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex items-center justify-between gap-4">
            <Button disabled={loading} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FlagForm;
