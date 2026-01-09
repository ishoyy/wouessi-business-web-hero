'use client';
import {useTranslations} from 'next-intl';
export default function Partners(){
  const t = useTranslations('partners');
  return (<div className="section"><div className="container"><div className="card" style={{padding:18}}>
    <div className="badge">{t('badge')}</div>
    <h1 className="h1" style={{marginTop:12}}>{t('title')}</h1>
    <p className="muted" style={{marginTop:10}}>{t('intro')}</p>
    <div className="twoCol" style={{marginTop:16}}>
      <div className="card" style={{padding:16}}><b>{t('c1Title')}</b><p className="muted" style={{marginTop:10}}>{t('c1Body')}</p></div>
      <div className="card" style={{padding:16}}><b>{t('c2Title')}</b><p className="muted" style={{marginTop:10}}>{t('c2Body')}</p></div>
      <div className="card" style={{padding:16}}><b>{t('c3Title')}</b><p className="muted" style={{marginTop:10}}>{t('c3Body')}</p></div>
      <div className="card" style={{padding:16}}><b>{t('c4Title')}</b><p className="muted" style={{marginTop:10}}>{t('c4Body')}</p></div>
    </div>
    <div className="card" style={{padding:16, marginTop:16}}><b>{t('ctaTitle')}</b><p className="muted" style={{marginTop:10}}>{t('ctaBody')}</p>
      <a className="btn btnPrimary" href="/services" style={{marginTop:10, display:'inline-block'}}>{t('ctaBtn')}</a>
    </div>
  </div></div></div>);
}
