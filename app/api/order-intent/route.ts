import {NextResponse} from 'next/server';
import {appendLead} from '@/lib/leads';

function pickLink(provider: 'stripe'|'paypal', key: string) {
  const map: Record<string,string|undefined> = {
    website_starter: provider === 'stripe' ? process.env.STRIPE_PAYMENT_LINK_WEBSITE_STARTER : process.env.PAYPAL_LINK_WEBSITE_STARTER,
    website_growth: provider === 'stripe' ? process.env.STRIPE_PAYMENT_LINK_WEBSITE_GROWTH : process.env.PAYPAL_LINK_WEBSITE_GROWTH,
    website_pro: provider === 'stripe' ? process.env.STRIPE_PAYMENT_LINK_WEBSITE_PRO : process.env.PAYPAL_LINK_WEBSITE_PRO,
    hosting: provider === 'stripe' ? process.env.STRIPE_PAYMENT_LINK_HOSTING : process.env.PAYPAL_LINK_HOSTING,
    seo: provider === 'stripe' ? process.env.STRIPE_PAYMENT_LINK_SEO : process.env.PAYPAL_LINK_SEO,
    ads: provider === 'stripe' ? process.env.STRIPE_PAYMENT_LINK_ADS : process.env.PAYPAL_LINK_ADS,
  };
  return map[key];
}

export async function POST(req: Request) {
  const body = await req.json().catch(()=>null);
  if (!body) return NextResponse.json({ok:false,error:'Invalid JSON'},{status:400});

  const name = String(body.name||'').trim();
  const email = String(body.email||'').trim();
  const serviceKey = String(body.serviceKey||'').trim();
  const provider = (body.provider === 'paypal' ? 'paypal' : 'stripe') as 'stripe'|'paypal';

  const country = String(body.country||'').trim();
  const region = String(body.region||'').trim();
  const timeline = String(body.timeline||'').trim();
  const privacyAccepted = Boolean(body.privacyAccepted);

  if (!name || !email || !serviceKey) return NextResponse.json({ok:false,error:'Missing required'},{status:400});
  if (!privacyAccepted) return NextResponse.json({ok:false,error:'Privacy consent required'},{status:400});
  if (!country || !region || !timeline) return NextResponse.json({ok:false,error:'Country/Region/Timeline required'},{status:400});

  const link = pickLink(provider, serviceKey);
  if (!link) return NextResponse.json({ok:false,error:`Missing payment link for ${provider} / ${serviceKey}`},{status:400});

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || undefined;
  const ua = req.headers.get('user-agent') || undefined;

  appendLead({
    createdAt: new Date().toISOString(),
    source: 'businesswebhero',
    locale: body.locale === 'fr' ? 'fr' : 'en',
    name, email,
    phone: String(body.phone||'').trim() || undefined,
    company: String(body.company||'').trim() || undefined,
    website: String(body.website||'').trim() || undefined,
    message: String(body.message||'').trim() || undefined,
    budget: String(body.budget||'').trim() || undefined,
    service: serviceKey,
    country, region, timeline,
    privacyAccepted: true,
    marketingConsent: Boolean(body.marketingConsent),
    ip, ua,
    paymentProvider: provider,
    paymentLinkKey: serviceKey
  } as any);

  return NextResponse.json({ok:true, url: link});
}
