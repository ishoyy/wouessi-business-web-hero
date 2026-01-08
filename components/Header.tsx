'use client';
import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

function switchLocalePath(pathname: string, nextLocale: 'en'|'fr') {
  const parts = (pathname||'/').split('/').filter(Boolean);
  const hasLocale = parts[0] === 'en' || parts[0] === 'fr';
  if (hasLocale) parts[0] = nextLocale; else parts.unshift(nextLocale);
  const p = '/' + parts.join('/');
  return nextLocale === 'en' ? p.replace(/^\/en(\/|$)/, '/$1') : p;
}

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as 'en'|'fr';
  const other = locale === 'en' ? 'fr' : 'en';
  const pathname = usePathname();
  const otherPath = switchLocalePath(pathname||'/', other);

  return (
    <div className="nav">
      <Link href={locale === 'en' ? '/' : '/fr'} aria-label="Business Web Hero">
        <img src="/assets/logo.png" alt="Business Web Hero logo" width="160" height="48" style={{height:48,width:'auto'}} />
      </Link>
      <div className="navLinks">
        <a href="#how">{t('how')}</a>
        <a href="#proof">{t('proof')}</a>
        <a href="/services">{t('services')}</a>
        <a href="#pricing">{t('pricing')}</a>
        <a href="#videos">{t('videos')}</a>
        <a href="#contact">{t('contact')}</a>
        <Link className="btn btnGhost" href={otherPath}>{other.toUpperCase()}</Link>
        <a className="btn btnPrimary" href="#contact">{t('cta')}</a>
      </div>
    </div>
  );
}
