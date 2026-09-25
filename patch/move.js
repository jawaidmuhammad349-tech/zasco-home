const fs=require('fs');const f=__dirname+'/../zasco-homepage.html';let h=fs.readFileSync(f,'utf8');
const a=h.indexOf('  <!-- bento categories -->'),b=h.indexOf('  <!-- bestsellers -->');
if(a<0||b<0)throw 'miss';
const bento=h.slice(a,b);h=h.slice(0,a)+h.slice(b);
const t=h.indexOf('  <!-- trending -->'),end=h.indexOf('</main>',t);
h=h.slice(0,end)+bento.replace('class="bento"','class="bento" style="margin-top:clamp(56px,6vw,88px)"')+h.slice(end);
fs.writeFileSync(f,h);console.log('moved');
