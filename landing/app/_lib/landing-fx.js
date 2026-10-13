/*
 * Everything that moves on the landing page: section paging with blur
 * transitions, the background dust, the hero nebula and the morphing hero
 * particles. Ported from the single-file prototype (preview/landing-dark.html).
 *
 * initLanding() runs once the markup is on the page and returns a cleanup that
 * removes every listener, timer, animation frame and WebGL context it created,
 * so React's dev-mode double mount leaves nothing behind.
 */
import gsap from "gsap";
import * as THREE from "three";

// The shaders are fed raw sRGB colours; keep three.js from converting them to linear.
THREE.ColorManagement.enabled = false;

export function initLanding() {
  let disposed = false;
  const disposers = [];
  const on = (target, type, fn, opts) => { target.addEventListener(type, fn, opts); disposers.push(() => target.removeEventListener(type, fn, opts)); };
  const later = (fn, ms) => { const id = setTimeout(fn, ms); disposers.push(() => clearTimeout(id)); return id; };
  const every = (fn, ms) => { const id = setInterval(fn, ms); disposers.push(() => clearInterval(id)); return id; };
  const raf = (fn) => { if (!disposed) requestAnimationFrame(() => { if (!disposed) fn(); }); };

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const panels = [...document.querySelectorAll('.panel')];
  const bgs = [...document.querySelectorAll('.bg')];
  const N = panels.length;
  let current = 0, busy = false;

  // Shared state read by the 3D layer
  const scene3d = { index: 0, mouseX: 0, mouseY: 0 };
  on(window, 'pointermove', e => { scene3d.mouseX = e.clientX / innerWidth - .5; scene3d.mouseY = e.clientY / innerHeight - .5; });

  /* ---------- Rotating roles ---------- */
  const roles = [...document.querySelectorAll('#roles span')];
  let ri = 0;
  if (!reduce) every(() => {
    const prev = roles[ri];
    prev.classList.remove('is-on'); prev.classList.add('is-off');
    later(() => prev.classList.remove('is-off'), 700);
    ri = (ri + 1) % roles.length; roles[ri].classList.add('is-on');
  }, 2200);

  /* ---------- Galaxy nebula (hero background) ---------- */
  (function paintNebula() {
    const c = document.getElementById('nebula');
    if (!c) return;
    const W = 480, H = 300;
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(W, H);
    const hash = (x, y) => {
      let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0;
      h = Math.imul(h ^ (h >>> 13), 1274126177);
      return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
    };
    const noise = (x, y) => {
      const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
      const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      const a = hash(xi, yi), b = hash(xi + 1, yi), c2 = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
      return a + (b - a) * u + (c2 - a) * v + (a - b - c2 + d) * u * v;
    };
    const fbm = (x, y) => { let s = 0, amp = .5; for (let o = 0; o < 5; o++) { s += amp * noise(x, y); x *= 2.03; y *= 2.03; amp *= .5; } return s; };
    const clamp = (v) => v < 0 ? 0 : v > 1 ? 1 : v;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const xn = x / W, yn = y / H, nx = xn * 4.2, ny = yn * 2.6;
      const q = fbm(nx + 1.7, ny + 9.2);
      const d = fbm(nx + q * 1.9, ny + q * 1.9);
      // milky band rising toward the top right, where the hero shape sits
      const off = yn - (.92 - .78 * xn);
      const band = Math.exp(-(off * off) / .03);
      const dens = clamp((d - .38) / .45) * (.25 + .95 * band);
      const t = clamp((d - .5) * 2.2);
      let r = 112 + (61 - 112) * q, g = 77 + (123 - 77) * q, b = 227 + (217 - 227) * q;   // purple → blue
      r += (79 - r) * t * .6; g += (179 - g) * t * .6; b += (200 - b) * t * .6;          // → teal in the dense parts
      const hi = clamp((dens - .62) * 3);                                              // bright core wisps
      r += (235 - r) * hi; g += (230 - g) * hi; b += (255 - b) * hi;
      const k = (y * W + x) * 4;
      img.data[k] = r; img.data[k + 1] = g; img.data[k + 2] = b; img.data[k + 3] = dens * 200;
    }
    ctx.putImageData(img, 0, 0);
    // dense star dust concentrated in the band
    for (let i = 0; i < 1400; i++) {
      const x = Math.random() * W, yb = .92 - .78 * (x / W);
      const y = (Math.random() < .7 ? yb + (Math.random() - .5) * .35 : Math.random()) * H;
      ctx.fillStyle = `rgba(255,255,255,${(.15 + Math.random() * .6).toFixed(2)})`;
      ctx.fillRect(x, y, Math.random() < .08 ? 1.4 : .7, Math.random() < .08 ? 1.4 : .7);
    }
  })();

  /* ---------- Background particles: depth, random drift, unified only while scrolling ---------- */
  const dust = (() => {
    const c = document.getElementById('dust'), ctx = c.getContext('2d');
    const COLORS = ['255,255,255', '200,214,255', '165,140,255', '138,203,193', '95,211,243'];
    let W, H, dpr, parts = [];
    let flow = 0, impulse = 0;                          // vertical flow while scrolling (px/frame)
    const make = () => {
      const z = Math.pow(Math.random(), 1.6) * .95 + .05;   // most far, a few near
      const a = Math.random() * Math.PI * 2, sp = (.05 + Math.random() * .25) * (.3 + z);
      return {
        x: Math.random() * W, y: Math.random() * H, z,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        r: .35 + z * z * 2.6,
        a: .18 + z * .7,
        tw: Math.random() * Math.PI * 2,
        col: COLORS[Math.random() < .5 ? 0 : 1 + (Math.random() * 4 | 0)],
      };
    };
    const resize = () => {
      dpr = Math.min(devicePixelRatio, 2); W = innerWidth; H = innerHeight;
      c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: Math.round(Math.min(320, W * H / 5200)) }, make);
    };
    resize(); on(window, 'resize', resize);
    let t = 0;
    const frame = () => {
      t += .016;
      impulse *= .92;
      flow += (impulse - flow) * .15;
      const unify = Math.min(1, Math.abs(flow) / 1.5);   // 0 = own direction, 1 = all follow the scroll
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        const fy = flow * (.25 + p.z * 1.6);             // near particles move more (parallax)
        p.x += p.vx * (1 - unify);
        p.y += p.vy * (1 - unify) + fy;
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
        if (p.y < -40) { p.y = H + 40; p.x = Math.random() * W; } else if (p.y > H + 40) { p.y = -40; p.x = Math.random() * W; }
        const alpha = p.a * (.7 + .3 * Math.sin(t * 1.4 + p.tw));
        if (Math.abs(fy) > 1.2) {                         // fast flow: short streak
          ctx.strokeStyle = `rgba(${p.col},${(alpha * .55).toFixed(3)})`;
          ctx.lineWidth = p.r * 1.2; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x, p.y - fy * 3.5); ctx.stroke();
        }
        if (p.z > .8) {                                   // near: soft bokeh glow
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          g.addColorStop(0, `rgba(${p.col},${(alpha * .55).toFixed(3)})`);
          g.addColorStop(1, `rgba(${p.col},0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${p.col},${alpha.toFixed(3)})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        }
      }
      if (!reduce) raf(frame);
    };
    frame();
    return {
      // scroll down → everything flows up; faster scroll = faster flow
      push(dy) { if (reduce || !dy) return; impulse = Math.max(-26, Math.min(26, impulse - dy * .02)); },
      kick(dir, speed) { if (reduce) return; impulse = Math.max(-26, Math.min(26, impulse - dir * (3 + speed * 4))); },
    };
  })();

  /* ---------- Rail + segments ---------- */
  const rail = document.getElementById('rail');
  const segCount = document.getElementById('segCount');
  const segs = [...document.querySelectorAll('.segments__bar')];
  const syncUI = i => {
    rail.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-current', k === i));
    segs.forEach((s, k) => s.classList.toggle('is-done', k <= i));
    segCount.textContent = String(i + 1).padStart(2, '0');
    bgs.forEach((b, k) => b.classList.toggle('is-active', k === i));
  };

  /* ---------- Section transitions (blur out / blur in) ---------- */
  const BLUR = 'blur(18px)';
  let unlockTimer;
  function goTo(next, opts = {}) {
    if (next < 0 || next >= N || next === current || (busy && !opts.force)) return;
    const dir = next > current ? 1 : -1;
    const out = panels[current], inn = panels[next];
    busy = true;
    current = next;
    scene3d.index = next;
    syncUI(next);
    dust.kick(dir, opts.speed || 1);
    inn.querySelector('.panel__scroll').scrollTop = 0;

    if (reduce) {
      out.classList.remove('is-active'); inn.classList.add('is-active');
      busy = false; return;
    }
    panels.forEach(p => { if (p !== out && p !== inn) { gsap.killTweensOf(p); p.classList.remove('is-active'); gsap.set(p, { clearProps: 'all' }); } });
    gsap.killTweensOf([out, inn]);
    gsap.to(out, {
      opacity: 0, filter: BLUR, yPercent: -6 * dir, scale: .97, duration: .8, ease: 'power2.in',
      onComplete: () => { out.classList.remove('is-active'); gsap.set(out, { clearProps: 'all' }); },
    });
    inn.classList.add('is-active');
    gsap.fromTo(inn, { opacity: 0, filter: BLUR, yPercent: 6 * dir, scale: 1.03 },
      { opacity: 1, filter: 'blur(0px)', yPercent: 0, scale: 1, duration: 1.05, delay: .35, ease: 'power3.out',
        onComplete: () => gsap.set(inn, { clearProps: 'filter,transform' }) });
    gsap.fromTo(inn.querySelectorAll('[data-reveal]'), { y: 34 * dir, opacity: 0, filter: 'blur(8px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: .9, stagger: .06, delay: .5, ease: 'power3.out', clearProps: 'filter,transform' });
    // lock long enough to swallow trackpad inertia
    clearTimeout(unlockTimer);
    unlockTimer = later(() => { busy = false; }, 1350);
  }

  // Tall panels (small screens) scroll inside first, then the page moves on.
  const scroller = () => panels[current].querySelector('.panel__scroll');
  const canScroll = dir => {
    const s = scroller();
    if (s.scrollHeight - s.clientHeight < 4) return false;
    return dir > 0 ? s.scrollTop + s.clientHeight < s.scrollHeight - 2 : s.scrollTop > 2;
  };

  let wheelAcc = 0, wheelTimer;
  on(window, 'wheel', e => {
    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    dust.push(dy);
    if (e.target.closest && e.target.closest('.news__cards') && Math.abs(e.deltaX) > Math.abs(dy)) return;
    const dir = Math.sign(dy);
    if (canScroll(dir)) return;
    e.preventDefault();
    wheelAcc += dy;
    clearTimeout(wheelTimer); wheelTimer = later(() => { wheelAcc = 0; }, 180);
    if (!busy && Math.abs(wheelAcc) > 40) {
      goTo(current + Math.sign(wheelAcc), { speed: Math.min(Math.abs(dy) / 40, 4) });
      wheelAcc = 0;
    }
  }, { passive: false });

  let ty0 = 0, tt0 = 0, tyLast = 0, scrollAtStart = 0;
  on(window, 'touchstart', e => {
    ty0 = tyLast = e.touches[0].clientY; tt0 = performance.now();
    scrollAtStart = scroller().scrollTop;
  }, { passive: true });
  on(window, 'touchmove', e => {
    const y = e.touches[0].clientY;
    dust.push((tyLast - y) * 3); tyLast = y;
  }, { passive: true });
  on(window, 'touchend', e => {
    const dy = ty0 - e.changedTouches[0].clientY;
    const dt = Math.max(performance.now() - tt0, 1);
    if (Math.abs(dy) < 50) return;
    const dir = Math.sign(dy), s = scroller();
    // only page when the panel was already resting at that edge
    const atEdge = s.scrollHeight - s.clientHeight < 4 ||
      (dir > 0 ? scrollAtStart + s.clientHeight >= s.scrollHeight - 2 : scrollAtStart <= 2);
    if (atEdge) goTo(current + dir, { speed: Math.min(Math.abs(dy) / dt * 2.5, 4) });
  }, { passive: true });

  on(window, 'keydown', e => {
    if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { if (!canScroll(1)) { e.preventDefault(); goTo(current + 1, { speed: 1.5 }); } }
    else if (['ArrowUp', 'PageUp'].includes(e.key)) { if (!canScroll(-1)) { e.preventDefault(); goTo(current - 1, { speed: 1.5 }); } }
    else if (e.key === 'Home') goTo(0, { speed: 3 });
    else if (e.key === 'End') goTo(N - 1, { speed: 3 });
  });

  // Every [data-go] link / button jumps to its section
  on(document, 'click', e => {
    const a = e.target.closest('[data-go]');
    if (!a) return;
    e.preventDefault();
    const i = +a.dataset.go;
    goTo(i, { speed: Math.min(1 + Math.abs(i - current), 4), force: true });
  });

  /* ---------- Hero particles: one shape per section, morphing between them ---------- */
  // Each section: shape, where it sits (x/y/scale in camera units), tilt, idle spin and plexus lines.
  const STAGES = [
    { shape: 'ring',    x: 3.0, y: .4,  rx: .2,  ry: -.25, rz: 0,   s: 1,   spinY: 0,   spinZ: .05, lines: 0 },
    { shape: 'network', x: 3.3, y: 1.1, rx: .3,  ry: .5,   rz: 0,   s: .78, spinY: .12, spinZ: 0,   lines: .32 },
    { shape: 'wave',    x: 0,   y: -2.1, rx: .22, ry: 0,   rz: -.05, s: 1,  spinY: 0,   spinZ: 0,   lines: 0, full: 1 },
    { shape: 'spiral',  x: 3.4, y: .9,  rx: .1,  ry: 0,    rz: -.2, s: .95, spinY: .22, spinZ: 0,   lines: 0 },
    { shape: 'warp',    x: 0,   y: 1.7, rx: 0,   ry: 0,    rz: 0,   s: 1.25, spinY: 0,  spinZ: 0,   lines: 0 },
    { shape: 'chain',   x: -2.9, y: 1.3, rx: .55, ry: .95,  rz: .5,  s: .82, spinY: .08, spinZ: 0,   lines: 0 },
    { shape: 'galaxy',  x: 3.3, y: 1.7, rx: 1.05, ry: 0,   rz: .35, s: .82, spinY: .07, spinZ: 0,   lines: 0 },
  ];
  // Logo gradient, used by the chain shape
  const LOGO_A = '#7b5cf6', LOGO_B = '#5fd3f3';

  function initParticles() {
    const canvas = document.getElementById('webgl');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    disposers.push(() => renderer.dispose());
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, .1, 100);

    const COUNT = innerWidth < 900 ? 9000 : 16000;
    const rnd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) rnd[i] = Math.random();
    const R = Math.random, TAU = Math.PI * 2;
    const gauss = () => { let u = 0, v = 0; while (!u) u = R(); while (!v) v = R(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); };
    const col = hex => new THREE.Color(hex);
    const pick = arr => arr[(R() * arr.length) | 0];

    // shared edge lists for the network sphere (points along edges + drawn lines)
    const edgesOf = (r) => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(r, 1)).attributes.position.array;
    const outerE = edgesOf(2.4), innerE = edgesOf(1.25);
    const onEdge = (E) => { const e = (R() * E.length / 6 | 0) * 6, t = R(); return [E[e] + (E[e + 3] - E[e]) * t, E[e + 1] + (E[e + 4] - E[e + 1]) * t, E[e + 2] + (E[e + 5] - E[e + 2]) * t]; };
    const vertsOf = (E) => { const m = new Map(); for (let k = 0; k < E.length; k += 3) m.set(E[k].toFixed(3) + E[k + 1].toFixed(3) + E[k + 2].toFixed(3), [E[k], E[k + 1], E[k + 2]]); return [...m.values()]; };
    const outerV = vertsOf(outerE);

    const GEN = {
      ring(i) {          // glowing particle halo
        const k = R();
        if (k < .74) { const a = R() * TAU, r = 2.3 + gauss() * .15; return [[Math.cos(a) * r, Math.sin(a) * r, gauss() * .12], pick(['#d6e4ff', '#a9c2f2', '#ffffff', '#b9a8ff']), 1.6 + R() * 3.2]; }
        if (k < .9) { const a = R() * TAU, r = 2.3 + (R() < .55 ? 1 : -1) * Math.abs(gauss()) * .55; return [[Math.cos(a) * r, Math.sin(a) * r, gauss() * .25], pick(['#9fb7e8', '#ffffff']), .7 + R() * 1.4]; }
        const a = R() * TAU, r = Math.sqrt(R()) * 1.9; return [[Math.cos(a) * r, Math.sin(a) * r, gauss() * .2], '#4a5a92', .7 + R()];
      },
      network(i) {       // geodesic plexus sphere with a nested core
        const k = R();
        if (k < .08) { const v = pick(outerV); return [[v[0] + gauss() * .03, v[1] + gauss() * .03, v[2] + gauss() * .03], pick(['#9fe8ff', '#ffffff']), 3 + R() * 2.5]; }
        if (k < .42) return [onEdge(outerE), pick(['#4fc3ff', '#2f8fd9', '#8fdcff']), .8 + R() * 1.2];
        if (k < .58) return [onEdge(innerE), pick(['#5fd3f3', '#3aa0e0']), .7 + R()];
        if (k < .78) { const r = Math.abs(gauss()) * .45, a = R() * TAU, p = Math.acos(2 * R() - 1); return [[r * Math.sin(p) * Math.cos(a), r * Math.cos(p), r * Math.sin(p) * Math.sin(a)], pick(['#bff4ff', '#ffffff', '#5fd3f3']), 1 + R() * 2]; }
        const r = 2.5 + R() * 1.1, a = R() * TAU, p = Math.acos(2 * R() - 1);
        return [[r * Math.sin(p) * Math.cos(a), r * Math.cos(p), r * Math.sin(p) * Math.sin(a)], '#3a7fd0', .6 + R() * 1.6];
      },
      wave(i) {         // full-screen particle terrain with flowing light strands
        const h = (x, z) => .7 * Math.sin(x * .45 + z * .3) + .4 * Math.cos(z * .7 - x * .2);
        const k = R();
        if (k < .68) {
          const x = (R() - .5) * 19, z = -7 + Math.pow(R(), .8) * 10, y = h(x, z);
          const c = col('#6f82a8').lerp(col('#eef4ff'), Math.min(1, Math.max(0, (y + .6) / 1.6)) * (.45 + R() * .55));
          return [[x, y + gauss() * .03, z], c, 1.8 + R() * 2.8];
        }
        if (k < .92) {
          const st = (R() * 7) | 0, z = -4.2 + st * .85, x = (R() - .5) * 19;
          const y = h(x, z) + .35 + .28 * Math.sin(x * .8 + st * 1.7);
          return [[x, y + gauss() * .035, z + gauss() * .05], pick(['#e4f2ff', '#a9d4ff', '#ffffff', '#c3e4ff']), 2.2 + R() * 3.2];
        }
        return [[(R() - .5) * 17, -.4 + R() * 4.4, -6 + R() * 10], pick(['#ffffff', '#f3d6e0', '#c9d6ea']), 4 + R() * 9];
      },
      spiral(i) {        // S-shaped light ribbon with sparkles
        const k = R(), t = R();
        const y = (t - .5) * 5.2;
        const amp = 1.25 * (.55 + .45 * Math.sin(t * Math.PI));
        const x0 = Math.sin(t * Math.PI * 2.2) * amp, z0 = Math.cos(t * Math.PI * 2.2) * .7;
        if (k < .8) {
          const w = .38 * (Math.sin(t * Math.PI) + .25), tw = t * Math.PI * 1.6;
          const u = (R() < .5 ? -1 : 1) * Math.pow(R(), .35);   // brighter ribbon edges
          return [[x0 + Math.cos(tw) * u * w, y + gauss() * .02, z0 + Math.sin(tw) * u * w], pick(['#8f74f0', '#a58cff', '#c9b8ff', '#6a5cff']), 1.2 + R() * 2.2];
        }
        if (k < .9) return [[x0 + gauss() * .45, y + gauss() * .3, z0 + gauss() * .45], pick(['#ffffff', '#d9ccff']), 2.5 + R() * 3.5];
        return [[(R() - .5) * 5, (R() - .5) * 6, (R() - .5) * 2], '#8a7cff', .6 + R() * 1.4];
      },
      warp(i) {          // hyperspace horizon: rays streaming out from the centre
        if (R() < .16) return [[gauss() * 3.5, gauss() * .04, 0], pick(['#e6eeff', '#ffffff']), 1.6 + R() * 2.2];
        const ray = (i % 260) / 260 * TAU + gauss() * .004;
        const d = Math.pow(R(), 1.7) * 6.5;
        return [[Math.cos(ray) * d * 1.15, Math.sin(ray) * d * .5, 0], pick(['#c7d6f0', '#ffffff', '#8fb2e8', '#b9a8ff']), 1.3 + R() * 2.8];
      },
      chain(i) {         // the logo: two interlocking links, purple → cyan
        const a = R() * TAU, tube = gauss() * .14, k = i % 2;
        const x = Math.cos(a) * (1.7 + tube) * 1.3, y = Math.sin(a) * (1.7 + tube) * .78;
        const p = k ? [x + 1.15, 0, y] : [x - 1.15, y, gauss() * .1];
        const c = col(LOGO_A).lerp(col(LOGO_B), Math.min(1, Math.max(0, (p[0] + 3.4) / 6.8)));
        return [p, c, 1.7 + R() * 2.8];
      },
      galaxy(i) {        // two-armed spiral galaxy
        if (R() < .14) { const r = Math.abs(gauss()) * .32, a = R() * TAU; return [[Math.cos(a) * r, gauss() * .1, Math.sin(a) * r], pick(['#ffe2b0', '#ffffff', '#f0b070']), 1.2 + R() * 2.2]; }
        const r = Math.pow(R(), .75) * 3.3, arm = i % 2;
        const ang = r * 1.9 + arm * Math.PI + gauss() * .32 * (1.25 - r / 5);
        const c = col('#ffd9a0').lerp(col(pick(['#8f74f0', '#5fd3f3', '#4fb3a4', '#3d7bd9'])), Math.min(1, r / 1.6));
        return [[Math.cos(ang) * r, gauss() * .07 * (1 + (3.3 - r) * .35), Math.sin(ang) * r], c, 1.3 + R() * 2.6];
      },
    };

    // bake every shape once
    const baked = {};
    for (const name in GEN) {
      const P = new Float32Array(COUNT * 3), C = new Float32Array(COUNT * 3), S = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        const [p, c, s] = GEN[name](i);
        const cc = typeof c === 'string' ? col(c) : c;
        P[i * 3] = p[0]; P[i * 3 + 1] = p[1]; P[i * 3 + 2] = p[2];
        C[i * 3] = cc.r; C[i * 3 + 1] = cc.g; C[i * 3 + 2] = cc.b; S[i] = s;
      }
      baked[name] = { P, C, S, warp: name === 'warp' ? 1 : 0, wave: name === 'wave' ? 1 : 0 };
    }

    const first = baked[STAGES[0].shape];
    const aFrom = new THREE.BufferAttribute(first.P.slice(), 3), aTo = new THREE.BufferAttribute(first.P.slice(), 3);
    const cFrom = new THREE.BufferAttribute(first.C.slice(), 3), cTo = new THREE.BufferAttribute(first.C.slice(), 3);
    const sFrom = new THREE.BufferAttribute(first.S.slice(), 1), sTo = new THREE.BufferAttribute(first.S.slice(), 1);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', aFrom); geo.setAttribute('aTo', aTo);
    geo.setAttribute('aColFrom', cFrom); geo.setAttribute('aColTo', cTo);
    geo.setAttribute('aSizeFrom', sFrom); geo.setAttribute('aSizeTo', sTo);
    geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 10);

    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uMix: { value: 1 }, uWarpFrom: { value: 0 }, uWarpTo: { value: 0 }, uWaveFrom: { value: 0 }, uWaveTo: { value: 0 }, uPixel: { value: renderer.getPixelRatio() } },
      vertexShader: `
        attribute vec3 aTo, aColFrom, aColTo; attribute float aSizeFrom, aSizeTo, aRand;
        uniform float uTime, uMix, uWarpFrom, uWarpTo, uWaveFrom, uWaveTo, uPixel;
        varying vec3 vColor; varying float vAlpha;
        void main() {
          float m = clamp((uMix - aRand * .35) / .65, 0., 1.);
          m = m * m * (3. - 2. * m);
          vec3 p = mix(position, aTo, m);
          float bump = sin(3.14159 * m);                       // swirl while travelling
          p += vec3(sin(aRand * 40. + uTime), cos(aRand * 31. + uTime * 1.3), sin(aRand * 17. + uTime * .7)) * bump * .9;
          p += vec3(sin(uTime * .8 + aRand * 30.), cos(uTime * .6 + aRand * 20.), sin(uTime * .5 + aRand * 10.)) * .025;
          float wave = mix(uWaveFrom, uWaveTo, m);              // rolling surface
          p.y += wave * (.28 * sin(p.x * .6 + uTime * .6) + .22 * cos(p.z * .9 + uTime * .45));
          float warp = mix(uWarpFrom, uWarpTo, m);
          float fade = 1.;
          if (warp > 0.) {                                      // stream outward from the horizon
            float f = fract(uTime * .1 + aRand * 7.);
            p.xy = mix(p.xy, p.xy * (.04 + f * 1.6), warp);
            fade = mix(1., smoothstep(0., .12, f) * (1. - f * .4), warp);
          }
          vec4 mv = modelViewMatrix * vec4(p, 1.);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = mix(aSizeFrom, aSizeTo, m) * uPixel * (7. / -mv.z);
          vColor = mix(aColFrom, aColTo, m);
          vAlpha = (.55 + .45 * sin(uTime * 1.5 + aRand * 20.)) * fade;
        }`,
      fragmentShader: `
        varying vec3 vColor; varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - .5);
          if (d > .5) discard;
          gl_FragColor = vec4(vColor, pow(smoothstep(.5, 0., d), 1.5) * vAlpha * .9);
        }`,
    });

    const group = new THREE.Group(), inner = new THREE.Group();
    inner.add(new THREE.Points(geo, mat));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x3fa9e0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    for (const E of [outerE, innerE]) {
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(E, 3));
      inner.add(new THREE.LineSegments(g, lineMat));
    }
    group.add(inner); scene.add(group);

    const resize = () => {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight; camera.position.z = innerWidth < 900 ? 14 : 10; camera.updateProjectionMatrix();
    };
    resize(); on(window, 'resize', resize);

    // retarget: freeze the current in-between state as the new "from", then morph to the next shape
    const ease = (u, r) => { let m = Math.min(1, Math.max(0, (u - r * .35) / .65)); return m * m * (3 - 2 * m); };
    let mixTween;
    const morphTo = (name) => {
      const tgt = baked[name], u = mat.uniforms.uMix.value;
      const F = aFrom.array, T = aTo.array, CF = cFrom.array, CT = cTo.array, SF = sFrom.array, ST = sTo.array;
      for (let i = 0; i < COUNT; i++) {
        const m = ease(u, rnd[i]);
        for (let j = 0; j < 3; j++) {
          const k = i * 3 + j;
          F[k] += (T[k] - F[k]) * m; T[k] = tgt.P[k];
          CF[k] += (CT[k] - CF[k]) * m; CT[k] = tgt.C[k];
        }
        SF[i] += (ST[i] - SF[i]) * m; ST[i] = tgt.S[i];
      }
      [aFrom, aTo, cFrom, cTo, sFrom, sTo].forEach(a => { a.needsUpdate = true; });
      const U = mat.uniforms;
      U.uWarpFrom.value = U.uWarpFrom.value + (U.uWarpTo.value - U.uWarpFrom.value) * u;
      U.uWarpTo.value = tgt.warp;
      U.uWaveFrom.value = U.uWaveFrom.value + (U.uWaveTo.value - U.uWaveFrom.value) * u;
      U.uWaveTo.value = tgt.wave;
      U.uMix.value = 0;
      if (mixTween) mixTween.kill();
      mixTween = gsap.to(U.uMix, { value: 1, duration: reduce ? 0 : 2, ease: 'power2.inOut' });
    };

    const pose = { ...STAGES[0], full: 0 };
    let shown = 0, spinY = 0, spinZ = 0;
    const clock = new THREE.Clock();
    let last = 0;
    const tick = () => {
      const t = clock.getElapsedTime(), dt = Math.min(t - last, .05); last = t;
      if (scene3d.index !== shown) {
        shown = scene3d.index;
        const st = STAGES[shown];
        morphTo(st.shape);
        gsap.to(pose, { x: st.x, y: st.y, rx: st.rx, ry: st.ry, rz: st.rz, s: st.s, spinY: st.spinY, spinZ: st.spinZ, full: st.full || 0, duration: reduce ? 0 : 1.9, ease: 'power3.inOut', overwrite: true });
        gsap.to(lineMat, { opacity: st.lines, duration: reduce ? 0 : 1.2, delay: st.lines ? .9 : 0, overwrite: true });
      }
      if (!reduce) { spinY += pose.spinY * dt; spinZ += pose.spinZ * dt; }
      const narrow = innerWidth < 900, nk = narrow ? 1 - pose.full : 0;   // full-screen stages skip the phone offset
      mat.uniforms.uTime.value = reduce ? 0 : t;
      group.position.set(pose.x * (1 - nk * .85), pose.y * (1 - nk * .5) + nk * 2.4, 0);
      group.rotation.set(pose.rx + scene3d.mouseY * .3, pose.ry + scene3d.mouseX * .4, pose.rz);
      group.scale.setScalar(pose.s * (1 - nk * .28));
      inner.rotation.set(0, spinY, spinZ);
      renderer.render(scene, camera);
      raf(tick);
    };
    tick();
  }

  initParticles();

  /* ---------- Loader + first section entrance ---------- */
  syncUI(0);
  const loader = document.getElementById('loader'), pct = document.getElementById('loaderPct');
  const start = performance.now();
  let n = 0;
  const count = every(() => { n = Math.min(n + Math.ceil(Math.random() * 9), 96); pct.textContent = n + '%'; }, 70);
  const finish = () => {
    clearInterval(count); pct.textContent = '100%';
    later(() => {
      loader.classList.add('is-done');
      later(() => { loader.hidden = true; }, 900);
      if (!reduce) {
        gsap.from('.header, .segments', { opacity: 0, y: -16, duration: .9, ease: 'power3.out' });
        gsap.from('.rail', { opacity: 0, duration: .9, delay: .3 });
        gsap.from(panels[0].querySelectorAll('[data-reveal]'), { y: 40, opacity: 0, filter: 'blur(10px)', duration: 1.1, stagger: .09, ease: 'power3.out', delay: .15, clearProps: 'filter,transform' });
        dust.kick(1, 2);
      }
    }, reduce ? 0 : Math.max(0, 2000 - (performance.now() - start)));   // long enough for BLAZELINK to light up once
  };
  if (document.readyState === 'complete') finish(); else on(window, 'load', finish);

  return () => {
    disposed = true;
    disposers.forEach((d) => d());
    gsap.globalTimeline.clear();
  };
}
