import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default async function LocaleLayout({children}: {children: React.ReactNode}) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <div className="header"><div className="container"><Header /></div></div>
      <main>{children}</main>
      <div className="footer"><div className="container"><Footer /></div></div>
    </NextIntlClientProvider>
  );
}
