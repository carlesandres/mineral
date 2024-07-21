import { createServerSupabaseClient } from 'utils/create-server-supabase-client';
import NewSheetFormClient from 'components/NewSheetFormClient';

interface NewSheetFormProps {
  nextSheetPos: string;
}

export async function NewSheetForm(props: NewSheetFormProps) {
  const { nextSheetPos } = props;
  const supabase = createServerSupabaseClient();
  const { data: { user } = {} } = await supabase.auth.getUser();
  const userId = user?.id;
  if (!userId) {
    return null;
  }

  return <NewSheetFormClient userId={userId} nextSheetPos={nextSheetPos} />;
}
