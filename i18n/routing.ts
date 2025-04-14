import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es', 'fr'] as const;
export const defaultLocale = 'en';

export const routing = {
  locales,
  defaultLocale
}; 