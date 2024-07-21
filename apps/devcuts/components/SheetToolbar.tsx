'use client';

import { Sheet } from 'types/Sheet';
import * as z from 'zod';
import SwitchSheetLayout from './SwitchSheetLayout';
import SwitchDone from './SwitchHideDone';

interface SheetToolbarProps {
  sheet: Sheet;
}

export const FormSchema = z.object({
  hook: z.string().min(1, {
    message: 'Hook must be at least 2 characters.',
  }),
  description: z.string(),
});

export default function SheetToolbar(props: SheetToolbarProps) {
  const { sheet } = props;
  const { id: sheetId, num_cols: numCols } = sheet;

  return (
    <div className="flex w-full pb-8 gap-4 justify-end print:hidden">
      <SwitchSheetLayout numCols={numCols} sheetId={sheetId} />
      <SwitchDone sheetId={sheetId} />
    </div>
  );
}
