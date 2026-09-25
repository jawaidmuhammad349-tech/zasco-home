const fs=require('fs');const f=__dirname+'/../zasco-homepage.html';let h=fs.readFileSync(f,'utf8');
const lines=h.split('\n');
const css=[
'.stamp{position:absolute;top:18px;right:18px;display:flex;align-items:stretch;gap:14px;padding:12px 16px 12px 14px;border-radius:14px;background:rgba(19,40,48,.58);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2);border:1px solid rgba(255,255,255,.22);color:#fff;box-shadow:0 12px 30px rgba(0,0,0,.18)}',
'.stamp b{font:700 38px/.9 var(--display);letter-spacing:-.04em;font-variant-numeric:tabular-nums;align-self:center}',
'.stamp .rule{width:1px;background:rgba(255,255,255,.3)}',
'.stamp .t{display:flex;flex-direction:column;justify-content:center;gap:4px}',
'.stamp .k{font:600 10.5px/1 var(--body);letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.72)}',
'.stamp .v{font:500 14px/1.15 var(--body)}'
].join('\n');
const i=lines.findIndex(l=>l.startsWith('.stamp{'));
lines.splice(i,3,css);
h=lines.join('\n');
h=h.replace('  .stamp{width:78px;height:78px}.stamp b{font-size:22px}','  .stamp b{font-size:32px}');
h=h.replace('  .stamp{top:12px;right:12px;width:70px;height:70px}.stamp b{font-size:20px}.stamp span{font-size:8px}','  .stamp{top:12px;right:12px;padding:9px 12px 9px 11px;gap:10px;border-radius:12px}.stamp b{font-size:26px}.stamp .k{font-size:9px}.stamp .v{font-size:12px}');
h=h.replace('<div class="stamp"><div><b>400</b><span>Thread<br>count</span></div></div>','<div class="stamp"><b>400</b><span class="rule"></span><span class="t"><span class="k">Thread count</span><span class="v">Cotton percale</span></span></div>');
h=h.replace('<div class="stamp"><div><b>600</b><span>GSM<br>cotton</span></div></div>','<div class="stamp"><b>600</b><span class="rule"></span><span class="t"><span class="k">GSM weight</span><span class="v">Zero-twist terry</span></span></div>');
fs.writeFileSync(f,h);console.log((h.match(/class="rule"/g)||[]).length);
