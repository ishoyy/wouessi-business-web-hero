import {notFound} from 'next/navigation';
import {getTranslations} from 'next-intl/server';
const CITIES = ['toronto','montreal','vancouver','calgary','ottawa','new-york','miami','houston','los-angeles','chicago'];
export default async function Page({params}:{params:{locale:string; city:string}}){
  const city = (params.city||'').toLowerCase();
  if(!CITIES.includes(city)) notFound();
  const t = await getTranslations({locale: params.locale, namespace: 'seo'});
  const pretty = city.split('-').map(s=>s[0].toUpperCase()+s.slice(1)).join(' ');
  return (
    <div className="section"><div className="container"><div className="card" style={{padding:18}}>
      <div className="badge">{t('badge')}</div>
      <h1 className="h1" style={{marginTop:12}}>{t('title', {city: pretty})}</h1>
      <p className="muted" style={{marginTop:10}}>{t('subtitle', {city: pretty})}</p>
      <div className="twoCol" style={{marginTop:16}}>
        <div className="card" style={{padding:16}}>
          <b>{t('whatTitle')}</b>
          <ul className="list muted" style={{marginTop:10}}><li>{t('f1')}</li><li>{t('f2')}</li><li>{t('f3')}</li><li>{t('f4')}</li></ul>
          <a className="btn btnPrimary" href="/services" style={{marginTop:12, display:'inline-block'}}>{t('cta')}</a>
        </div>
        <div className="card" style={{padding:16}}>
          <b>{t('whyTitle')}</b>
          <p className="muted" style={{marginTop:10}}>{t('whyBody', {city: pretty})}</p>
          <p className="muted" style={{marginTop:10}}>{t('risk')}</p>
        </div>
      </div>
    </div></div></div>
  );
}
