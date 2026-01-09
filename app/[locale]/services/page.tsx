'use client';
import {useTranslations} from 'next-intl';
import {BRAND} from '@/config/brand';

function LinkBtn({href,label,primary}:{href:string;label:string;primary?:boolean}) {
  return <a className={`btn ${primary?'btnPrimary':''}`} href={href} target="_blank" rel="noreferrer">{label}</a>;
}

export default function Services(){
  const t = useTranslations('services');
  const plans = ['starter','growth','pro'] as const;

  return (
    <div className="section">
      <div className="container">
        <div className="card" style={{padding:18}}>
          <div className="badge">{t('badge')}</div>
          <h1 className="h1" style={{marginTop:12}}>{t('title')}</h1>
          <p className="muted" style={{marginTop:10}}>{t('subtitle')}</p>

          <div className="threeCol" style={{marginTop:16}}>
            {plans.map((p)=>(
              <div key={p} className="card" style={{padding:16}}>
                <div style={{display:'flex',justifyContent:'space-between',gap:10,alignItems:'baseline'}}>
                  <b style={{fontSize:18}}>{t(`plans.${p}.name`)}</b>
                  <span className="badge">{t(`plans.${p}.price`)}</span>
                </div>
                <p className="muted">{t(`plans.${p}.desc`)}</p>
                <ul className="list muted">
                  {[1,2,3,4,5].map((n)=>(
                    <li key={n}>{t(`plans.${p}.f${n}`)}</li>
                  ))}
                </ul>

                <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:12}}>
                  <LinkBtn primary href={t(`plans.${p}.stripeLink`)} label={t('buyStripe')} />
                  <LinkBtn href={t(`plans.${p}.paypalLink`)} label={t('buyPaypal')} />
                      {BRAND.payments.paybridge.enabled && BRAND.payments.paybridge.url ? (
                        <a className="btn" href={BRAND.payments.paybridge.url} target="_blank" rel="noreferrer">Pay with PayBridge</a>
                      ) : null}
                  <a className="btn" href="/thank-you">{t('alreadyPaid')}</a>
                </div>

                <div className="muted" style={{fontSize:13,marginTop:10}}>{t(`plans.${p}.note`)}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{padding:16, marginTop:16}}>
            <b>{t('setupTitle')}</b>
            <p className="muted">{t('setupBody')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
