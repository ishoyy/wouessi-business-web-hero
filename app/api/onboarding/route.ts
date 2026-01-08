import {NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';

function ensureDir(p:string){ if(!fs.existsSync(p)) fs.mkdirSync(p, {recursive:true}); }

export async function POST(req: Request){
  try{
    const form = await req.formData();
    const onboardingId = String(form.get('onboardingId') || '').trim() || `onboard_${Date.now()}`;
    const locale = String(form.get('locale') || 'en') === 'fr' ? 'fr' : 'en';

    const record:any = {
      onboardingId,
      createdAt: new Date().toISOString(),
      locale,
      name: String(form.get('name')||'').trim(),
      email: String(form.get('email')||'').trim(),
      company: String(form.get('company')||'').trim(),
      website: String(form.get('website')||'').trim(),
      service: String(form.get('service')||'').trim(),
      notes: String(form.get('notes')||'').trim(),
      paymentProvider: String(form.get('paymentProvider')||'').trim(),
      stripeSessionId: String(form.get('stripeSessionId')||'').trim(),
          affiliateRef: String(form.get('affiliateRef')||'').trim()
    };

    const dataDir = path.join(process.cwd(),'data');
    const dbFile = path.join(dataDir,'onboarding.json');
    ensureDir(dataDir);
    if(!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, JSON.stringify([]));

    const folder = path.join(dataDir,'onboarding', onboardingId);
    ensureDir(folder);

    async function saveFile(field:string, f: any){
      if(!f || typeof f.arrayBuffer !== 'function') return;
      const ab = await f.arrayBuffer();
      const buf = Buffer.from(ab);
      const orig = String(f.name || 'file');
      const safe = orig.replace(/[^a-zA-Z0-9._-]/g,'_');
      const out = path.join(folder, `${field}_${safe}`);
      fs.writeFileSync(out, buf);
      (record.files ||= []).push(path.basename(out));
    }

    const logo = form.get('logo');
    if(logo && typeof (logo as any).arrayBuffer === 'function') await saveFile('logo', logo);

    const files = form.getAll('files');
    for(const f of files){
      if(f && typeof (f as any).arrayBuffer === 'function') await saveFile('asset', f);
    }

    const arr = JSON.parse(fs.readFileSync(dbFile,'utf-8') || '[]');
    arr.unshift(record);
    fs.writeFileSync(dbFile, JSON.stringify(arr, null, 2));
    return NextResponse.json({ok:true, onboardingId});
  }catch(e:any){
    return NextResponse.json({ok:false, error:'Upload failed'}, {status:500});
  }
}
