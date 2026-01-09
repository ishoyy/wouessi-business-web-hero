'use client';
import {useTranslations} from 'next-intl';
import {BRAND} from '@/config/brand';

export default function Confidentiality(){
  const t = useTranslations('conf');
  return (
    <div className="section">
      <div className="container">
        <div className="card" style={{padding:18}}>
          <div className="badge">{t('badge')}</div>
          <h1 className="h1" style={{marginTop:12}}>{t('title')}</h1>
          <p className="muted" style={{marginTop:10}}>{t('intro')}</p>

          <h2 className="h2" style={{marginTop:18}}>{t('scopeTitle')}</h2>
          <ul className="list muted">
            <li>{t('scope1')}</li><li>{t('scope2')}</li><li>{t('scope3')}</li><li>{t('scope4')}</li>
          </ul>

          <h2 className="h2" style={{marginTop:18}}>{t('commitTitle')}</h2>
          <ul className="list muted">
            <li>{t('commit1')}</li><li>{t('commit2')}</li><li>{t('commit3')}</li>
          </ul>

          <h2 className="h2" style={{marginTop:18}}>{t('contactTitle')}</h2>
          <p className="muted">{t('contactBody')} <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a></p>

          <div className="muted" style={{fontSize:12, marginTop:18}}>{t('lastUpdate')}</div>
        </div>
      </div>
    </div>
  );
}
