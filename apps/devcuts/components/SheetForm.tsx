'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import * as z from 'zod';
import { useCallback, useRef, useState } from 'react';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';
import { Sheet } from 'types/Sheet';

export const FormSchema = z
  .object({
    title: z.string().min(2, {
      message: 'Title must be at least 2 characters.',
    }),
    slug: z.string().optional(),
    is_public: z.boolean(),
  })
  .refine((data) => {
    if (data.is_public && !data.slug) {
      return false;
    }
    return true;
  });

type FormValues = z.infer<typeof FormSchema>;

interface SheetFormProps {
  sheet?: Sheet;
  onSubmit: (data: FormValues) => void;
  onClose: () => void;
}

export default function SheetForm(props: SheetFormProps) {
  const { sheet, onSubmit, onClose } = props;
  const [, setShowForm] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const defaultValues = sheet
    ? {
        slug: sheet.slug || '',
        title: sheet.title,
        is_public: Boolean(sheet.is_public),
      }
    : {
        title: '',
        slug: '',
        is_public: false,
      };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  return (
    <Card className="pb-6 bg-gray-50 mb-12">
      <CardContent className="flex mt-4 w-full gap-1 items-center">
        <div className="flex-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-left  w-full print:hidden"
            >
              <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 sm:items-end sm:space-between">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => {
                    const { ref, ...rest } = field;
                    return (
                      <FormItem className="sm:flex-1">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...rest} autoFocus ref={inputRef} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="is_public"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Is public?</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="slug"
                disabled={!form.getValues('is_public')}
                render={({ field }) => {
                  const { ref, ...rest } = field;
                  return (
                    <FormItem className="sm:flex-1">
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input {...rest} ref={inputRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="flex gap-4 justify-end w-full">
                <Button type="submit">Save</Button>
                <Button variant="outline" className="" onClick={onClose}>
                  <span className="">Close</span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
