'use client';
import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
const KEY = 'wouessi_cookie_consent_v1';

export default function CookieBanner(){
  const t = useTranslations('cookie');
  const [show, setShow] = useState(false);

  useEffect(()=>{
    try{
      const v = localStorage.getItem(KEY);
      if(!v) setShow(true);
    }catch(e){}
  },[]);

  function accept(){
    try{ localStorage.setItem(KEY,'accepted'); }catch(e){}
    setShow(false);
  }

  if(!show) return null;

  return (
    <div className="cookieBar">
      <div className="container cookieInner">
        <div className="muted" style={{fontSize:13}}>
          {t('text')} <a href="/privacy">{t('learnMore')}boyyyyy</a>
        </div>
        <button className="btn btnPrimary" onClick={accept}>{t('accept')}</button>
      </div>
    </div>
  );
}
