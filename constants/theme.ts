import { EnumValues } from './constants';

export const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export type THEME_TYPE = EnumValues<typeof THEME>;
