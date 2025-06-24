export interface Panels {
  viewer: boolean;
  editor: boolean;
  toc: boolean;
}

export interface Note {
  id: string;
  title: string;
  text: string;
  deletedAt: number | null;
  createdAt: number;
  updatedAt: number | null;
  style: string;
  panels: Panels;
  wide: boolean;
  color?: string;
  showFooter: boolean;
}

export type NotePartial = Partial<Omit<Note, 'id'>>;

export type PanelsPartial = Partial<Panels>;
