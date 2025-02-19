import { EnumValues } from './constants';

export const LAYOUT = {
  TYPE_A: 'A',
  TYPE_B: 'B',
  TYPE_C: 'C',
} as const;

export type LAYOUT_TYPE = EnumValues<typeof LAYOUT>;
