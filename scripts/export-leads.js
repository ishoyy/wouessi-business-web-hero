const fs=require('fs'); const path=require('path');
const file=path.join(process.cwd(),'data','leads.json');
if(!fs.existsSync(file)){console.log('No leads file yet');process.exit(0);}
const out=path.join(process.cwd(),'data',`leads_export_${Date.now()}.json`);
fs.copyFileSync(file,out); console.log('Exported:',out);
