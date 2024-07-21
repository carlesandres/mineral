import React, { useCallback } from 'react';
import { updateCheat } from 'utils/server-actions/update-cheat';
import toast from 'react-hot-toast';
import { Check, Undo2 } from 'lucide-react';
import { Cheat } from 'types/Cheat';
import { getFirstAndLastCheatPos } from 'utils/server-actions/get-first-and-last-cheat-pos';
import { generateKeyBetween } from 'fractional-indexing';

interface DoneCheatButtonProps {
  cheat: Cheat;
}

const DoneCheatButton = (props: DoneCheatButtonProps) => {
  const { cheat } = props;

  const handleToggleDone = useCallback(async () => {
    const [firstPos, lastPos] = await getFirstAndLastCheatPos(cheat.section_id);
    if (!firstPos || !lastPos) {
      toast.error('Something went wrong.');
      return;
    }
    // We assume we are marrking the cheat as done, so we are putting it at the bottom of the list
    let nextPos = generateKeyBetween(lastPos, null);
    // But if we are unmarking it, we want to put it at the top of the list
    if (cheat.done) {
      nextPos = generateKeyBetween(null, firstPos);
    }
    const res = await updateCheat(
      { done: !cheat.done, position: nextPos },
      cheat.id,
      cheat.section_id,
    );
    if (res.status !== 204) {
      toast.error('Something went wrong.');
      return;
    }
    toast.success('Cheat updated.');
  }, [cheat]);

  const doneIcon = cheat.done ? <Undo2 size={12} /> : <Check size={12} />;

  return (
    <div onClick={handleToggleDone} className="flex gap-2 items-center">
      {doneIcon}
      <span>Mark as {cheat.done ? 'to-do' : 'done'}</span>
    </div>
  );
};

export default DoneCheatButton;
