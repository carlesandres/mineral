import { generateKeyBetween } from 'fractional-indexing';
import toast from 'react-hot-toast';

interface Positionable {
  position: string;
}

// Check the position attribute of each positionable in the array to find the moved
// element and its new position
function findMovedElement<T extends Positionable>(positionables: T[]) {
  let movedElementIndex: number | null = null;

  for (let i = 0; i < positionables.length - 1; i++) {
    if (positionables[i].position < positionables[i + 1].position) {
      continue;
    }
    if (
      i < positionables.length - 2 &&
      positionables[i].position < positionables[i + 2].position
    ) {
      movedElementIndex = i + 1; // Next element is the moved element
      break;
    }
    if (i === positionables.length - 2) {
      movedElementIndex = i + 1; // Last element is the moved element
      break;
    }
    movedElementIndex = i; // No alternative, this is the moved element
    break;
  }

  // Typescript is not as clever as to know that movedElementIndex is never null
  return positionables[movedElementIndex as number];
}

const generateNewFractionlIndex = (
  positionables: Positionable[],
  newOrdinalIndex: number,
) => {
  let firstIndex = null as string | null;
  let secondIndex = null as string | null;
  if (newOrdinalIndex === 0) {
    secondIndex = positionables[1].position;
  } else if (newOrdinalIndex === positionables.length - 1) {
    firstIndex = positionables[newOrdinalIndex].position;
  } else {
    firstIndex = positionables[newOrdinalIndex - 1].position;
    secondIndex = positionables[newOrdinalIndex + 1].position;
  }
  return generateKeyBetween(firstIndex, secondIndex);
};

type UpdatePositionCallback<T> = (positionablesToAmend: T[]) => Promise<any>;

export const updatePosition = async <T extends Positionable>(
  positionablesToAmend: T[],
  callback: UpdatePositionCallback<T>,
) => {
  const movedElement = findMovedElement(positionablesToAmend);
  if (movedElement === null) {
    return;
  }
  const newPosition = positionablesToAmend.indexOf(movedElement);

  if (newPosition === null) {
    console.log('Error: newPosition could not be found');
    return;
  }

  try {
    const newFractionalPosition = generateNewFractionlIndex(
      positionablesToAmend,
      newPosition,
    );
    await callback([{ ...movedElement, position: newFractionalPosition }]);
  } catch (e) {
    console.log('e', e);
    console.error('Error generating new position');
    // Log an error
    toast.error('It is not possible to reorder positionables at this time.');
  }
};
