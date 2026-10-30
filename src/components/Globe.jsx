import { useEffect, useRef } from 'react';
import { LAND, LINES } from '../data/globe';
import { NETWORK_CITIES } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const toXYZ = (lon, lat) => {
  const L = (lon * Math.PI) / 180;
  const P = (lat * Math.PI) / 180;
  return [Math.cos(P) * Math.sin(L), Math.sin(P), Math.cos(P) * Math.cos(L)];
};
const POINTS = LAND.map(([lo, la]) => toXYZ(lo, la));
const COAST = LINES.map((l) => {
  const out = [];
  for (let i = 0; i < l.length; i += 2) out.push(toXYZ(l[i], l[i + 1]));
  return out;
});
const CITIES = NETWORK_CITIES.map(([name, , lon, lat]) => ({ name, lon, lat, p: toXYZ(lon, lat) }));

/**
 * Canvas globe of the screen network. Rotates to the selected city, can be
 * dragged, and drifts slowly once the visitor has dragged it.
 */
export default function Globe({ selected = 0 }) {
  const canvas = useRef(null);
  const reduce = usePrefersReducedMotion();
  const view = useRef({ lam: -CITIES[0].lon, phi: 30, tl: -CITIES[0].lon, tp: 30, drag: false, free: false, idle: 0, sel: 0 });

  // Rotate towards the picked city, taking the short way round. The first
  // render keeps the default 30° tilt so the globe opens on a wide view.
  useEffect(() => {
    const v = view.current;
    if (selected === v.sel) return;
    const c = CITIES[selected];
    let tl = -c.lon;
    while (tl - v.lam > 180) tl -= 360;
    while (tl - v.lam < -180) tl += 360;
    v.tl = tl;
    v.tp = Math.max(-40, Math.min(50, c.lat * 0.75));
    v.free = false;
    v.sel = selected;
  }, [selected]);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el.getContext('2d');
    const size = { w: 0, h: 0, d: 1 };
    const resize = () => {
      const r = el.getBoundingClientRect();
      size.d = Math.min(window.devicePixelRatio || 1, 2);
      size.w = r.width;
      size.h = r.height;
      el.width = Math.max(1, Math.round(r.width * size.d));
      el.height = Math.max(1, Math.round(r.height * size.d));
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let raf;
    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      const v = view.current;
      const { w: W, h: H, d } = size;
      if (!W) return;
      if (v.free && !v.drag && !reduce && t > v.idle) { v.lam -= 0.06; v.tl = v.lam; }
      const k = reduce ? 1 : 0.075;
      v.lam += (v.tl - v.lam) * k;
      v.phi += (v.tp - v.phi) * k;

      ctx.setTransform(d, 0, 0, d, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const R = (Math.min(W, H) / 2) * 0.82;
      const cx = W / 2;
      const cy = H / 2 - 8;
      const a = (v.lam * Math.PI) / 180;
      const tt = (v.phi * Math.PI) / 180;
      const ca = Math.cos(a), sa = Math.sin(a), ct = Math.cos(tt), st = Math.sin(tt);
      const proj = (p) => {
        const x = p[0] * ca + p[2] * sa;
        const z0 = p[2] * ca - p[0] * sa;
        const y = p[1] * ct - z0 * st;
        const z = p[1] * st + z0 * ct;
        return [cx + R * x, cy - R * y, z];
      };

      // Sphere
      const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      g.addColorStop(0, '#5A51F0');
      g.addColorStop(1, '#2E26B8');
      ctx.save();
      ctx.shadowColor = 'rgba(11,31,59,0.35)';
      ctx.shadowBlur = 36;
      ctx.shadowOffsetY = 14;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();

      // Coastlines
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';
      ctx.globalAlpha = 0.28;
      ctx.beginPath();
      for (const line of COAST) {
        let pen = false;
        for (const pt of line) {
          const q = proj(pt);
          if (q[2] > 0) { if (pen) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); pen = true; } else pen = false;
        }
      }
      ctx.stroke();

      // Land dots
      const dr = Math.max(1.1, R / 160);
      ctx.fillStyle = '#FFFFFF';
      for (const pt of POINTS) {
        const q = proj(pt);
        if (q[2] <= 0) continue;
        ctx.globalAlpha = (0.15 + 0.6 * q[2]) * 0.75;
        ctx.beginPath();
        ctx.arc(q[0], q[1], dr * (0.6 + 0.4 * q[2]), 0, Math.PI * 2);
        ctx.fill();
      }

      // Cities
      ctx.globalAlpha = 1;
      ctx.font = '600 14px Rubik, sans-serif';
      ctx.textBaseline = 'middle';
      CITIES.forEach((city, i) => {
        const q = proj(city.p);
        if (q[2] <= 0.02) return;
        const on = i === v.sel;
        if (on) {
          const ph = (t / 1600) % 1;
          ctx.globalAlpha = (1 - ph) * q[2];
          ctx.strokeStyle = '#FFF04A';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(q[0], q[1], 9 + ph * 26, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = q[2];
          ctx.beginPath();
          ctx.arc(q[0], q[1], 22, 0, Math.PI * 2);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = 'rgba(255,240,74,.6)';
          ctx.stroke();
        }
        ctx.globalAlpha = Math.min(1, 0.25 + q[2]);
        ctx.fillStyle = on ? '#FFF04A' : '#FFFFFF';
        ctx.beginPath();
        ctx.arc(q[0], q[1], on ? 8 : 4.5, 0, Math.PI * 2);
        ctx.fill();
        if (on && q[2] > 0.25) {
          const tw = ctx.measureText(city.name).width;
          const h = 30, x0 = q[0] + 30, y0 = q[1] - h / 2;
          ctx.fillStyle = '#FFF04A';
          ctx.beginPath();
          ctx.roundRect(x0, y0, tw + 24, h, 15);
          ctx.fill();
          ctx.fillStyle = '#0B1F3B';
          ctx.fillText(city.name, x0 + 12, q[1] + 1);
        }
      });
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [reduce]);

  const onPointerDown = (e) => {
    e.preventDefault();
    const el = canvas.current;
    const v = view.current;
    el.style.cursor = 'grabbing';
    const start = { x: e.clientX, y: e.clientY, lam: v.lam, phi: v.phi };
    v.drag = true;
    v.free = true;
    const move = (ev) => {
      v.lam = start.lam + (ev.clientX - start.x) * 0.35;
      v.phi = Math.max(-70, Math.min(70, start.phi + (ev.clientY - start.y) * 0.35));
      v.tl = v.lam;
      v.tp = v.phi;
    };
    const up = () => {
      v.drag = false;
      v.idle = performance.now() + 1800;
      el.style.cursor = 'grab';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <canvas
      ref={canvas}
      onPointerDown={onPointerDown}
      role="img"
      aria-label="Interactive globe showing deedooh's screen network. Drag to spin, or pick a city."
      className="block h-full w-full cursor-grab touch-none"
    />
  );
}
