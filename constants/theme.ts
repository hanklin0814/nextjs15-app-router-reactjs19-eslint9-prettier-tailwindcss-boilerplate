import { EnumValues } from './constants';

export const THEME = {
  DARK: 'dark-theme',
  LIGHT: 'light-theme',
} as const;

export type THEME_TYPE = EnumValues<typeof THEME>;
