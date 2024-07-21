import React, { useCallback, useRef } from 'react';
import { Button } from './ui/button';
import { Form, FormField, FormItem, FormControl, FormMessage } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Cheat } from 'types/Cheat';
import { z } from 'zod';
import { updateCheat } from 'utils/server-actions/update-cheat';
import { Input } from './ui/input';
import { XCircle } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';

export const FormSchema = z.object({
  hook: z.string().min(1, {
    message: 'Hook must be at least 2 characters.',
  }),
  description: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

interface CheatEditRowProps {
  numCols: number;
  cheat: Cheat;
  onDone: () => void;
}

const CheatEditRow = (props: CheatEditRowProps) => {
  const { numCols, cheat, onDone } = props;
  const { id: cheatId } = cheat;
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hook: cheat.hook,
      description: cheat.description,
    },
  });

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      const res = await updateCheat(data, cheatId, cheat.section_id);
      if (res.status !== 204) {
        console.log('res', res);
        toast.error('Something went wrong.');
        throw new Error('Something went wrong.');
      }
      form.reset();
      inputRef.current?.focus();
      toast.success('cheat updated');
      onDone();
    },
    [form, cheatId, onDone, cheat.section_id],
  );

  return (
    <Card className="cheat-edit-row bg-gray-50 pt-6 relative">
      <CardContent className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 text-left pb-2 w-full print:hidden "
          >
            <div className="flex flex-col gap-0 sm:gap-4">
              <FormField
                control={form.control}
                name="hook"
                render={({ field }) => {
                  const { ref, ...rest } = field;
                  return (
                    <FormItem className="sm:flex-1">
                      <FormControl>
                        <Input
                          {...rest}
                          autoFocus
                          ref={inputRef}
                          placeholder="Hook"
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
                      <Textarea {...field} placeholder="Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 self-end">
                <Button type="submit" className="w-min self-end">
                  Save
                </Button>
                <Button variant="secondary" className="gap-2" onClick={onDone}>
                  <XCircle size={16} />
                  <span>Close</span>
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CheatEditRow;
