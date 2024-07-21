import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Sheet } from 'types/Sheet';
import { updateSheet } from 'utils/server-actions/update-sheet';
import { z } from 'zod';
import { ColorSelector } from './ColorSelector';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Switch } from './ui/switch';

export const FormSchema = z
  .object({
    title: z.string().min(1, {
      message: 'Title must be at least 2 characters.',
    }),
    color: z.string(),
    is_public: z.boolean(),
    slug: z.string(),
  })
  .refine((data) => {
    if (data.is_public && !data.slug) {
      return false;
    }
    return true;
  });

type FormValues = z.infer<typeof FormSchema>;

interface SheetEditRowProps {
  sheet: Sheet;
  onDone: () => void;
}

const SheetEditRow = (props: SheetEditRowProps) => {
  const { sheet, onDone } = props;
  const { id: sheetId } = sheet;
  const inputRef = useRef<HTMLInputElement>(null);
  const { title, color, is_public, slug } = sheet;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title,
      color,
      is_public,
      slug,
    },
  });

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      const res = await updateSheet(data, sheetId);
      if (res.status !== 204) {
        toast.error('Something went wrong.');
        throw new Error('Something went wrong.');
      }
      form.reset();
      inputRef.current?.focus();
      toast.success('Sheet updated.');
      onDone();
    },
    [form, sheetId, onDone],
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 text-left w-full print:hidden"
          >
            <div>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-end sm:space-between">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => {
                    const { ref, ...rest } = field;
                    return (
                      <FormItem className="sm:flex-1">
                        <FormControl>
                          <Input
                            {...rest}
                            autoFocus
                            ref={inputRef}
                            placeholder="Title"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="flex items-center gap-2">
                  <Controller
                    name="color"
                    control={form.control}
                    render={({ field: { ref, ...restField } }) => (
                      <ColorSelector {...restField} />
                    )}
                  />
                  <Button type="submit">Save</Button>
                  <Button variant="secondary" onClick={onDone}>
                    <span>Cancel</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="is_public"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <FormLabel>Is public?</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => {
                  return (
                    <FormItem className="flex gap-2 items-center sm:flex-1">
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!form.getValues('is_public')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SheetEditRow;
