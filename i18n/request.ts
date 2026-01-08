import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './config';
export default getRequestConfig(async ({locale}) => {
  const resolved = locales.includes(locale as any) ? (locale as any) : defaultLocale;
  return { locale: resolved, messages: (await import(`../messages/${resolved}.json`)).default };
});
