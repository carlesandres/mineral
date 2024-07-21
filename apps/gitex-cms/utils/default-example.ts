import { Example } from '@/types/Example';
type DefaultExample = Omit<Example, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export const defaultExample: DefaultExample = {
  example: '',
  short_description: '',
  long_description: '',
  difficulty: 1,
  draft: true,
  specific_example: '',
  editor_notes: '',
  base_command_id: '',
  learn_more: '',
  in_cheatsheet: false,
  seo_description: '',
};
