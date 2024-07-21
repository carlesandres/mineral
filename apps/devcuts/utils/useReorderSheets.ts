import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useReorderSheets = () => {
  // Generate positions for sheets that don't have them
  useEffect(() => {
    const fixMissingPositions = async () => {
      const resp = await fetch(`/api/populate-sheets-positions`, {
        method: 'POST',
      });
      if (resp.ok) {
        if (resp.status === 200) {
          toast.success('Sheets re-ordered');
          window.location.reload();
        }
        return;
      }
      console.log('Error upserting sheets with missing positions');
      toast.error('It may not be possible to reorder sheets at this time.');
    };

    fixMissingPositions();
  }, []);
};
