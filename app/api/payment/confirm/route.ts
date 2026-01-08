import {NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';

function ensureDir(p:string){ if(!fs.existsSync(p)) fs.mkdirSync(p, {recursive:true}); }

export async function POST(req: Request){
  try{
    const body = await req.json().catch(()=>null);
    if(!body) return NextResponse.json({ok:false, error:'Invalid JSON'}, {status:400});
    const onboardingId = String(body.onboardingId||'').trim();
    if(!onboardingId) return NextResponse.json({ok:false, error:'Missing onboardingId'}, {status:400});

    const dataDir = path.join(process.cwd(),'data');
    const file = path.join(dataDir,'payments.json');
    ensureDir(dataDir);
    if(!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify([]));

    const rec:any = {
      createdAt: new Date().toISOString(),
      provider: String(body.provider||'').trim(),
      onboardingId,
      stripeSessionId: String(body.stripeSessionId||'').trim(),
      note: String(body.note||'').trim()
    };
    const arr = JSON.parse(fs.readFileSync(file,'utf-8') || '[]');
    arr.unshift(rec);
    fs.writeFileSync(file, JSON.stringify(arr, null, 2));
    return NextResponse.json({ok:true});
  }catch(e:any){
    return NextResponse.json({ok:false, error:'Confirm failed'}, {status:500});
  }
}
