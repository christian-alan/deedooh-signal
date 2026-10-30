import { Fragment } from 'react';
import { DOT_ROWS, HEATMAP_DAYS, RUSH_HOURS, STEPS } from '../data/content';
import { useAutoAdvance } from '../hooks/useAutoAdvance';

const DURATION = 6500;

const DOT_GRID = DOT_ROWS.flatMap((row, y) =>
  [...row].map((c, x) => (c === '#' ? <circle key={`${x}-${y}`} cx={14 + x * 16} cy={14 + y * 16} r="1.6" /> : null)),
);

// Cells light up in a wave: Mon first, then down the week.
const HEATMAP = HEATMAP_DAYS.map((day, r) => ({
  day,
  cells: Array.from({ length: 24 }, (_, h) => {
    const on = r < 5 && RUSH_HOURS.includes(h);
    const k = RUSH_HOURS.indexOf(h) % 3;
    return { cls: on ? 'cell on' : 'cell', d: on ? `${(0.18 + r * 0.05 + k * 0.025).toFixed(2)}s` : '0.00s' };
  }),
}));

export default function HowItWorks() {
  const { index, progress, pick, pause, resume } = useAutoAdvance(STEPS.length, DURATION);
  const hiwSteps = STEPS.map((s, i) => ({
    ...s,
    active: i === index,
    sel: i === index ? 'true' : 'false',
    pct: i === index ? progress.toFixed(1) : 0,
    pick: () => pick(i),
  }));
  const hiwStepNo = index + 1;
  const hiwPct = progress.toFixed(1);
  const [hiw0, hiw1, hiw2] = [index === 0, index === 1, index === 2];
  const hiwPause = pause;
  const hiwResume = resume;

  return (
    <section className="ho" id="how-it-works" aria-labelledby="hiw-title">
      <div className="ho-in">
        <div className="ho-head">
          <h2 className="text-[clamp(48px,5.6vw,82px)] font-extrabold leading-[0.95] tracking-[-0.055em]" id="hiw-title">
            From plan to live
            <br />
            in{' '}
            <span className="text-sun">
              3 simple steps.
            </span>
          </h2>
          <p className="max-w-[520px] text-[20px] font-light leading-[1.45] text-haze">
            Plan and submit your campaign in minutes. We handle activation and delivery across your selected screens.
          </p>
        </div>
        <div className="st" role="tablist" aria-label="Steps" onMouseEnter={hiwPause} onMouseLeave={hiwResume}>
          {hiwSteps.map((st, stIndex) => (
            <button key={stIndex} className="st-tab" type="button" role="tab" aria-selected={st.sel} onClick={st.pick}>
              <span className="st-n" aria-hidden="true">
                {st.n}
              </span>
              <span className="st-t">
                {st.title}
              </span>
              <span className="st-bar" aria-hidden="true">
                <span style={{ width: `${st.pct}%` }} />
              </span>
            </button>
          ))}
        </div>
        <div className="ha-low">
          <div className="ha-copy">
            {hiwSteps.map((st, stIndex) => (
              <Fragment key={stIndex}>
                {st.active && (
                  <>
                    <h3>
                      {st.title}
                    </h3>
                    <p>
                      {st.body}
                    </p>
                  </>
                )}
              </Fragment>
            ))}
          </div>
          <div className="ha-stage" aria-hidden="true">
            <div className="stage">
              <div className="stage-top">
                <span className="mono text-sun">
                  0{hiwStepNo}
                </span>
                <span className="mono">
                  / 03
                </span>
                <span className="stage-bar">
                  <span style={{ width: `${hiwPct}%` }} />
                </span>
              </div>
              {' '}
              {hiw0 && (
                <div className="scene">
                  <svg viewBox="0 0 600 580" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: '0' }}>
                    <g fill="#FFFFFF" fillOpacity=".13">
                      {DOT_GRID}
                    </g>
                    <path className="route" d="M126 402 C 160 350 180 310 214 300 S 260 410 286 404 S 380 250 410 236 S 440 360 452 352 S 500 190 512 150" fill="none" stroke="#FFF04A" strokeWidth="1.5" strokeLinejoin="round" />
                    <g className="pin" style={{ '--i': '0' }}>
                      <circle className="ping" cx="126" cy="402" r="6" fill="none" stroke="#FFF04A" strokeWidth="1.5" />
                      <circle cx="126" cy="402" r="5" fill="#FFF04A" />
                      <circle cx="126" cy="402" r="11" fill="#FFF04A" fillOpacity=".14" />
                    </g>
                    <g className="pin" style={{ '--i': '0' }}>
                      <text x="144" y="400" textAnchor="start" fontFamily="Rubik, sans-serif" fontSize="13" fontWeight="600" fill="#FFFFFF">
                        Odenplan
                      </text>
                      <text x="144" y="416" textAnchor="start" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="#FFFFFF" fillOpacity=".5" letterSpacing=".04em">
                        4 SCREENS
                      </text>
                    </g>
                    <g className="pin" style={{ '--i': '1' }}>
                      <circle className="ping" cx="214" cy="300" r="6" fill="none" stroke="#FFF04A" strokeWidth="1.5" />
                      <circle cx="214" cy="300" r="5" fill="#FFF04A" />
                      <circle cx="214" cy="300" r="11" fill="#FFF04A" fillOpacity=".14" />
                    </g>
                    <g className="pin" style={{ '--i': '1' }}>
                      <text x="232" y="298" textAnchor="start" fontFamily="Rubik, sans-serif" fontSize="13" fontWeight="600" fill="#FFFFFF">
                        T-Centralen
                      </text>
                      <text x="232" y="314" textAnchor="start" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="#FFFFFF" fillOpacity=".5" letterSpacing=".04em">
                        8 SCREENS
                      </text>
                    </g>
                    <g className="pin" style={{ '--i': '2' }}>
                      <circle className="ping" cx="286" cy="404" r="6" fill="none" stroke="#FFF04A" strokeWidth="1.5" />
                      <circle cx="286" cy="404" r="5" fill="#FFF04A" />
                      <circle cx="286" cy="404" r="11" fill="#FFF04A" fillOpacity=".14" />
                    </g>
                    <g className="pin" style={{ '--i': '3' }}>
                      <circle className="ping" cx="410" cy="236" r="6" fill="none" stroke="#FFF04A" strokeWidth="1.5" />
                      <circle cx="410" cy="236" r="5" fill="#FFF04A" />
                      <circle cx="410" cy="236" r="11" fill="#FFF04A" fillOpacity=".14" />
                    </g>
                    <g className="pin" style={{ '--i': '3' }}>
                      <text x="428" y="234" textAnchor="start" fontFamily="Rubik, sans-serif" fontSize="13" fontWeight="600" fill="#FFFFFF">
                        Slussen
                      </text>
                      <text x="428" y="250" textAnchor="start" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="#FFFFFF" fillOpacity=".5" letterSpacing=".04em">
                        2 SCREENS
                      </text>
                    </g>
                    <g className="pin" style={{ '--i': '4' }}>
                      <circle className="ping" cx="452" cy="352" r="6" fill="none" stroke="#FFF04A" strokeWidth="1.5" />
                      <circle cx="452" cy="352" r="5" fill="#FFF04A" />
                      <circle cx="452" cy="352" r="11" fill="#FFF04A" fillOpacity=".14" />
                    </g>
                    <g className="pin" style={{ '--i': '5' }}>
                      <circle className="ping" cx="512" cy="150" r="6" fill="none" stroke="#FFF04A" strokeWidth="1.5" />
                      <circle cx="512" cy="150" r="5" fill="#FFF04A" />
                      <circle cx="512" cy="150" r="11" fill="#FFF04A" fillOpacity=".14" />
                    </g>
                    <g className="pin" style={{ '--i': '5' }}>
                      <text x="494" y="148" textAnchor="end" fontFamily="Rubik, sans-serif" fontSize="13" fontWeight="600" fill="#FFFFFF">
                        Mall of Scandinavia
                      </text>
                      <text x="494" y="164" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="#FFFFFF" fillOpacity=".5" letterSpacing=".04em">
                        4 SCREENS
                      </text>
                    </g>
                  </svg>
                  <div className="gl [--i:1] right-6 bottom-6 w-[236px]">
                    <div className="mono">
                      Audience match
                    </div>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="num">
                        18
                      </span>
                      <span className="text-[13px] text-[rgba(255,255,255,.7)]">
                        screens on the commute
                      </span>
                    </div>
                    <div className="meter">
                      <span className="[--w:72%]" />
                    </div>
                    <div className="mono flex justify-between mt-2">
                      <span>
                        Street 8
                      </span>
                      <span>
                        Metro 8
                      </span>
                      <span>
                        Retail 2
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {hiw1 && (
                <div className="scene pt-16 pr-7 pb-7 pl-7 box-border flex flex-col justify-center gap-6">
                  <div className="fade [--i:0] flex items-end justify-between gap-4">
                    <div>
                      <div className="mono">
                        Budget
                      </div>
                      <div className="num text-[52px]">
                        €10,000
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mono">
                        Flight
                      </div>
                      <div className="text-[16px] font-semibold mt-1">
                        3 Mar → 16 Mar
                      </div>
                    </div>
                  </div>
                  <div className="fade [--i:1]">
                    <div className="slider">
                      <span />
                      <i />
                    </div>
                  </div>
                  <div className="fade [--i:2] flex flex-col gap-1.5">
                    {HEATMAP.map((row, rowIndex) => (
                      <div key={rowIndex} className="hm-row">
                        <span className="mono w-[30px]">
                          {row.day}
                        </span>
                        <div className="hm-cells">
                          {row.cells.map((cell, cellIndex) => (
                            <span key={cellIndex} className={cell.cls} style={{ '--d': cell.d }} />
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="relative h-3.5 ml-[38px]">
                      <span className="mono absolute left-[calc(0.000%_)] [transform:translateX(-50%)]">
                        00
                      </span>
                      <span className="mono absolute left-[calc(25.000%_)] [transform:translateX(-50%)]">
                        06
                      </span>
                      <span className="mono absolute left-[calc(50.000%_)] [transform:translateX(-50%)]">
                        12
                      </span>
                      <span className="mono absolute left-[calc(75.000%_)] [transform:translateX(-50%)]">
                        18
                      </span>
                    </div>
                  </div>
                  <div className="fade [--i:4] flex gap-2 flex-wrap">
                    <span className="tag on">
                      07–09 Morning rush
                    </span>
                    <span className="tag on">
                      16–18 Evening rush
                    </span>
                    <span className="tag">
                      Weekdays
                    </span>
                  </div>
                </div>
              )}
              {hiw2 && (
                <div className="scene">
                  <div className="absolute right-0 top-0 bottom-0 aspect-[736/920]">
                    <img className="absolute inset-0 w-full h-full block" src="/assets/billboard.jpg" alt="" />
                    <div className="absolute left-[41.17%] top-[41.09%] w-[58.83%] h-[42.72%] @container bg-[#0F1520] overflow-hidden">
                      <div className="ad-wipe absolute inset-0 flex bg-sun text-navy">
                        <div className="[flex:1_1_52%] flex flex-col justify-center gap-[3cqw] pl-[7cqw]">
                          <span className="text-[13cqw] font-extrabold leading-[.92] tracking-[-0.04em]">
                            Spring is here.
                          </span>
                          <span className="text-[4.2cqw] font-medium">
                            Nordic Oat · in stores now
                          </span>
                        </div>
                        <img className="[flex:0_0_48%] w-[48%] h-full object-cover [object-position:50%_22%] block" src="/assets/ad-model.jpg" alt="" />
                      </div>
                      <span className="ad-flash2" />
                    </div>
                    <div className="absolute inset-0 [background:linear-gradient(90deg,_#0B1F3B_0%,_rgba(11,31,59,0.65)_22%,_rgba(11,31,59,0)_52%)]" />
                  </div>
                  <div className="gl [--i:0] left-6 bottom-6 w-[330px] pt-4 pr-4 pb-2.5 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="mono">
                        Activation
                      </span>
                      <span className="mono text-mint">
                        Stockholm
                      </span>
                    </div>
                    <div className="fd [--i:0]">
                      <span className="fd-dot" />
                      <span className="flex-auto text-[13.5px] font-medium">
                        Creative approved
                      </span>
                      <span className="mono opacity-[.55]">
                        1080×1920
                      </span>
                      <span className="mono opacity-[.35] w-[58px] text-right">
                        09:00:01
                      </span>
                    </div>
                    <div className="fd [--i:1]">
                      <span className="fd-dot" />
                      <span className="flex-auto text-[13.5px] font-medium">
                        Publishers confirmed
                      </span>
                      <span className="mono opacity-[.55]">
                        3 of 3
                      </span>
                      <span className="mono opacity-[.35] w-[58px] text-right">
                        09:00:03
                      </span>
                    </div>
                    <div className="fd [--i:2]">
                      <span className="fd-dot" />
                      <span className="flex-auto text-[13.5px] font-medium">
                        Screens scheduled
                      </span>
                      <span className="mono opacity-[.55]">
                        18 screens
                      </span>
                      <span className="mono opacity-[.35] w-[58px] text-right">
                        09:00:04
                      </span>
                    </div>
                    <div className="fd live-row [--i:3]">
                      <span className="live w-2 h-2 rounded-full bg-sun" />
                      <span className="flex-auto text-[13.5px] font-bold text-sun">
                        Live on 18 screens
                      </span>
                      <span className="mono opacity-[.5] w-[58px] text-right">
                        09:00:05
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
