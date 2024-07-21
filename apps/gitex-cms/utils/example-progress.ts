import { ExampleInsert } from '@/types/Example';
export const MAX_PROGRESS_PER_EXAMPLE = 3;

export const exampleProgress = (example: ExampleInsert): number => {
  const { short_description, long_description, difficulty, draft } = example;
  const total = MAX_PROGRESS_PER_EXAMPLE;

  let progress = 0;

  if (short_description) {
    progress += 1;
  }

  if (long_description) {
    progress += 1;
  }

  if (difficulty) {
    progress += 1;
  }

  if (draft) {
    return 0;
  }

  return progress / total;
};
