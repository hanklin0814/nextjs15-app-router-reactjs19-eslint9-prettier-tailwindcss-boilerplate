import { EnumValues } from './';

export const DEVICE = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
} as const;

export type DEVICE_TYPE = EnumValues<typeof DEVICE>;
