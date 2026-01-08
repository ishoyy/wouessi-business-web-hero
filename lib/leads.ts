import fs from 'fs';
import path from 'path';
export type Lead = { createdAt:string; source:string; locale:'en'|'fr'; name:string; email:string; phone?:string; company?:string; website?:string; message?:string; budget?:string; service?:string; country?:string; province?:string; timeline?:string; privacyAccepted:boolean; marketingConsent?:boolean; };
const dataDir = path.join(process.cwd(), 'data');
const leadsFile = path.join(dataDir, 'leads.json');
function ensure() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, {recursive:true});
  if (!fs.existsSync(leadsFile)) fs.writeFileSync(leadsFile, JSON.stringify([]));
}
export function appendLead(lead: Lead) {
  ensure();
  const arr = JSON.parse(fs.readFileSync(leadsFile,'utf-8') || '[]');
  arr.unshift(lead);
  fs.writeFileSync(leadsFile, JSON.stringify(arr,null,2));
}
