import React, { useCallback, useState } from 'react';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { updateSheet } from 'utils/server-actions/update-sheet';
import toast from 'react-hot-toast';

interface SwitchSheetLayoutProps {
  numCols: number;
  sheetId: string;
}

const SwitchSheetLayout = (props: SwitchSheetLayoutProps) => {
  const { sheetId } = props;
  const [numCols, setNumCols] = useState(props.numCols);

  const handleNumColsChange = useCallback(
    async (checked: boolean) => {
      const newNumCols = checked ? 2 : 1;
      setNumCols(newNumCols);
      const res = await updateSheet({ num_cols: newNumCols }, sheetId);
      if (res.status !== 204) {
        toast.error('Something went wrong.');
        throw new Error('Something went wrong.');
      }
    },

    [sheetId],
  );

  return (
    <div className="hidden sm:flex items-center space-x-2">
      <Switch checked={numCols === 2} onCheckedChange={handleNumColsChange} />
      <Label>Show description</Label>
    </div>
  );
};

export default SwitchSheetLayout;
