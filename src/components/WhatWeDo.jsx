import { useRef, useState } from 'react';
import { WHAT_WE_DO } from '../data/content';
import { useAutoAdvance } from '../hooks/useAutoAdvance';

const DURATION = 8000;

export default function WhatWeDo() {
  const [stopped, setStopped] = useState(false);
  const video = useRef(null);
  const { index, progress, pick, pause, resume } = useAutoAdvance(WHAT_WE_DO.length, DURATION, { paused: stopped });

  const open = (i) => { pick(i); setStopped(false); };
  const wwCards = WHAT_WE_DO.map((d, i) => ({
    ...d,
    n: `0${i + 1}`,
    active: i === index,
    sel: i === index ? 'true' : 'false',
    pct: i === index ? progress.toFixed(1) : i < index ? '100' : '0',
    pick: () => open(i),
    key: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } },
  }));
  const wwToggle = (e) => {
    e.stopPropagation();
    const next = !stopped;
    if (video.current) { if (next) video.current.pause(); else video.current.play(); }
    setStopped(next);
  };
  const wwVidRef = video;
  const wwPause = pause;
  const wwResume = resume;
  const wwPlaying = !stopped;
  const wwStopped = stopped;
  const wwPlayLabel = stopped ? 'Play video' : 'Pause video';

  return (
    <section className="ww" aria-labelledby="ww-title">
      <div className="ho-in">
        <h2 className="wwc-big" id="ww-title">
          Every screen.
          <br />
          <span>
            One booking.
          </span>
        </h2>
        <div className="wwc-sub">
          <p className="max-w-[520px] text-[20px] font-light leading-[1.45] text-haze">
            deedooh is a booking platform for digital outdoor. Plan, book and run campaigns on screens from 20+ publishers, from city squares to the corner by your store.
          </p>
        </div>
        <div className="ww-row" role="tablist" aria-label="Where your ads run" onMouseEnter={wwPause} onMouseLeave={wwResume}>
          {wwCards.map((c, cIndex) => (
            <div key={cIndex} className="ww-card" role="tab" tabIndex="0" aria-selected={c.sel} aria-label={c.title} onClick={c.pick} onKeyDown={c.key}>
              <img className="ww-poster" src={c.poster} alt="" />
              {c.active && (
                <video className="ww-video" ref={wwVidRef} src={c.video} poster={c.poster} autoPlay muted loop playsInline aria-hidden="true" />
              )}
              <span className="ww-shade" aria-hidden="true" />
              <span className="ww-n" aria-hidden="true">
                {c.n}
              </span>
              <span className="ww-meta">
                <span className="ww-bar" aria-hidden="true">
                  <span style={{ width: `${c.pct}%` }} />
                </span>
                <span className="ww-title">
                  {c.title}
                </span>
                {c.active && (
                  <span className="ww-body">
                    {c.body}
                  </span>
                )}
              </span>
              {c.active && (
                <button className="ww-play" type="button" aria-label={wwPlayLabel} onClick={wwToggle}>
                  {wwPlaying && (
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="5" y="4" width="5" height="16" rx="1.5" />
                      <rect x="14" y="4" width="5" height="16" rx="1.5" />
                    </svg>
                  )}
                  {wwStopped && (
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 4.5v15a1 1 0 001.5.86l12-7.5a1 1 0 000-1.72l-12-7.5A1 1 0 007 4.5z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
