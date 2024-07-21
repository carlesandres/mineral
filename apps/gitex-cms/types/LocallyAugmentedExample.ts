import type { Example } from 'types/Example';

export interface LocallyAugmentedExample extends Example {
  archived: boolean;
  bookmarked: boolean;
}
