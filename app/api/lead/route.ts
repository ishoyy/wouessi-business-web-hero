import {NextResponse} from 'next/server';
import {appendLead} from '@/lib/leads';
import {sendLeadEmail} from '@/lib/mailer';
export async function POST(req: Request) {
  const body = await req.json().catch(()=>null);
  if (!body) return NextResponse.json({ok:false,error:'Invalid JSON'},{status:400});
  const name = String(body.name||'').trim();
  const email = String(body.email||'').trim();
  if (!name || !email) return NextResponse.json({ok:false,error:'Missing required'},{status:400});
  const lead = {
    createdAt: new Date().toISOString(),
    source: 'businesswebhero',
    locale: body.locale === 'fr' ? 'fr' : 'en',
    name, email,
    phone: String(body.phone||'').trim() || undefined,
    company: String(body.company||'').trim() || undefined,
    website: String(body.website||'').trim() || undefined,
    budget: String(body.budget||'').trim() || undefined,
    service: String(body.service||'').trim() || undefined,
    message: String(body.message||'').trim() || undefined
  };
  appendLead(lead as any);
  await sendLeadEmail(`[Lead] Business Web Hero — ${lead.name}`, `<pre>${JSON.stringify(lead,null,2)}</pre>`);
  return NextResponse.json({ok:true});
}
