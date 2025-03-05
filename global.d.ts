import en from './locales/en.json';

type Messages = typeof en;

export {};

declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages;
}
