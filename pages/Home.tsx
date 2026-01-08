'use client';
import {useTranslations, useLocale} from 'next-intl';
import {useEffect, useState} from 'react';

function SectionTitle({title, subtitle}:{title:string; subtitle?:string}) {
  return (
    <div className="sectionTitle">
      <div>
        <div className="badge">{title}</div>
        {subtitle ? <div className="muted" style={{marginTop:8}}>{subtitle}</div> : null}
      </div>
    </div>
  );
}

export default function Home() {
useEffect(()=> {
  try{
    const u = new URL(window.location.href);
    const ref = u.searchParams.get('ref') || u.searchParams.get('aff') || '';
    if(ref) localStorage.setItem('wouessi_aff_ref', ref);
  }catch(e){}
}, []);

  const t = useTranslations();
  const locale = useLocale() as 'en'|'fr';
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<'idle'|'ok'|'err'>('idle');

  async function submit(e:any){
    e.preventDefault();
    setSending(true); setSent('idle');
    const form = new FormData(e.currentTarget);
    const payload:any = Object.fromEntries(form.entries());
    payload.locale = locale;
    try{
      const r = await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      if(!r.ok) throw new Error('bad');
      setSent('ok');
      e.currentTarget.reset();
    }catch(err){
      setSent('err');
    }finally{
      setSending(false);
    }
  }

  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="heroInner">
            <div>
              <div className="pill">✅ {t('hero.pill')}</div>
              
              <img src="/assets/stock/hero.svg" alt="BusinessWebHero" style={{width:"100%",height:"auto",borderRadius:16,border:"1px solid var(--softGrey)"}} />
              <p className="lead" style={{marginTop:10}}>{t('hero.subtitle')}</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:14}}>
                <a className="btn btnPrimary" href="#contact">{t('hero.primaryCta')}</a>
                <a className="btn" href="#pricing">{t('hero.secondaryCta')}</a>
              </div>
              <div className="kpi">
                <div className="card"><b>{t('hero.kpi1a')}</b><div className="muted">{t('hero.kpi1b')}</div></div>
                <div className="card"><b>{t('hero.kpi2a')}</b><div className="muted">{t('hero.kpi2b')}</div></div>
                <div className="card"><b>{t('hero.kpi3a')}</b><div className="muted">{t('hero.kpi3b')}</div></div>
              </div>
            </div>

            <div className="card" style={{padding:18}}>
              <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
                <span className="badge">{t('hero.boxTitle')}</span>
                <span className="muted">{t('hero.boxSubtitle')}</span>
              </div>
              <div className="card" style={{padding:14,marginTop:10,background:'rgba(25,145,223,.06)',borderColor:'rgba(25,145,223,.18)'}}>
                <b>{t('hero.boxLine1')}</b>
                <div className="muted" style={{marginTop:6}}>{t('hero.boxLine2')}</div>
              </div>
              <ul className="list muted" style={{marginTop:10}}>
                <li>{t('hero.boxBul1')}</li>
                <li>{t('hero.boxBul2')}</li>
                <li>{t('hero.boxBul3')}</li>
                <li>{t('hero.boxBul4')}</li>
              </ul>
              <a className="btn btnPrimary" style={{marginTop:10}} href="#contact">{t('hero.boxCta')}</a>
              <div className="muted" style={{fontSize:13,marginTop:10}}>{t('hero.boxNote')}</div>
            </div>
          </div>
        </div>
      </div>

      <div id="how" className="section">
        <div className="container">
          <SectionTitle title={t('how.badge')} subtitle={t('how.subtitle')} />
          <div className="threeCol">
            <div className="card" style={{padding:16}}><b>1) {t('how.s1t')}</b><p className="muted">{t('how.s1d')}</p></div>
            <div className="card" style={{padding:16}}><b>2) {t('how.s2t')}</b><p className="muted">{t('how.s2d')}</p></div>
            <div className="card" style={{padding:16}}><b>3) {t('how.s3t')}</b><p className="muted">{t('how.s3d')}</p></div>
          </div>
          <div className="card" style={{padding:16,marginTop:16}}><b>{t('how.promiseTitle')}</b><p className="muted">{t('how.promiseBody')}</p></div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <SectionTitle title={t('benefits.badge')} subtitle={t('benefits.subtitle')} />
          <div className="fourCol">
            {['b1','b2','b3','b4'].map((k)=>(
              <div className="card" key={k} style={{padding:16}}>
                <b>{t(`benefits.${k}t`)}</b>
                <p className="muted">{t(`benefits.${k}d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="proof" className="section">
        <div className="container">
          <SectionTitle title={t('proof.badge')} subtitle={t('proof.subtitle')} />
          <div className="twoCol">
            <div className="card" style={{padding:16}}>
              <b>{t('proof.portfolioTitle')}</b>
              <p className="muted">{t('proof.portfolioBody')}</p>
              <div className="twoCol" style={{gap:12}}>
                <div className="card" style={{padding:14}}><b>{t('proof.p1t')}</b><div className="muted">{t('proof.p1d')}</div></div>
                <div className="card" style={{padding:14}}><b>{t('proof.p2t')}</b><div className="muted">{t('proof.p2d')}</div></div>
                <div className="card" style={{padding:14}}><b>{t('proof.p3t')}</b><div className="muted">{t('proof.p3d')}</div></div>
                <div className="card" style={{padding:14}}><b>{t('proof.p4t')}</b><div className="muted">{t('proof.p4d')}</div></div>
              </div>
              <div className="muted" style={{fontSize:13,marginTop:10}}>{t('proof.portfolioNote')}</div>
            </div>
            <div className="card" style={{padding:16}}>
              <b>{t('proof.testimonialsTitle')}</b>
              <div style={{display:'grid',gap:12,marginTop:12}}>
                {['t1','t2','t3'].map((k)=>(
                  <div className="card" key={k} style={{padding:14}}>
                    <div style={{fontWeight:800}}>{t(`proof.${k}q`)}</div>
                    <div className="muted" style={{marginTop:8}}>{t(`proof.${k}a`)}</div>
                    <div className="muted" style={{marginTop:10,fontSize:13}}>{t(`proof.${k}s`)}</div>
                  </div>
                ))}
              </div>
              <div className="muted" style={{fontSize:13,marginTop:10}}>{t('proof.testimonialsNote')}</div>
            </div>
          </div>
        </div>
      </div>

      <div id="pricing" className="section">
        <div className="container">
          <SectionTitle title={t('pricing.badge')} subtitle={t('pricing.subtitle')} />
          <div className="threeCol">
            {['starter','growth','pro'].map((k)=>(
              <div className="card" key={k} style={{padding:16}}>
                <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:10}}>
                  <b style={{fontSize:18}}>{t(`pricing.${k}.name`)}</b>
                  <span className="badge">{t(`pricing.${k}.price`)}</span>
                </div>
                <p className="muted">{t(`pricing.${k}.desc`)}</p>
                <ul className="list muted">
                  {[1,2,3,4,5].map((n)=>(<li key={n}>{t(`pricing.${k}.f${n}`)}</li>))}
                </ul>
                <a className="btn btnPrimary" href="/services">{t('pricing.cta')}</a>
                <div className="muted" style={{fontSize:13,marginTop:10}}>{t(`pricing.${k}.note`)}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{padding:16,marginTop:16}}><b>{t('pricing.revenueTitle')}</b><p className="muted">{t('pricing.revenueBody')}</p></div>
        </div>
      </div>

      <div id="videos" className="section">
        <div className="container">
          <SectionTitle title={t('videos.badge')} subtitle={t('videos.subtitle')} />
          <div className="twoCol">
            {[1,2].map((i)=>(
              <div className="card" key={i} style={{padding:16}}>
                <b>{t(`videos.v${i}.title`)}</b>
                <p className="muted">{t(`videos.v${i}.desc`)}</p>
                <div className="card" style={{padding:12}}>
                  <img src={`/assets/video_poster_${i}.png`} alt="video poster" style={{width:'100%',borderRadius:14,border:'1px solid var(--softGrey)'}}/>
                  <div className="muted" style={{fontSize:13,marginTop:8}}>{t('videos.placeholder')}</div>
                  <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:10}}>
                    <a className="btn" href="/media/video_presentations.zip">{t('videos.downloadScripts')}</a>
                    <a className="btn btnPrimary" href="#contact">{t('videos.cta')}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{padding:16,marginTop:16}}><b>{t('videos.howToReplaceTitle')}</b><p className="muted">{t('videos.howToReplaceBody')}</p></div>
        </div>
      </div>

      <div id="contact" className="section">
        <div className="container">
          <SectionTitle title={t('contact.badge')} subtitle={t('contact.subtitle')} />
          <div className="twoCol">
            <div className="card" style={{padding:16}}>
              <b>{t('contact.leftTitle')}</b>
              <p className="muted">{t('contact.leftBody')}</p>
              <ul className="list muted">
                <li>{t('contact.leftBul1')}</li>
                <li>{t('contact.leftBul2')}</li>
                <li>{t('contact.leftBul3')}</li>
                <li>{t('contact.leftBul4')}</li>
              </ul>
              <div className="card" style={{padding:14}}><b>{t('contact.giveTitle')}</b><p className="muted">{t('contact.giveBody')}</p></div>
            </div>

            <div className="card" style={{padding:16}}>
              <b>{t('contact.formTitle')}</b>
              <p className="muted">{t('contact.formBody')}</p>
              <form onSubmit={submit} style={{display:'grid',gap:12,marginTop:10}}>
                <div className="row">
                  <div><label>{t('contact.name')}</label><input name="name" required placeholder={t('contact.namePh')} /></div>
                  <div><label>{t('contact.email')}</label><input name="email" type="email" required placeholder={t('contact.emailPh')} /></div>
                </div>
                <div className="row">
                  <div><label>{t('contact.phone')}</label><input name="phone" placeholder={t('contact.phonePh')} /></div>
                  <div><label>{t('contact.company')}</label><input name="company" placeholder={t('contact.companyPh')} /></div>
                </div>
                <div className="row">
                  <div><label>{t('contact.website')}</label><input name="website" placeholder={t('contact.websitePh')} /></div>
                  <div>
                    <label>{t('contact.service')}</label>
                    <select name="service">
                      <option value="">{t('contact.servicePick')}</option>
                      <option value="phase1">{t('contact.service1')}</option>
                      <option value="phase2">{t('contact.service2')}</option>
                      <option value="both">{t('contact.service3')}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label>{t('contact.budget')}</label>
                  <select name="budget">
                    <option value="">{t('contact.budgetPick')}</option>
                    <option value="starter">{t('contact.budget1')}</option>
                    <option value="sweet">{t('contact.budget2')}</option>
                    <option value="pro">{t('contact.budget3')}</option>
                  </select>
                </div>
                <div><label>{t('contact.message')}</label><textarea name="message" rows={5} placeholder={t('contact.messagePh')} /></div>
                <button className="btn btnPrimary" disabled={sending} type="submit">{sending ? t('contact.sending') : t('contact.send')}</button>
                {sent === 'ok' ? <div className="card" style={{padding:12,borderColor:'rgba(34,197,94,.35)',background:'rgba(34,197,94,.08)'}}><b>{t('contact.okTitle')}</b><div className="muted">{t('contact.okBody')}</div></div> : null}
                {sent === 'err' ? <div className="card" style={{padding:12,borderColor:'rgba(239,68,68,.35)',background:'rgba(239,68,68,.08)'}}><b>{t('contact.errTitle')}</b><div className="muted">{t('contact.errBody')}</div></div> : null}
                <div className="muted" style={{fontSize:12}}>{t('contact.privacy')}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
