'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { addCheat } from 'utils/server-actions/add-cheat';
import * as z from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import toast from 'react-hot-toast';
import { Card, CardContent } from './ui/card';
import { motion } from 'framer-motion';
import { Textarea } from './ui/textarea';

interface NewCheatFormProps {
  sectionId: string;
  nextCheatPos: string;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}

export const FormSchema = z.object({
  hook: z.string().min(1, {
    message: 'Hook must be at least 2 characters.',
  }),
  description: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function NewCheatFormClient(props: NewCheatFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { nextCheatPos } = props;
  const { setShowForm, sectionId } = props;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hook: '',
      description: '',
    },
  });

  const closeForm = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowForm(false);
      }
    },
    [setShowForm],
  );

  useEffect(() => {
    document.addEventListener('keyup', closeForm);

    return () => {
      document.removeEventListener('keyup', closeForm);
    };
  }, [closeForm]);

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      const res = await addCheat({
        ...data,
        section_id: sectionId,
        position: nextCheatPos,
      });
      if (res.error) {
        console.log('res', res);
        toast.error('Something went wrong.');
        throw new Error('Something went wrong.');
      }
      toast.success('Cheat added.');
      form.reset();
      inputRef.current?.focus();
    },
    [form, sectionId, nextCheatPos],
  );

  const handleHide = useCallback(() => setShowForm(false), [setShowForm]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="print:hidden"
    >
      <div className="py-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 print:hidden"
          >
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="hook"
                render={({ field }) => {
                  const { ref, ...rest } = field;
                  return (
                    <FormItem className="sm:flex-1">
                      <FormControl>
                        <Input
                          autoFocus
                          placeholder="Hook"
                          {...rest}
                          ref={inputRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="sm:flex-1">
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Add
              </Button>
              <Button variant="outline" onClick={handleHide}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
