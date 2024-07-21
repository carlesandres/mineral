import type { Example } from 'types/Example';

export interface EditableExample extends Omit<Example, 'id'> {
  id?: string;
}
