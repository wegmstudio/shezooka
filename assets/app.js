/* =====================================================================
   Afnan Fathima birthday site: shared script
   No libraries. Everything pauses when it is off screen or the tab is
   hidden, so the page stays smooth on phones.
   ===================================================================== */
(function () {
  'use strict';
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const App = (window.App = { RM, $, $$ });
  const PALETTE = ['#FF3E8A', '#FF7A33', '#FFC43D', '#12B8A6', '#3D8BFF', '#7C4DFF'];
  App.PALETTE = PALETTE;
  /* deeper versions for text on light backgrounds (readable contrast) */
  const INK_PALETTE = ['#E8257A', '#EF5A12', '#0E9E8F', '#2E6BF0', '#7444F5', '#C2186B'];
  App.INK_PALETTE = INK_PALETTE;

  /* ---------- icons (one sprite, used as <svg class="ic"><use href="#i-name"/></svg>) ---------- */
  const ICONS = {
    'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-down': '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    'arrow-up': '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'play': '<path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" fill="currentColor" stroke="none"/>',
    'music': '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    'heart': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="currentColor"/>',
    'hourglass': '<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22"/><path d="M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/>',
    'sparkles': '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>',
    'images': '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
    'cake': '<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>',
    'crown': '<path d="M11.56 3.27a.5.5 0 0 1 .88 0l2.95 5.6a1 1 0 0 0 1.52.29l4.27-3.66a.5.5 0 0 1 .8.52l-2.83 10.25a1 1 0 0 1-.96.73H5.81a1 1 0 0 1-.96-.73L2.02 6.02a.5.5 0 0 1 .8-.52l4.27 3.66a1 1 0 0 0 1.52-.29z"/><path d="M5 21h14"/>',
    'gift': '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
    'chat-heart': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M15.8 9.2a2.5 2.5 0 0 0-3.5 0l-.3.4-.35-.3a2.42 2.42 0 1 0-3.2 3.6l3.6 3.5 3.6-3.5c1.2-1.2 1.1-2.7.2-3.7"/>',
    'film': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>',
    'home': '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    'mic': '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
    'wind': '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
    'slice': '<path d="m8 14-6 6h9v-3"/><path d="M18.37 3.63 8 14l3 3L21.37 6.63a2.12 2.12 0 1 0-3-3Z"/>',
    'again': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'
  };
  (function sprite() {
    let s = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">';
    for (const k in ICONS) s += '<symbol id="i-' + k + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONS[k] + '</symbol>';
    document.body.insertAdjacentHTML('afterbegin', s + '</svg>');
  })();
  App.icon = name => '<svg class="ic" aria-hidden="true"><use href="#i-' + name + '"/></svg>';

  /* ---------- toast ---------- */
  let toastEl, toastTimer;
  App.toast = msg => {
    if (!toastEl){ toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  };

  /* ---------- reveal on scroll ---------- */
  const revealIO = 'IntersectionObserver' in window && !RM
    ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); revealIO.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' })
    : null;
  App.reveal = root => $$('.reveal', root).forEach(el => revealIO ? revealIO.observe(el) : el.classList.add('in'));
  App.reveal();

  /* when an element enters/leaves view */
  App.onView = (el, enter, leave, opts) => {
    if (!('IntersectionObserver' in window)){ enter && enter(); return; }
    new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) enter && enter(e); else leave && leave(e); }), opts || { threshold: .3 }).observe(el);
  };

  /* ---------- seeded random ---------- */
  App.rng = seed => () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };

  /* ---------- floating shapes (CSS-animated, transform only) ---------- */
  App.floaters = (el, opts) => {
    if (!el) return;
    opts = opts || {};
    const r = App.rng(opts.seed || 11), colors = opts.colors || PALETTE, shapes = opts.shapes || ['dot', 'ring', 'star', 'heart', 'pill', 'tri'];
    const n = window.innerWidth < 600 ? Math.ceil((opts.count || 12) * .6) : (opts.count || 12);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++){
      const s = document.createElement('i'), size = (opts.min || 14) + r() * ((opts.max || 46) - (opts.min || 14));
      s.className = 'fl fl-' + shapes[i % shapes.length];
      s.style.cssText = '--x:' + (r() * 96).toFixed(1) + '%;--y:' + (r() * 92).toFixed(1) + '%;--s:' + size.toFixed(0) + 'px;--c:' + colors[i % colors.length] +
        ';--dx:' + ((r() - .5) * 80).toFixed(0) + 'px;--dy:' + ((r() - .5) * 90).toFixed(0) + 'px;--rot:' + ((r() - .5) * 160).toFixed(0) + 'deg;--dur:' + (6 + r() * 7).toFixed(1) + 's;--delay:' + (-r() * 8).toFixed(1) + 's;--o:' + (opts.opacity || (.55 + r() * .4)).toFixed(2);
      frag.appendChild(s);
    }
    el.appendChild(frag);
  };

  /* ---------- multicolor letters ---------- */
  App.letters = (el, opts) => {
    opts = opts || {};
    const text = opts.text || el.textContent.trim(), colors = opts.colors || INK_PALETTE;
    el.setAttribute('aria-label', text); el.textContent = '';
    let i = opts.startIndex || 0;
    text.split(/(\s+|\|)/).forEach(part => {
      if (part === '|'){ el.appendChild(document.createElement('br')); return; }
      if (/^\s+$/.test(part)){ el.appendChild(document.createTextNode(' ')); return; }
      if (!part) return;
      const w = document.createElement('span'); w.className = 'word'; w.setAttribute('aria-hidden', 'true');
      Array.from(part).forEach(c => {
        const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; s.style.setProperty('--i', i);
        if (opts.color !== false) s.style.color = colors[i % colors.length];
        i++; w.appendChild(s);
      });
      el.appendChild(w);
    });
    return i;
  };

  /* ---------- confetti (frame-rate independent canvas) ---------- */
  App.confetti = (function () {
    let c, ctx, ps = [], raf = 0, last = 0, dpr = 1;
    function ensure(){
      if (c) return;
      c = document.createElement('canvas'); c.className = 'confetti-canvas'; c.setAttribute('aria-hidden', 'true'); document.body.appendChild(c);
      ctx = c.getContext('2d'); resize(); addEventListener('resize', resize, { passive: true });
    }
    function resize(){ dpr = Math.min(window.devicePixelRatio || 1, 2); c.width = Math.floor(innerWidth * dpr); c.height = Math.floor(innerHeight * dpr); }
    function add(x, y, n, spread, power, angle, colors){
      ensure();
      colors = colors || PALETTE.concat(['#FFFFFF']);
      for (let i = 0; i < n; i++){
        const a = angle + (Math.random() - .5) * spread, v = power * (.55 + Math.random() * .75) * dpr;
        ps.push({ x: x * dpr, y: y * dpr, vx: Math.cos(a) * v, vy: Math.sin(a) * v, w: (5 + Math.random() * 7) * dpr, h: (8 + Math.random() * 9) * dpr,
          rot: Math.random() * 6.28, vr: (Math.random() - .5) * .3, flip: Math.random() * 6.28, vf: .1 + Math.random() * .2,
          color: colors[(Math.random() * colors.length) | 0], life: 1, decay: .0035 + Math.random() * .005, round: Math.random() < .25 });
      }
      if (ps.length > 900) ps.splice(0, ps.length - 900);
      if (!raf){ last = 0; raf = requestAnimationFrame(frame); }
    }
    function frame(now){
      const dt = last ? Math.min(3, (now - last) / 16.67) : 1; last = now;
      ctx.clearRect(0, 0, c.width, c.height);
      const g = .16 * dpr * dt, fx = Math.pow(.985, dt), fy = Math.pow(.992, dt);
      for (let i = ps.length - 1; i >= 0; i--){
        const p = ps[i];
        p.vy = p.vy * fy + g; p.vx *= fx; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt; p.flip += p.vf * dt; p.life -= p.decay * dt;
        if (p.life <= 0 || p.y > c.height + 40){ ps.splice(i, 1); continue; }
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(Math.cos(p.flip), 1);
        ctx.globalAlpha = Math.min(1, p.life * 2.5); ctx.fillStyle = p.color;
        if (p.round){ ctx.beginPath(); ctx.arc(0, 0, p.w * .55, 0, 6.283); ctx.fill(); } else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (ps.length) raf = requestAnimationFrame(frame); else { raf = 0; ctx.clearRect(0, 0, c.width, c.height); }
    }
    const k = n => RM ? Math.round(n / 3) : n;
    return {
      burst(x, y, n, colors){ add(x, y, k(n || 140), Math.PI * .9, 15, -Math.PI / 2, colors); },
      cannon(colors){ const n = k(110); add(innerWidth * .1, innerHeight * .85, n, Math.PI * .45, 21, -Math.PI / 2 + .45, colors); add(innerWidth * .9, innerHeight * .85, n, Math.PI * .45, 21, -Math.PI / 2 - .45, colors); },
      rain(colors){ for (let i = 0; i < 6; i++) setTimeout(() => add(innerWidth * Math.random(), -20, k(40), Math.PI * .6, 6, Math.PI / 2, colors), i * 160); }
    };
  })();

  /* ---------- fireworks on a canvas element ---------- */
  App.fireworks = canvas => {
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = 1, scale = 1, rockets = [], sparks = [], raf = 0, last = 0, auto = false, nextAt = 0, onBoom = null;
    const G = .05, hues = [330, 42, 170, 270, 20, 200, 300];
    function resize(){
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2); W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.max(.65, Math.min(1.35, Math.min(W, H) / 700));
    }
    function launch(x, sound){
      if (!W) resize();
      const tx = x != null ? x : W * (.12 + Math.random() * .76), ty = H * (.1 + Math.random() * .3);
      rockets.push({ x: tx, y: H + 4, vx: (Math.random() - .5) * .8, vy: -Math.sqrt(2 * G * (H - ty)), hue: hues[(Math.random() * hues.length) | 0], sound });
      start();
    }
    function explode(r){
      const n = Math.round((55 + Math.random() * 55) * Math.min(1.2, scale)), power = (2.2 + Math.random() * 1.8) * scale, ring = Math.random() < .3;
      for (let i = 0; i < n; i++){
        const a = Math.random() * 6.283, sp = ring ? power * (.92 + Math.random() * .08) : power * Math.sqrt(Math.random());
        sparks.push({ x: r.x, y: r.y, px: r.x, py: r.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, decay: .011 + Math.random() * .012, hue: r.hue + Math.random() * 30 - 15, light: Math.random() < .15 ? 96 : 62 + Math.random() * 12 });
      }
      const cap = W < 600 ? 700 : 1400;
      if (sparks.length > cap) sparks.splice(0, sparks.length - cap);
      if (r.sound && onBoom) onBoom();
    }
    function frame(now){
      const dt = last ? Math.min(3, (now - last) / 16.67) : 1; last = now;
      ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,' + Math.min(1, .22 * dt) + ')'; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
      if (auto && now > nextAt){ launch(); nextAt = now + 700 + Math.random() * 900; }
      for (let i = rockets.length - 1; i >= 0; i--){
        const r = rockets[i], px = r.x, py = r.y;
        r.vy += G * dt; r.x += r.vx * dt; r.y += r.vy * dt;
        ctx.strokeStyle = 'hsla(' + r.hue + ',100%,78%,.95)'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(r.x, r.y); ctx.stroke();
        if (r.vy >= -.4){ explode(r); rockets.splice(i, 1); }
      }
      const fr = Math.pow(.975, dt);
      for (let i = sparks.length - 1; i >= 0; i--){
        const s = sparks[i]; s.px = s.x; s.py = s.y;
        s.vx *= fr; s.vy = s.vy * fr + G * .8 * dt; s.x += s.vx * dt; s.y += s.vy * dt; s.life -= s.decay * dt;
        if (s.life <= 0){ sparks.splice(i, 1); continue; }
        ctx.strokeStyle = 'hsla(' + s.hue + ',100%,' + s.light + '%,' + s.life + ')'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s.px, s.py); ctx.lineTo(s.x, s.y); ctx.stroke();
      }
      if ((auto && !document.hidden) || rockets.length || sparks.length) raf = requestAnimationFrame(frame);
      else { raf = 0; last = 0; ctx.clearRect(0, 0, W, H); }
    }
    function start(){ if (!raf){ last = 0; raf = requestAnimationFrame(frame); } }
    addEventListener('resize', () => { if (W) resize(); }, { passive: true });
    document.addEventListener('visibilitychange', () => { if (!document.hidden && auto) start(); });
    return {
      setAuto(on){ auto = on && !RM; if (auto){ if (!W) resize(); nextAt = 0; start(); } },
      volley(n){ if (!W) resize(); n = RM ? 2 : (n || 6); for (let i = 0; i < n; i++) setTimeout(() => launch(W * (.12 + (i + .5) * (.76 / n)) + (Math.random() - .5) * 40, true), i * 170); },
      onBoom(fn){ onBoom = fn; }
    };
  };

  /* ---------- tiny synthesized sounds (no files) ---------- */
  App.sfx = (function () {
    let ctx = null;
    function ensure(){ if (!ctx){ const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; ctx = new AC(); } if (ctx.state === 'suspended') ctx.resume(); return ctx; }
    function noise(len, type, f0, f1, vol){
      if (!ensure()) return;
      const t = ctx.currentTime, buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * len), ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2);
      const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      s.buffer = buf; f.type = type; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + len);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + len);
      s.connect(f); f.connect(g); g.connect(ctx.destination); s.start(t);
    }
    return {
      ensure,
      get ctx(){ return ctx; },
      pop(){ if (!ensure()) return; const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(640, t); o.frequency.exponentialRampToValueAtTime(110, t + .14); g.gain.setValueAtTime(.18, t); g.gain.exponentialRampToValueAtTime(.001, t + .17); o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + .18); },
      whoosh(){ noise(.5, 'bandpass', 1000, 600, .16); },
      slice(){ noise(.35, 'highpass', 2500, 5000, .12); },
      chime(){ if (!ensure()) return; const t = ctx.currentTime; [784, 988, 1175].forEach((f, i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0, t + i * .08); g.gain.linearRampToValueAtTime(.12, t + i * .08 + .02); g.gain.exponentialRampToValueAtTime(.001, t + i * .08 + .6); o.connect(g); g.connect(ctx.destination); o.start(t + i * .08); o.stop(t + i * .08 + .62); }); }
    };
  })();

  /* ---------- music button ---------- */
  App.music = (btn, src, opts) => {
    opts = opts || {};
    const a = new Audio(); a.preload = 'none'; a.loop = opts.loop !== false; a.src = src;
    const target = opts.volume || .7; let on = false, fadeT = 0;
    const label = btn ? btn.querySelector('.lbl') : null;
    function set(v){ on = v; if (btn){ btn.setAttribute('aria-pressed', String(v)); if (label) label.textContent = v ? (opts.on || 'Pause music') : (opts.off || 'Play music'); } }
    function fadeTo(v, ms, done){
      cancelAnimationFrame(fadeT); const from = a.volume, t0 = performance.now();
      const step = now => { const k = Math.max(0, Math.min(1, (now - t0) / ms)); a.volume = from + (v - from) * k; if (k < 1) fadeT = requestAnimationFrame(step); else if (done) done(); };
      fadeT = requestAnimationFrame(step);
    }
    const api = {
      audio: a,
      play(){ a.volume = 0; return a.play().then(() => { set(true); fadeTo(target, 700); }).catch(() => { set(false); App.toast('Tap the music button to play'); }); },
      pause(){ set(false); fadeTo(0, 300, () => a.pause()); },
      toggle(){ on ? api.pause() : api.play(); },
      duck(d){ if (on) fadeTo(d ? 0 : target, 300); },
      get playing(){ return on; }
    };
    if (btn) btn.addEventListener('click', api.toggle);
    document.addEventListener('visibilitychange', () => { if (!on) return; if (document.hidden) a.pause(); else a.play().catch(() => {}); });
    App.currentMusic = api;
    return api;
  };

  /* =====================================================================
     VIDEOS
     <video data-src="..." muted loop playsinline> inside .vtile
     Autoplay (muted) only while at least half visible, paused otherwise,
     nothing is downloaded until the video is near the screen.
     Tiles with data-group open the full-screen player with sound.
     ===================================================================== */
  let playerOpen = false;
  function ensureSrc(v){ if (!v.getAttribute('src') && v.dataset.src){ v.preload = 'metadata'; v.src = v.dataset.src + '#t=0.1'; } }
  const nearIO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ ensureSrc(e.target); nearIO.unobserve(e.target); } }), { rootMargin: '400px 0px' }) : null;
  const playIO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting && e.intersectionRatio >= .5 && !playerOpen && !document.hidden){ ensureSrc(v); const p = v.play(); if (p) p.catch(() => {}); }
    else v.pause();
  }), { threshold: [0, .5, 1] }) : null;
  const autoVids = new Set();
  App.videos = root => {
    $$('video[data-src]', root).forEach(v => {
      v.muted = true; v.setAttribute('muted', ''); v.playsInline = true;
      if (nearIO) nearIO.observe(v); else ensureSrc(v);
      if (v.hasAttribute('data-auto') && !RM && playIO){ autoVids.add(v); playIO.observe(v); }
      else if (v.hasAttribute('data-hover') && window.matchMedia('(hover: hover)').matches && !RM){
        const tile = v.closest('.vtile') || v;
        tile.addEventListener('mouseenter', () => { ensureSrc(v); v.play().catch(() => {}); });
        tile.addEventListener('mouseleave', () => v.pause());
      }
    });
    $$('[data-group]', root).forEach(t => t.addEventListener('click', () => App.player.open(t)));
  };
  document.addEventListener('visibilitychange', () => { if (document.hidden) autoVids.forEach(v => v.pause()); });

  /* full-screen video player */
  App.player = (function () {
    let el, vid, stage, list = [], pos = 0, back = null, ratio = 16 / 9;
    function build(){
      el = document.createElement('div'); el.className = 'vmodal'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Video player'); el.setAttribute('aria-hidden', 'true');
      el.innerHTML = '<div class="ov-top"><span class="ov-count"></span><button class="rbtn" data-x aria-label="Close video">' + App.icon('x') + '</button></div>' +
        '<div class="ov-stage"><video controls playsinline preload="auto"></video></div>' +
        '<div class="ov-bar"><button class="rbtn" data-prev aria-label="Previous video">' + App.icon('chevron-left') + '</button><p class="ov-title"></p><button class="rbtn" data-next aria-label="Next video">' + App.icon('chevron-right') + '</button></div>';
      document.body.appendChild(el);
      vid = $('video', el); stage = $('.ov-stage', el);
      $('[data-x]', el).addEventListener('click', close);
      $('[data-prev]', el).addEventListener('click', () => show(pos - 1));
      $('[data-next]', el).addEventListener('click', () => show(pos + 1));
      stage.addEventListener('click', e => { if (e.target === stage) close(); });
      vid.addEventListener('loadedmetadata', () => { if (vid.videoWidth) { ratio = vid.videoWidth / vid.videoHeight; fit(); } });
      vid.addEventListener('ended', () => { if (pos < list.length - 1) show(pos + 1); });
      addEventListener('resize', () => { if (playerOpen) fit(); }, { passive: true });
      document.addEventListener('keydown', e => {
        if (!playerOpen) return;
        if (e.key === 'Escape') close();
        else if (document.activeElement !== vid && e.key === 'ArrowLeft') show(pos - 1);
        else if (document.activeElement !== vid && e.key === 'ArrowRight') show(pos + 1);
      });
    }
    function fit(){
      const sw = stage.clientWidth - 24, sh = stage.clientHeight - 8;
      const flip = el.hasAttribute('data-flip');
      // For rotated (portrait) videos, the visual frame is the inverse of the native ratio
      let r = flip ? (1 / ratio) : ratio;
      let w = sw, h = w / r; if (h > sh){ h = sh; w = h * r; }
      vid.style.width = Math.floor(w) + 'px';
      vid.style.height = Math.floor(h) + 'px';
      vid.style.transform = flip ? 'rotate(90deg)' : '';
    }
    function show(i){
      pos = (i + list.length) % list.length;
      const t = list[pos];
      el.toggleAttribute('data-flip', t.classList.contains('flip'));
      ratio = parseFloat(t.dataset.ratio) || 16 / 9;
      vid.src = t.dataset.video; fit(); vid.play().catch(() => {});
      $('.ov-title', el).textContent = t.dataset.title || '';
      $('.ov-count', el).textContent = (pos + 1) + ' of ' + list.length;
      const one = list.length < 2; $('[data-prev]', el).style.visibility = one ? 'hidden' : ''; $('[data-next]', el).style.visibility = one ? 'hidden' : '';
    }
    function open(tile){
      if (!el) build();
      back = document.activeElement;
      list = $$('[data-group="' + tile.dataset.group + '"]');
      playerOpen = true; autoVids.forEach(v => v.pause()); $$('.vtile video').forEach(v => v.pause());
      if (App.currentMusic) App.currentMusic.duck(true);
      el.classList.add('open'); el.setAttribute('aria-hidden', 'false'); document.documentElement.style.overflow = 'hidden';
      show(Math.max(0, list.indexOf(tile)));
      $('[data-x]', el).focus({ preventScroll: true });
    }
    function close(){
      vid.pause(); vid.removeAttribute('src'); vid.load();
      el.classList.remove('open'); el.setAttribute('aria-hidden', 'true'); document.documentElement.style.overflow = '';
      playerOpen = false;
      if (App.currentMusic) App.currentMusic.duck(false);
      autoVids.forEach(v => { const r = v.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) v.play().catch(() => {}); });
      if (back && back.focus) back.focus({ preventScroll: true });
    }
    return { open, close };
  })();

  /* =====================================================================
     PHOTO VIEWER: any element with data-lightbox="group" (img inside)
     ===================================================================== */
  App.lightbox = (function () {
    let el, img, list = [], pos = 0, back = null, open = false;
    function build(){
      el = document.createElement('div'); el.className = 'lightbox'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Photo viewer'); el.setAttribute('aria-hidden', 'true');
      el.innerHTML = '<div class="ov-top"><span class="ov-count"></span><button class="rbtn" data-x aria-label="Close photo">' + App.icon('x') + '</button></div>' +
        '<div class="ov-stage"><img alt=""></div>' +
        '<div class="ov-bar"><button class="rbtn" data-prev aria-label="Previous photo">' + App.icon('chevron-left') + '</button><p class="ov-title"></p><button class="rbtn" data-next aria-label="Next photo">' + App.icon('chevron-right') + '</button></div>';
      document.body.appendChild(el);
      img = $('img', el);
      $('[data-x]', el).addEventListener('click', close);
      $('[data-prev]', el).addEventListener('click', () => show(pos - 1));
      $('[data-next]', el).addEventListener('click', () => show(pos + 1));
      $('.ov-stage', el).addEventListener('click', e => { if (e.target.classList.contains('ov-stage')) close(); });
      let sx = 0, sy = 0;
      el.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
      el.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) show(pos + (dx < 0 ? 1 : -1));
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) close();
      }, { passive: true });
      document.addEventListener('keydown', e => {
        if (!open) return;
        if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(pos - 1); else if (e.key === 'ArrowRight') show(pos + 1);
      });
      const fit = () => { img.style.maxWidth = (innerWidth - 24) + 'px'; img.style.maxHeight = ($('.ov-stage', el).clientHeight - 8) + 'px'; };
      addEventListener('resize', () => { if (open) fit(); }, { passive: true });
      el._fit = fit;
    }
    function show(i){
      pos = (i + list.length) % list.length;
      const t = list[pos], src = t.dataset.full || ($('img', t) || t).currentSrc || ($('img', t) || t).src;
      img.src = src; img.alt = t.dataset.caption || '';
      $('.ov-title', el).textContent = t.dataset.caption || '';
      $('.ov-count', el).textContent = (pos + 1) + ' / ' + list.length;
      const one = list.length < 2; $('[data-prev]', el).style.visibility = one ? 'hidden' : ''; $('[data-next]', el).style.visibility = one ? 'hidden' : '';
    }
    function openAt(t){
      if (!el) build();
      back = document.activeElement; list = $$('[data-lightbox="' + t.dataset.lightbox + '"]');
      el.classList.add('open'); el.setAttribute('aria-hidden', 'false'); document.documentElement.style.overflow = 'hidden'; open = true;
      el._fit(); show(Math.max(0, list.indexOf(t)));
      $('[data-x]', el).focus({ preventScroll: true });
    }
    function close(){ el.classList.remove('open'); el.setAttribute('aria-hidden', 'true'); document.documentElement.style.overflow = ''; open = false; if (back && back.focus) back.focus({ preventScroll: true }); }
    document.addEventListener('click', e => { const t = e.target.closest('[data-lightbox]'); if (t){ e.preventDefault(); openAt(t); } });
    return { open: openAt, close };
  })();

  /* =====================================================================
     JUSTIFIED ROWS: tiles keep their own shape, each row fills the width
     items: [{ el, ratio }]
     ===================================================================== */
  App.justify = (box, items, opts) => {
    opts = opts || {};
    let lastW = 0, queued = false;
    function rowsFor(W, target, gap, maxH){
      const n = items.length, best = new Array(n + 1).fill(Infinity), from = new Array(n + 1).fill(0); best[0] = 0;
      for (let j = 1; j <= n; j++){
        let sum = 0;
        for (let i = j - 1; i >= 0; i--){
          sum += items[i].ratio; const h = (W - gap * (j - i - 1)) / sum;
          if (h < 60 && i < j - 1) break;
          let cost = h < target ? 2 * Math.pow((target - h) / target, 2) : Math.pow((Math.min(h, maxH) - target) / target, 2);
          if (h > maxH) cost += Math.pow((h - maxH) / target, 2) * .5;
          if (best[i] + cost < best[j]){ best[j] = best[i] + cost; from[j] = i; }
        }
      }
      const rows = []; let j = n; while (j > 0){ const i = from[j]; rows.unshift(items.slice(i, j)); j = i; } return rows;
    }
    function layout(){
      queued = false;
      const W = box.clientWidth; if (!W) return; lastW = W;
      const gap = W < 560 ? 10 : 16, target = W < 560 ? (opts.mobile || 230) : W < 900 ? (opts.tablet || 280) : (opts.desktop || 340);
      const maxH = Math.max(target * 1.2, Math.min(innerHeight * .78, target * 2.2));
      let y = 0;
      rowsFor(W, target, gap, maxH).forEach(row => {
        const sum = row.reduce((s, it) => s + it.ratio, 0);
        let h = (W - gap * (row.length - 1)) / sum, full = true;
        if (h > maxH){ h = maxH; full = false; }
        let x = full ? 0 : (W - (sum * h + gap * (row.length - 1))) / 2;
        row.forEach((it, k) => {
          const w = full && k === row.length - 1 ? W - x : it.ratio * h;
          it.el.style.cssText += ';position:absolute;left:0;top:0;width:' + w + 'px;height:' + h + 'px;transform:translate(' + x + 'px,' + y + 'px)';
          x += w + gap;
        });
        y += h + gap;
      });
      box.style.position = 'relative'; box.style.height = Math.max(0, y - gap) + 'px';
    }
    const schedule = () => { if (!queued){ queued = true; requestAnimationFrame(layout); } };
    layout();
    if ('ResizeObserver' in window) new ResizeObserver(() => { if (box.clientWidth !== lastW) schedule(); }).observe(box);
    else addEventListener('resize', schedule, { passive: true });
    return { relayout: schedule };
  };

  /* ---------- start ---------- */
  App.videos();
})();
