import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useReorderCheats = (sectionId: string) => {
  // Generate positions for cheats that don't have them
  useEffect(() => {
    const fixMissingPositions = async () => {
      const resp = await fetch(
        `/api/populate-cheats-positions?id=${sectionId}`,
        {
          method: 'POST',
        },
      );
      if (resp.ok) {
        if (resp.status === 200) {
          toast.success('Cheats re-ordered');
          window.location.reload();
        }
        return;
      }
      console.log('Error upserting cheats with missing positions');
      toast.error('It may not be possible to reorder cheats at this time.');
    };

    fixMissingPositions();
  }, [sectionId]);
};
