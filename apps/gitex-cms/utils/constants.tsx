import {
  Archive,
  GraduationCap,
  Bookmark,
  List,
  LucideIcon,
} from 'lucide-react';

export const levels = ['beginner', 'intermediate', 'advanced'];
export const stages = ['learning', 'learned', 'bookmarked', 'all'];

type StageToIconsMap = Record<string, LucideIcon>;

export const stageIcons: StageToIconsMap = {
  learning: GraduationCap,
  learned: Archive,
  bookmarked: Bookmark,
  all: List,
};

export const difficultyColors = ['bg-green-200', 'bg-yellow-200', 'bg-red-200'];

export type DashboardFilter =
  | 'all'
  | 'learning'
  | 'learned'
  | 'bookmarked'
  | 'beginner'
  | 'intermediate'
  | 'advanced';

type FilterToDescriptionMap = Record<DashboardFilter, string>;

export const filterDescriptions: FilterToDescriptionMap = {
  learning: 'examples to learn',
  beginner: 'beginner examples to learn',
  intermediate: 'intermediate examples to learn',
  advanced: 'advanced examples to learn',
  learned: 'learned examples',
  bookmarked: 'bookmarked examples',
  all: 'examples',
};
