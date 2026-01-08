import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

function auth(req: Request) {
  const token = req.headers.get('x-admin-token') || '';
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) return false;
  return true;
}

function csvEscape(v: any) {
  const s = String(v ?? '');
  const q = s.replace(/"/g,'""');
  return `"${q}"`;
}

export async function GET(req: Request) {
  if (!auth(req)) return new Response('Unauthorized', {status:401});
  const file = path.join(process.cwd(),'data','leads.json');
  if (!fs.existsSync(file)) return new Response('', {status:200, headers:{'content-type':'text/csv'}});
  const leads = JSON.parse(fs.readFileSync(file,'utf-8')||'[]');
  const headers = Object.keys(leads[0] || {createdAt:'',source:'',locale:'',name:'',email:''});
  const rows = [headers.map(csvEscape).join(',')];
  for (const lead of leads) rows.push(headers.map(h=>csvEscape(lead[h])).join(','));
  return new Response(rows.join('\n'), {status:200, headers:{
    'content-type':'text/csv; charset=utf-8',
    'content-disposition':'attachment; filename="leads.csv"'
  }});
}
