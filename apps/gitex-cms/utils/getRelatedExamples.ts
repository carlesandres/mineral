import { Example } from '@/types/Example';
import { createServerSupabaseClient } from './supabase/create-server-supabase-client';
import { uniqBy } from 'lodash';

export const getRelatedExamples = async (example: Example) => {
  const { id: exampleId, base_command_id: exampleBaseCommandId } = example;
  const supabase = createServerSupabaseClient();

  const { data: relatedIds, error: idError } = await supabase
    .from('see_also')
    .select('example_id1, example_id2')
    .or(`example_id1.eq.${exampleId},example_id2.eq.${exampleId}`);

  if (idError || !relatedIds) {
    return null;
  }

  const ids = relatedIds
    .flatMap((entry) => [entry.example_id1, entry.example_id2])
    .filter((id) => id !== exampleId);

  const { data: relatedExamples, error: exampleError } = await supabase
    .from('examples')
    .select('*')
    .in('id', ids)
    .eq('draft', false);

  if (exampleError) {
    console.error('Error fetching related examples:', exampleError);
    return null;
  }

  const { data: sameBaseExamples, error: sameBaseError } = await supabase
    .from('examples')
    .select('*')
    .eq('base_command_id', exampleBaseCommandId)
    .eq('draft', false)
    .neq('id', exampleId);

  if (sameBaseError) {
    console.error('Error fetching same base examples:', sameBaseError);
    return null;
  }

  // Merge the two arrays and remove duplicates using lodash
  const relatedExamplesWithSameBase = uniqBy(
    [...relatedExamples, ...sameBaseExamples],
    'id',
  );

  const sortedRelatedExamples = relatedExamplesWithSameBase.sort((a, b) =>
    a.example.localeCompare(b.example),
  );

  return sortedRelatedExamples;
};
