'use client';
import {BRAND} from '@/config/brand';

export default function WhatsAppChat(){
  const n = BRAND.whatsappNumber?.trim();
  if(!n) return null;

  const msg = encodeURIComponent("Hello, I'm contacting you from your website.");
  const phone = n.replace(/[\s()-]/g,'');
  const href = `https://wa.me/${phone}?text=${msg}`;

  return (
    <a className="waFloat" href={href} target="_blank" rel="noreferrer" aria-label="WhatsApp chat">
      WhatsApp
    </a>
  );
}
