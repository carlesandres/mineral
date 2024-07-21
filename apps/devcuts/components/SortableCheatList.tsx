'use client';

import React, { useCallback, useEffect } from 'react';
import { Cheat } from 'types/Cheat';
import CheatRow from './CheatRow';
import { sortbyPos } from 'utils/sort-by-pos';
import { isEqual } from 'lodash';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { handleEnd, NodeEventData } from '@formkit/drag-and-drop';
import { upsertCheats } from 'utils/server-actions/upsert-cheats';
import { updatePosition } from 'utils/update-position';

interface SortableCheatListProps {
  cheats: Cheat[];
  canEdit: boolean;
  numCols: number;
  sectionId: string;
}

const SortableCheatList: React.FC<SortableCheatListProps> = (
  props: SortableCheatListProps,
) => {
  const { cheats, numCols, canEdit, sectionId } = props;
  const dndOptions = {
    //   draggable: (el: HTMLElement) => {
    //     // TODO: Ideally we would set a section section somewhere where we can check
    //     // if any element in the section is being edited
    //     return el.classList.contains('cheat-row');
    //   },
    //   plugins: [swap()],
    dragHandle: '.handle',
    handleEnd(data: NodeEventData<unknown>) {
      handleEnd(data);
    },
  };
  const [parent, sortedCheats, setSortedCheats] = useDragAndDrop<
    HTMLUListElement,
    Cheat
  >(cheats, dndOptions);

  const upsertSection = useCallback(
    async (cheats: Cheat[]) => {
      await upsertCheats(cheats, sectionId);
    },
    [sectionId],
  );

  useEffect(() => {
    setSortedCheats(cheats);
  }, [cheats, setSortedCheats]);

  useEffect(() => {
    const sortedByPos = [...sortedCheats].sort(sortbyPos);
    const positionsAreSorted = isEqual(sortedByPos, sortedCheats);

    if (!positionsAreSorted) {
      updatePosition(sortedCheats, upsertSection);
    }
  }, [sortedCheats, upsertSection]);

  return (
    <ul ref={parent} className="cheat-list">
      {sortedCheats.map((cheat) => (
        <CheatRow
          key={cheat.id}
          id={`${sectionId}-${cheat.id}`}
          cheat={cheat}
          canEdit={canEdit}
          numCols={numCols}
        />
      ))}
    </ul>
  );
};

export default SortableCheatList;
