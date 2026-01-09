import './globals.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Business Web Hero',
  description: 'You get the website draft first. You launch only if you approve.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://businesswebhero.com')
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}