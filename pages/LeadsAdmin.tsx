'use client';
import {useMemo, useState} from 'react';

export default function LeadsAdmin(){
  const [token,setToken]=useState('');
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState<string|undefined>();
  const [leads,setLeads]=useState<any[]>([]);

  async function load(){
    setLoading(true); setErr(undefined);
    try{
      const r = await fetch('/api/admin/leads',{headers:{'x-admin-token': token}});
      const j = await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(j.error || 'Unauthorized');
      setLeads(j.leads || []);
    }catch(e:any){ setErr(e.message || 'Error'); }
    finally{ setLoading(false); }
  }

  const rows = useMemo(()=>leads, [leads]);

  return (
    <div className="container" style={{padding:'22px 0'}}>
      <div className="card" style={{padding:16}}>
        <b style={{fontSize:20}}>Admin — Leads</b>
        <div className="muted" style={{marginTop:6}}>Use ADMIN_TOKEN. CSV export via curl header.</div>
        <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:12}}>
          <input placeholder="ADMIN_TOKEN" value={token} onChange={e=>setToken(e.target.value)} style={{maxWidth:360}} />
          <button className="btn btnPrimary" onClick={load} disabled={loading || !token}>{loading?'Loading…':'Load leads'}</button>
        </div>
        {err ? <div className="card" style={{padding:12,marginTop:12,borderColor:'rgba(239,68,68,.35)',background:'rgba(239,68,68,.08)'}}><b>Error</b><div className="muted">{err}</div></div> : null}
      </div>

      <div className="card" style={{padding:16,marginTop:14,overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead>
            <tr>
              {['createdAt','name','email','service','country','region','timeline','paymentProvider'].map(h=>(
                <th key={h} style={{textAlign:'left',padding:'10px 8px',borderBottom:'1px solid var(--softGrey)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((l,idx)=>(
              <tr key={idx}>
                {['createdAt','name','email','service','country','region','timeline','paymentProvider'].map(h=>(
                  <td key={h} style={{padding:'10px 8px',borderBottom:'1px solid var(--softGrey)'}}>{String(l[h]??'')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="muted" style={{marginTop:10,fontSize:12}}>
          CSV: <code>curl -H "x-admin-token: YOURTOKEN" https://YOURDOMAIN/api/admin/leads-csv</code>
        </div>
      </div>
    </div>
  );
}
