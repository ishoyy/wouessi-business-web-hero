'use client';
import {useTranslations} from 'next-intl';
import {BRAND} from '@/config/brand';

function IconLink({href,label}:{href:string;label:string}){
  if(!href) return null;
  return <a className="iconBtn" href={href} target="_blank" rel="noreferrer" aria-label={label}>{label}</a>;
}

export default function Footer(){
  const t = useTranslations('footer');
  const year = new Date().getFullYear();
  const c = BRAND;

  return (
    <footer className="footer">
      <div className="container footerGrid">
        <div>
          <div className="footerTitle">{t('title')}</div>
          <div className="muted" style={{marginTop:8}}>{t('subtitle')}</div>
          <div className="muted" style={{marginTop:10}}>
            <a href={`mailto:${c.supportEmail}`}>{c.supportEmail}</a>
          </div>
        </div>

        <div>
          <div className="footerTitle">{t('legal')}</div>
          <div className="footerLinks">
            <a href={c.legal.privacyPath}>{t('privacy')}</a>
            <a href={c.legal.confidentialityPath}>{t('confidentiality')}</a>
            <a href={c.legal.termsPath}>{t('terms')}</a>
          </div>
        </div>

        <div>
          <div className="footerTitle">{t('social')}</div>
          <div className="iconRow">
            <IconLink href={c.socials.linkedin} label="LinkedIn" />
            <IconLink href={c.socials.youtube} label="YouTube" />
            <IconLink href={c.socials.x} label="X" />
            <IconLink href={c.socials.instagram} label="Instagram" />
            <IconLink href={c.socials.facebook} label="Facebook" />
          </div>
        </div>
      </div>

      <div className="container" style={{paddingTop:14, paddingBottom:18}}>
        <div className="muted" style={{fontSize:12}}>
          © {year} Wouessi Inc. — {t('allRights')} · {t('traderLine')}
        </div>
      </div>
    </footer>
  );
}
