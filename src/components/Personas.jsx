import { useState } from 'react';
import { PERSONAS } from '../data/content';

export default function Personas() {
  const [cur, setCur] = useState(0);
  const d = PERSONAS[cur];
  const psTabs = PERSONAS.map((p, i) => ({
    label: p.label,
    sel: i === cur ? 'true' : 'false',
    bg: i === cur ? '#FFFFFF' : 'transparent',
    fg: i === cur ? '#0B1F3B' : '#FFFFFF',
    pick: () => setCur(i),
  }));
  // The first tab sits flush with the card, so its corner is square.
  const psCorner = cur === 0 ? '0px' : '16px';
  const psHead = d.head;
  const psBody = d.body;
  const psStats = d.stats.map(([v, who]) => ({ v, who }));

  return (
    <section className="ps" aria-labelledby="ps-title">
      <img className="ps-bg" src="/assets/street-motion.jpg" alt="" />
      <div className="ps-shade" aria-hidden="true" />
      <div className="relative max-w-[1320px] mx-auto px-14 box-border">
        <h2 className="text-[clamp(44px,5vw,76px)] font-extrabold leading-[0.95] tracking-[-0.055em] whitespace-nowrap" id="ps-title">
          Global or local,{' '}
          <span className="text-sun">
            find yours.
          </span>
        </h2>
        <p className="mt-6 max-w-[640px] text-[19px] font-light leading-[1.5] text-[rgba(255,255,255,0.85)]">
          Whether you run one mall in Stockholm, launch globally twice a year or juggle fifteen brands, deedooh finds the screens where your audience spends its day.
        </p>
        <div className="mt-18">
          <div className="ps-tabs" role="tablist" aria-label="Who it's for">
            {psTabs.map((t, tIndex) => (
              <button key={tIndex} className="ps-tab" type="button" role="tab" aria-selected={t.sel} onClick={t.pick} style={{ background: t.bg, color: t.fg }}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="ps-card" role="tabpanel" style={{ borderTopLeftRadius: psCorner }}>
            <h3 className="ps-big">
              {psHead}
            </h3>
            <div className="flex flex-col gap-9 min-w-0">
              <p className="text-[17px] leading-[1.55] text-slate">
                {psBody}
              </p>
              <div className="ps-stats">
                {psStats.map((st, stIndex) => (
                  <div key={stIndex} className="ps-stat">
                    <span className="ps-num">
                      {st.v}
                    </span>
                    <span className="ps-who">
                      {st.who}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
