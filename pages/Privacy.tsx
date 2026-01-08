'use client';
import {useTranslations} from 'next-intl';
import {BRAND} from '@/config/brand';

export default function Privacy(){
  const t = useTranslations('privacy');
  return (
    <div className="section">
      <div className="container">
        <div className="card" style={{padding:18}}>
          <div className="badge">{t('badge')}</div>
          <h1 className="h1" style={{marginTop:12}}>{t('title')}</h1>
          <p className="muted" style={{marginTop:10}}>{t('intro')}</p>

          <h2 className="h2" style={{marginTop:18}}>{t('collectTitle')}</h2>
          <ul className="list muted">
            <li>{t('collect1')}</li><li>{t('collect2')}</li><li>{t('collect3')}</li><li>{t('collect4')}</li>
          </ul>

          <h2 className="h2" style={{marginTop:18}}>{t('useTitle')}</h2>
          <ul className="list muted">
            <li>{t('use1')}</li><li>{t('use2')}</li><li>{t('use3')}</li>
          </ul>

          <h2 className="h2" style={{marginTop:18}}>{t('shareTitle')}</h2>
          <p className="muted">{t('shareBody')}</p>

          <h2 className="h2" style={{marginTop:18}}>{t('securityTitle')}</h2>
          <p className="muted">{t('securityBody')}</p>

          <h2 className="h2" style={{marginTop:18}}>{t('contactTitle')}</h2>
          <p className="muted">{t('contactBody')} <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a></p>

          <div className="muted" style={{fontSize:12, marginTop:18}}>{t('lastUpdate')}</div>
        </div>
      </div>
    </div>
  );
}
