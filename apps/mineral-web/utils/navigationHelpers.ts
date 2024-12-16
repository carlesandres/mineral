import { useRouter } from "next/navigation";
import { Panels } from "types/Note";

export const goToList = (searchTerm?: string) => {
  const router = useRouter();

  if (!searchTerm) {
    router.push("/notes");
    return;
  }
  const query = searchTerm ? `?search=${searchTerm}` : "";
  router.push(`/notes${query}`);
};

export const goToNewFile = () => router.push("/new");
export const goToSettings = () => router.push("/settings");
export const goToBin = () => router.push(`/bin`);
export const goBack = () => router.back();

export const goToNote = (
  noteId: string,
  panels?: Panels,
  replace: boolean = false,
) => {
  const panelsParam = panels ? `&panels=${panels}` : "";
  const notePath = `/note?id=${noteId}${panelsParam}`;
  if (replace) {
    router.replace(notePath);
    return;
  }
  router.push(notePath);
};
