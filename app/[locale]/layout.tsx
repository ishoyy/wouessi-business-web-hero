import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {locales} from '../../i18n/config';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CookieBanner from '../../components/CookieBanner';
import WhatsAppChat from '../../components/WhatsAppChat';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  if (!messages) notFound();

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      {children}
      <Footer />
      <CookieBanner />
      <WhatsAppChat />
    </NextIntlClientProvider>
  );
}