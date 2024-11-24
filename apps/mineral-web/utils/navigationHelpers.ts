import Router from 'next/router';
import { Panels } from 'types/Note';

export const goToList = (searchTerm?: string) => {
  if (!searchTerm) {
    Router.push('/notes');
    return;
  }
  const query = searchTerm ? `?search=${searchTerm}` : '';
  Router.push(`/notes${query}`);
};

export const goToNewFile = () => Router.push('/new');
export const goToSettings = () => Router.push('/settings');
export const goToBin = () => Router.push(`/bin`);
export const goBack = () => Router.back();

export const goToNote = (
  noteId: string,
  panels?: Panels,
  replace: boolean = false
) => {
  const panelsParam = panels ? `&panels=${panels}` : '';
  const notePath = `/note?id=${noteId}${panelsParam}`;
  if (replace) {
    Router.replace(notePath);
    return;
  }
  Router.push(notePath);
};
