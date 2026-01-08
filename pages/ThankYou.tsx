    'use client';
    import {useLocale, useTranslations} from 'next-intl';
    import {useEffect, useMemo, useState} from 'react';

    function qs(name: string) {
      if (typeof window === 'undefined') return '';
      const u = new URL(window.location.href);
      return u.searchParams.get(name) || '';
    }

    export default function ThankYou() {
      const t = useTranslations('thankyou');
      const locale = useLocale() as 'en'|'fr';
      const provider = useMemo(()=> (qs('provider') || '').toLowerCase(), []);
      const sessionId = useMemo(()=> qs('session_id'), []);
      const [onboardingId, setOnboardingId] = useState('');
      const [sending, setSending] = useState(false);
      const [affiliateRef, setAffiliateRef] = useState('');
      const [sent, setSent] = useState<'idle'|'ok'|'err'>('idle');

      useEffect(()=> {
        try{ const r = localStorage.getItem('wouessi_aff_ref') || ''; setAffiliateRef(r); }catch(e){}
        const id = `onboard_${Date.now()}_${Math.random().toString(16).slice(2)}`;
        setOnboardingId(id);
      }, []);

      async function submit(e:any) {
        e.preventDefault();
        setSending(true); setSent('idle');
        try {
          const form = new FormData(e.currentTarget);
          form.set('locale', locale);
          form.set('onboardingId', onboardingId);
          if (affiliateRef) form.set('affiliateRef', affiliateRef);
          if (provider) form.set('paymentProvider', provider);
          if (sessionId) form.set('stripeSessionId', sessionId);

          const r = await fetch('/api/onboarding', { method: 'POST', body: form });
          if (!r.ok) throw new Error('bad');
          setSent('ok');
          e.currentTarget.reset();
        } catch (err) {
          setSent('err');
        } finally {
          setSending(false);
        }
      }

      useEffect(()=> {
        if (!onboardingId) return;
        if (provider === 'paypal') {
          fetch('/api/payment/confirm', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ provider: 'paypal', onboardingId })
          }).catch(()=>{});
        }
        if (provider === 'stripe' && sessionId) {
          fetch('/api/payment/confirm', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ provider: 'stripe', onboardingId, stripeSessionId: sessionId })
          }).catch(()=>{});
        }
      }, [provider, sessionId, onboardingId]);

      return (
        <div className="section">
          <div className="container">
            <div className="card" style={{padding:18}}>
              <div className="badge">{t('badge')}</div>
              <h1 className="h1" style={{marginTop:12}}>{t('title')}</h1>
              <p className="muted" style={{marginTop:10}}>{t('subtitle')}</p>

              <div className="card" style={{padding:14, marginTop:14, background:'rgba(25,145,223,.06)', borderColor:'rgba(25,145,223,.18)'}}>
                <b>{t('refTitle')}</b>
                <div className="muted" style={{marginTop:6}}>{t('refBody')}</div>
                <div className="muted" style={{marginTop:10, fontSize:13}}>
                  {t('refOnboarding')} <b>{onboardingId}</b><br/>
                  {provider ? (<><span>{t('refProvider')} <b>{provider}</b></span><br/></>) : null}
                  {sessionId ? (<span>{t('refSession')} <b>{sessionId}</b></span>) : null}
                </div>
              </div>

              <div className="twoCol" style={{marginTop:16}}>
                <div className="card" style={{padding:16}}>
                  <b>{t('nextTitle')}</b>
                  <ul className="list muted" style={{marginTop:10}}>
                    <li>{t('next1')}</li>
                    <li>{t('next2')}</li>
                    <li>{t('next3')}</li>
                    <li>{t('next4')}</li>
                  </ul>
                  <div className="muted" style={{fontSize:13, marginTop:10}}>{t('note')}</div>
                </div>

                <div className="card" style={{padding:16}}>
                  <b>{t('formTitle')}</b>
                  <p className="muted" style={{marginTop:8}}>{t('formBody')}</p>

                  <form onSubmit={submit} style={{display:'grid', gap:12, marginTop:10}}>
                    <div className="row">
                      <div><label>{t('name')}</label><input name="name" required placeholder={t('namePh')} /></div>
                      <div><label>{t('email')}</label><input name="email" type="email" required placeholder={t('emailPh')} /></div>
                    </div>

                    <div className="row">
                      <div><label>{t('company')}</label><input name="company" placeholder={t('companyPh')} /></div>
                      <div><label>{t('website')}</label><input name="website" placeholder={t('websitePh')} /></div>
                    </div>

                    <div>
                      <label>{t('service')}</label>
                      <input name="service" placeholder={t('servicePh')} />
                    </div>

                    <div>
                      <label>{t('notes')}</label>
                      <textarea name="notes" rows={5} placeholder={t('notesPh')} />
                    </div>

                    <div className="row">
                      <div>
                        <label>{t('logo')}</label>
                        <input name="logo" type="file" accept="image/*" />
                      </div>
                      <div>
                        <label>{t('files')}</label>
                        <input name="files" type="file" multiple />
                      </div>
                    </div>

                    <button className="btn btnPrimary" disabled={sending} type="submit">
                      {sending ? t('sending') : t('submit')}
                    </button>

                    {sent === 'ok' ? (
                      <div className="card" style={{padding:12,borderColor:'rgba(34,197,94,.35)',background:'rgba(34,197,94,.08)'}}>
                        <b>{t('okTitle')}</b><div className="muted">{t('okBody')}</div>
                      </div>
                    ) : null}

                    {sent === 'err' ? (
                      <div className="card" style={{padding:12,borderColor:'rgba(239,68,68,.35)',background:'rgba(239,68,68,.08)'}}>
                        <b>{t('errTitle')}</b><div className="muted">{t('errBody')}</div>
                      </div>
                    ) : null}

                    <div className="muted" style={{fontSize:12}}>{t('privacy')}</div>
                  </form>
                </div>
              </div>

              <div className="card" style={{padding:16, marginTop:16}}>
                <b>{t('stripeTitle')}</b>
                <p className="muted">{t('stripeBody')}</p>
               {/*    <pre style={{whiteSpace:'pre-wrap', margin:0, padding:12, borderRadius:14, border:'1px solid var(--softGrey)', background:'#fff'}}>
https://YOURDOMAIN/thank-you?provider=stripe&session_id={CHECKOUT_SESSION_ID}
                </pre>*/}
                <p className="muted" style={{marginTop:10}}>{t('paypalTitle')}</p>
                <pre style={{whiteSpace:'pre-wrap', margin:0, padding:12, borderRadius:14, border:'1px solid var(--softGrey)', background:'#fff'}}>
https://YOURDOMAIN/thank-you?provider=paypal
                </pre>
              </div>
            </div>
          </div>
        </div>
      );
    }
