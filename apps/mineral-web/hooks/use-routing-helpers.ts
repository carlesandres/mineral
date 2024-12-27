import { useRouter } from 'next/navigation';
import { Panels } from 'types/Note';

export const useRoutingHelpers = () => {
  const router = useRouter();

  const goToList = (searchTerm?: string) => {
    if (!searchTerm) {
      router.push('/notes');
      return;
    }
    const query = searchTerm ? `?search=${searchTerm}` : '';
    router.push(`/notes${query}`);
  };

  const goToNewFile = (_ev?: any) => router.push('/new');
  const goToSettings = (_ev?: any) => router.push('/settings');
  const goToBin = (_ev?: any) => router.push(`/bin`);
  const goBack = (_ev?: any) => router.back();

  const goToNote = (
    noteId: string,
    panels?: Panels,
    replace: boolean = false,
  ) => {
    const panelsParam = panels ? `&panels=${panels}` : '';
    const notePath = `/note?id=${noteId}${panelsParam}`;
    if (replace) {
      router.replace(notePath);
      return;
    }
    router.push(notePath);
  };

  return {
    goToList,
    goToNewFile,
    goToSettings,
    goToBin,
    goBack,
    goToNote,
  };
};
