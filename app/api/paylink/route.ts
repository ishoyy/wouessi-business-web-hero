import {NextResponse} from 'next/server';
import {appendLead} from '@/lib/leads';

export const runtime = 'nodejs';

const map: Record<string, Record<string, string|undefined>> = {
  stripe: {
    website_starter: process.env.STRIPE_PAYMENT_LINK_WEBSITE_STARTER,
    website_growth: process.env.STRIPE_PAYMENT_LINK_WEBSITE_GROWTH,
    website_pro: process.env.STRIPE_PAYMENT_LINK_WEBSITE_PRO,
    hosting: process.env.STRIPE_PAYMENT_LINK_HOSTING,
    seo: process.env.STRIPE_PAYMENT_LINK_SEO,
    ads: process.env.STRIPE_PAYMENT_LINK_ADS
  },
  paypal: {
    website_starter: process.env.PAYPAL_LINK_WEBSITE_STARTER,
    website_growth: process.env.PAYPAL_LINK_WEBSITE_GROWTH,
    website_pro: process.env.PAYPAL_LINK_WEBSITE_PRO,
    hosting: process.env.PAYPAL_LINK_HOSTING,
    seo: process.env.PAYPAL_LINK_SEO,
    ads: process.env.PAYPAL_LINK_ADS
  }
};

export async function POST(req: Request) {
  const body = await req.json().catch(()=>null);
  if (!body) return NextResponse.json({ok:false,error:'Invalid JSON'},{status:400});

  const provider = body.provider === 'paypal' ? 'paypal' : 'stripe';
  const service = String(body.service || '').trim();
  const url = map[provider]?.[service];
  if (!url) return NextResponse.json({ok:false,error:'Missing payment link for this service'},{status:400});

  const name = String(body.name||'').trim();
  const email = String(body.email||'').trim();
  const country = String(body.country||'').trim();
  const region = String(body.region||'').trim();
  const privacyAccepted = !!body.privacyAccepted;

  if (!name || !email || !country || !region || !privacyAccepted) {
    return NextResponse.json({ok:false,error:'Missing required fields'},{status:400});
  }

  appendLead({
    createdAt: new Date().toISOString(),
    source: 'businesswebhero',
    locale: body.locale === 'fr' ? 'fr' : 'en',
    name, email,
    phone: String(body.phone||'').trim() || undefined,
    company: String(body.company||'').trim() || undefined,
    website: String(body.website||'').trim() || undefined,
    budget: String(body.budget||'').trim() || undefined,
    message: String(body.message||'').trim() || undefined,
    service: service,
    provider: provider,
    country,
    region,
    marketingConsent: !!body.marketingConsent,
    privacyAccepted: true
  } as any);

  return NextResponse.json({ok:true,url});
}
