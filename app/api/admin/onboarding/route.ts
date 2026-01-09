import {NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';

function ok(req: Request){
  const token = req.headers.get('x-admin-token') || '';
  return token && token === (process.env.ADMIN_TOKEN || '');
}

export async function GET(req: Request){
  if(!ok(req)) return NextResponse.json({error:'unauthorized'},{status:401});
  const p = path.join(process.cwd(),'data','onboarding.json');
  if(!fs.existsSync(p)) return NextResponse.json([]);
  try{
    return NextResponse.json(JSON.parse(fs.readFileSync(p,'utf-8') || '[]'));
  }catch(e){
    return NextResponse.json([]);
  }
}
