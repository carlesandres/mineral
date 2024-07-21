import type { Sheet } from 'types/Sheet';
import type { Cheat } from 'types/Cheat';
import type { Section } from 'types/Section';

export type ExtendedSheet = Sheet & {
  sections: Section[];
  cheats: Cheat[];
};
