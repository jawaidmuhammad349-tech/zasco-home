const fs = require('fs');
const P = f => fs.readFileSync(__dirname + '/' + f, 'utf8');
const file = __dirname + '/../zasco-homepage.html';
let h = fs.readFileSync(file, 'utf8');

function cut(a, b, rep) {
  const i = h.indexOf(a), j = h.indexOf(b, i);
  if (i < 0 || j < 0) throw new Error('missing: ' + a + ' / ' + b);
  h = h.slice(0, i) + rep + h.slice(j);
}
function swap(a, b) {
  if (!h.includes(a)) throw new Error('missing: ' + a);
  h = h.split(a).join(b);
}

cut('/* ---------- hero slider ---------- */', '.btn{', P('hero.css'));
cut('@media (max-width:1280px){', '@media (prefers-reduced-motion', P('media.css').replace(
  '  header.main .wrap{grid-template-columns:1fr auto 1fr;min-height:60px}\n  .hdr-left{display:flex;align-items:center;gap:4px;justify-self:start}\n  .logo{justify-self:center}\n',
  '  header.main .wrap{grid-template-columns:1fr auto;min-height:60px}\n'));
cut('  <section class="hero"', '\n  <!-- bento categories -->', P('hero.html').trimEnd());
cut('  // slider', '  // store switch', P('hero.js'));

// header: burger + logo grouped on the left
swap('    <a class="logo" href="#" aria-label="Zasco Home">\n      <svg width="36"',
     '    <div class="hdr-left">\n    <button class="ib burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h10"/></svg></button>\n    <a class="logo" href="#" aria-label="Zasco Home">\n      <svg width="36"');
swap('      <span><b>ZASCO</b><small>HOME</small></span>\n    </a>\n    <nav class="menu"',
     '      <span><b>ZASCO</b><small>HOME</small></span>\n    </a>\n    </div>\n    <nav class="menu"');
swap('<button class="ib" aria-label="Wishlist">', '<button class="ib wish" aria-label="Wishlist">');
swap('.logo{display:flex;align-items:center;gap:10px;justify-self:start}',
     '.logo{display:flex;align-items:center;gap:10px}\n.hdr-left{display:flex;align-items:center;gap:6px;justify-self:start}');
swap('</header>', '</header>\n' + P('drawer.html').trimEnd());

// store switch updates both labels / buttons
swap("document.getElementById('storeLbl').textContent=s==='us'?'United States · USD $':'Pakistan · PKR Rs';",
     "var lbl=s==='us'?'United States · USD $':'Pakistan · PKR Rs';document.getElementById('storeLbl').textContent=lbl;document.querySelectorAll('.storeLbl').forEach(function(x){x.textContent=lbl});");
swap("document.getElementById('storeBtn').onclick=function(){setStore(body.classList.contains('us')?'pk':'us')};",
     "document.getElementById('storeBtn').onclick=document.getElementById('storeBtn2').onclick=function(){setStore(body.classList.contains('us')?'pk':'us')};");

fs.writeFileSync(file, h);
console.log('patched');
