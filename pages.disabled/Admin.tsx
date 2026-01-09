'use client';
import {useState} from 'react';

async function fetchJson(url:string, token:string){
  const r = await fetch(url, {headers: {'x-admin-token': token}});
  if(!r.ok) throw new Error('auth');
  return r.json();
}

export default function Admin(){
  const [token,setToken] = useState('');
  const [tab,setTab] = useState<'leads'|'payments'|'onboarding'>('leads');
  const [rows,setRows] = useState<any[]>([]);
  const [err,setErr] = useState('');

  async function load(){
    setErr('');
    try{
      const url = tab === 'leads' ? '/api/admin/leads' : tab === 'payments' ? '/api/admin/payments' : '/api/admin/onboarding';
      const data = await fetchJson(url, token);
      setRows(Array.isArray(data) ? data : []);
    }catch(e){
      setErr('Invalid token or failed to load.');
    }
  }

  return (
    <div className="section">
      <div className="container">
        <div className="card" style={{padding:18}}>
          <div className="badge">Admin</div>
          <h1 className="h1" style={{marginTop:12}}>Operations Dashboard</h1>
          <p className="muted" style={{marginTop:10}}>Token required. Set ADMIN_TOKEN on server.</p>

          <div className="card" style={{padding:14, marginTop:14}}>
            <label>Admin token</label>
            <input value={token} onChange={(e)=>setToken(e.target.value)} placeholder="ADMIN_TOKEN" />
            <div style={{display:'flex', gap:10, flexWrap:'wrap', marginTop:10}}>
              <button className="btn" onClick={()=>setTab('leads')}>Leads</button>
              <button className="btn" onClick={()=>setTab('payments')}>Payments</button>
              <button className="btn" onClick={()=>setTab('onboarding')}>Onboarding</button>
              <button className="btn btnPrimary" onClick={load}>Load</button>
            </div>
            {err ? <div className="muted" style={{marginTop:10}}>{err}</div> : null}
          </div>

          <div className="card" style={{padding:14, marginTop:14, overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead>
                <tr>
                  {rows[0] ? Object.keys(rows[0]).slice(0,12).map((k)=>(
                    <th key={k} style={{textAlign:'left', padding:'10px 8px', borderBottom:'1px solid var(--softGrey)', fontSize:12}}>{k}</th>
                  )) : <th style={{textAlign:'left', padding:'10px 8px'}}>No data</th>}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0,200).map((r,idx)=>(
                  <tr key={idx}>
                    {Object.keys(rows[0]||{}).slice(0,12).map((k)=>(
                      <td key={k} style={{padding:'10px 8px', borderBottom:'1px solid var(--softGrey)', fontSize:12}}>{String(r[k]??'')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="muted" style={{fontSize:12, marginTop:8}}>Showing up to 200 rows.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
