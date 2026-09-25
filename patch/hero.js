  // slider
  var hero=document.getElementById('hero'),nav=document.getElementById('heroNav');
  var slides=[].slice.call(hero.querySelectorAll('.slide')),cur=0,dots=document.getElementById('dots');
  slides.forEach(function(_,i){var b=document.createElement('button');b.setAttribute('aria-label','Go to slide '+(i+1));b.innerHTML='<i></i>';b.onclick=function(){go(i)};dots.appendChild(b)});
  function go(i){
    cur=(i+slides.length)%slides.length;
    slides.forEach(function(s,k){s.classList.toggle('on',k===cur);s.setAttribute('aria-hidden',k!==cur)});
    [].forEach.call(dots.children,function(d,k){d.classList.remove('on');d.classList.toggle('done',k<cur);if(k===cur){void d.offsetWidth;d.classList.add('on')}});
    nav.style.setProperty('--navfg',slides[cur].dataset.nav);nav.style.setProperty('--navbg',slides[cur].dataset.navbg);
    document.getElementById('cnum').textContent='0'+(cur+1);
  }
  dots.addEventListener('animationend',function(){go(cur+1)});
  document.getElementById('prev').onclick=function(){go(cur-1)};
  document.getElementById('next').onclick=function(){go(cur+1)};
  var sx=null;hero.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
  hero.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)go(cur+(dx<0?1:-1));sx=null});
  go(0);

  // mobile drawer
  var drawer=document.getElementById('drawer'),burger=document.getElementById('burger');
  function setDrawer(o){drawer.classList.toggle('open',o);drawer.setAttribute('aria-hidden',!o);burger.setAttribute('aria-expanded',o);document.body.classList.toggle('lock',o)}
  burger.onclick=function(){setDrawer(true)};
  drawer.addEventListener('click',function(e){if(e.target.closest('[data-close]'))setDrawer(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setDrawer(false)});

