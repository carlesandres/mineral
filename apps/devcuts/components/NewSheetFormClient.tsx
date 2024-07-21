'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { upsertSheet } from 'utils/server-actions/upsert-sheet';
import * as z from 'zod';
import { Profile } from 'types/Profile';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SheetForm from './SheetForm';

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

interface NewSheetFormClientProps {
  userId: Profile['id'];
  nextSheetPos: string;
}

export default function NewSheetFormClient(props: NewSheetFormClientProps) {
  const { userId, nextSheetPos } = props;
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const defaultValues = {
    title: '',
    slug: '',
    is_public: false,
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const handleClose = useCallback(() => {
    setShowForm(false);
  }, []);

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      const { ...rest } = data;
      const res = await upsertSheet([
        {
          ...rest,
          owner_id: userId,
          position: nextSheetPos,
        },
      ]);

      form.reset();
      inputRef.current?.focus();
      toast.success('Sheet added.');
      router.push(`/sheets/${res[0].id}`);
    },
    [form, userId, router, nextSheetPos],
  );

  return (
    <div className="flex flex-col w-full gap-4 align-start">
      <div className="flex w-full pb-8 ">
        <Button
          variant="secondary"
          className="flex items-center space-x-2"
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          <Plus size={16} />
          <span>New sheet</span>
        </Button>
      </div>
      {showForm && <SheetForm onSubmit={handleSubmit} onClose={handleClose} />}
    </div>
  );
}
