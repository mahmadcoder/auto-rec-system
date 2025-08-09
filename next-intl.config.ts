import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from './i18n/routing';

type Locale = typeof locales[number];

export default getRequestConfig(async ({ locale: localeParam }) => {
  // Ensure the locale is valid and cast it to Locale type
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  
  return {
    locale,
    messages: (await import(`./i18n/${locale}/messages.json`)).default
  };
});