import { useEffect, useRef, useState } from 'react';

const EXAMPLES = [
  'Spring launch for commuters in Stockholm and Berlin, two weeks from Monday',
  'Weekend shoppers in Oslo malls, budget €10,000',
  'Airport screens across the Nordics in December',
];
const MORE_EXAMPLES = [
  ['Students in Gothenburg', 'Back-to-school push for students in Gothenburg in September'],
  ['Drivers into Stockholm', 'Drivers along the E4 into Stockholm for one month'],
  ['Runners in Copenhagen', 'Runners in Copenhagen parks this weekend, budget €5,000'],
];
const STEP_TEXT = ['Reading your brief', 'Matching open screens', 'Building your plan'];
const CITY_LIST = ['Stockholm', 'Gothenburg', 'Malmö', 'Oslo', 'Bergen', 'Copenhagen', 'Helsinki', 'Berlin', 'Hamburg', 'London', 'Paris', 'Amsterdam', 'Nordics', 'Europe'];
const AUDIENCES = [['commuter', 'Commuters'], ['shopper', 'Shoppers'], ['student', 'Students'], ['airport', 'Travellers'], ['traveller', 'Travellers'], ['famil', 'Families'], ['driver', 'Drivers'], ['runner', 'Runners']];
const TOOLS = [
  ['Where', 'Add a place', 'isWhere', 'in Stockholm'],
  ['When', 'Add dates', 'isWhen', 'for two weeks'],
  ['Who', 'Add an audience', 'isWho', 'reaching commuters'],
  ['Budget', 'Add a budget', 'isBudget', 'budget €10,000'],
];
const cap = (s) => s.replace(/^./, (m) => m.toUpperCase());

/** Pulls who / where / when / budget out of a free-text brief. */
function parseBrief(v) {
  const txt = (v || '').toLowerCase();
  const tags = [];
  const cities = CITY_LIST.filter((c) => txt.includes(c.toLowerCase()));
  const who = AUDIENCES.find(([k]) => txt.includes(k));
  const when = txt.match(/(\d+|one|two|three|four|six)\s+(day|week|month)s?/) || txt.match(/(january|february|march|april|may|june|july|august|september|october|november|december|this weekend|weekend|next week|monday)/);
  const budget = (v || '').match(/(€|sek|kr|\$)\s?[\d.,]+\s?k?|[\d.,]+\s?k?\s?(€|sek|kr|eur)/i);
  if (who) tags.push({ k: 'Who', v: who[1] });
  if (cities.length) tags.push({ k: 'Where', v: cities.join(', ') });
  if (when) tags.push({ k: 'When', v: cap(when[0]) });
  if (budget) tags.push({ k: 'Budget', v: budget[0].trim() });
  return { tags, cities, when };
}

/**
 * Campaign brief box: types example briefs as a ghost placeholder, turns quick
 * chips into brief text, and fakes a short "planning" sequence on submit.
 */
export default function Prompt({ theme = 'light', accent = '#0B1F3B', accentText = '#FFFFFF', align = 'left' }) {
  const [value, setValue] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | thinking | done
  const [{ ex, typed }, setGhost] = useState({ ex: 0, typed: 0 });
  const [step, setStep] = useState(0);
  const [shuf, setShuf] = useState(0);
  const timers = useRef([]);

  // Typewriter for the ghost placeholder, paused while the visitor is typing.
  useEffect(() => {
    if (value || phase !== 'idle') return undefined;
    const id = setInterval(() => {
      setGhost((g) => {
        const full = EXAMPLES[g.ex % EXAMPLES.length];
        // Type it out, hold for ~2 s, then move on to the next example.
        return g.typed < full.length + 40 ? { ...g, typed: g.typed + 1 } : { ex: g.ex + 1, typed: 0 };
      });
    }, 45);
    return () => clearInterval(id);
  }, [value, phase]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const submit = () => {
    const v = value.trim() ? value : EXAMPLES[ex % EXAMPLES.length];
    setValue(v); setPhase('thinking'); setStep(0);
    timers.current.forEach(clearTimeout);
    timers.current = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setPhase('done'), 1800),
    ];
  };
  const append = (snippet) => {
    const v = value.trim();
    setValue(v ? v + (/[,.]$/.test(v) ? ' ' : ', ') + snippet : cap(snippet));
    setPhase('idle');
  };

  const dark = theme === 'dark';
  const parsed = parseBrief(value);
  const full = EXAMPLES[ex % EXAMPLES.length];
  const nCities = Math.max(1, parsed.cities.filter((c) => c !== 'Nordics' && c !== 'Europe').length || (parsed.cities.length ? 4 : 1));

  const ghost = full.slice(0, Math.min(typed, full.length));
  const showGhost = !value && phase === 'idle';
  const onInput = (e) => { setValue(e.target.value); setPhase('idle'); };
  const onKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } };
  const onSubmit = (e) => { e.preventDefault(); submit(); };
  const onEdit = () => setPhase('idle');
  const tools = TOOLS.map(([k, aria, flag, snip]) => {
    const t = parsed.tags.find((x) => x.k === k);
    return {
      label: t ? t.v : k,
      aria: t ? `${k}: ${t.v}` : aria,
      isWhere: flag === 'isWhere', isWhen: flag === 'isWhen', isWho: flag === 'isWho', isBudget: flag === 'isBudget',
      bg: t ? '#EEEBFF' : '#FFFFFF', border: t ? '#D9D3FF' : '#E3E6EE', fg: t ? '#2E25B8' : '#4C5A70',
      add: () => { if (!t) append(snip); },
    };
  });
  const thinking = phase === 'thinking';
  const stepText = `${STEP_TEXT[Math.min(step, 2)]}…`;
  const stepNum = `${Math.min(step, 2) + 1} of 3`;
  const done = phase === 'done';
  const screens = String(nCities * 12 + 6);
  const places = String(nCities);
  const placeLabel = nCities === 1 ? 'City' : 'Cities';
  const runs = parsed.when ? cap(parsed.when[0]) : '2 weeks';
  const showExamples = phase === 'idle';
  const onShuffle = () => setShuf((s) => (s + 1) % 2);
  const examples = (shuf ? MORE_EXAMPLES : [['Commuters in Stockholm', EXAMPLES[0]], ['Oslo malls, €10k', EXAMPLES[1]], ['Nordic airports', EXAMPLES[2]]])
    .map(([label, text]) => ({ label, pick: () => { setValue(text); setPhase('idle'); } }));
  const hintJustify = align === 'center' ? 'center' : 'flex-start';
  const themeClass = dark ? 'pr-dark' : 'pr-light';
  const fg = dark ? '#FFFFFF' : '#0B1F3B';
  const labelColor = dark ? '#E4E0FF' : '#4C5A70';
  const chipBg = dark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.75)';
  const chipBorder = dark ? 'rgba(255,255,255,0.16)' : 'rgba(11,31,59,0.10)';

  return (
  <form className={themeClass + ' w-full flex flex-col gap-3 [font-family:Rubik,_sans-serif]'} onSubmit={onSubmit} style={{ color: fg }}>
    <div className="pr-card bg-white text-navy rounded-[26px] [box-shadow:0_1px_0_rgba(255,255,255,0.6)_inset,_0_24px_50px_-16px_rgba(11,31,59,0.35),_0_0_0_1px_rgba(11,31,59,0.06)] flex flex-col">
      <div className="relative pt-5 pr-[22px] pb-1 pl-[22px]">
        <textarea className="pr-field block w-full box-border resize-none border-0 bg-transparent text-inherit text-[18px] leading-[1.5] tracking-[-0.01em] min-h-[54px]" id="campaign-brief" rows="2" enterKeyHint="go" value={value} onChange={onInput} onKeyDown={onKeyDown} placeholder="" aria-label="Describe your campaign" aria-describedby="pr-hint" />
        {showGhost && (
          <div className="absolute left-[22px] right-[22px] top-5 text-[18px] leading-[1.5] tracking-[-0.01em] text-mist pointer-events-none" aria-hidden="true">
            {ghost}
            <span className="pr-caret" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2.5 pt-2.5 pr-3 pb-3 pl-3.5">
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          <button className="pr-plus flex-none inline-flex items-center justify-center w-[34px] h-[34px] rounded-full [border:1px_solid_#E3E6EE] bg-white text-slate cursor-pointer" type="button" aria-label="Attach a brief or image">
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          {tools.map((b, bIndex) => (
            <button key={bIndex} className="pr-chip inline-flex items-center gap-1.5 max-w-[200px] cursor-pointer text-[13px] font-medium pr-3 pl-2.5 h-[34px] rounded-full whitespace-nowrap" type="button" onClick={b.add} aria-label={b.aria} style={{ border: `1px solid ${b.border}`, background: b.bg, color: b.fg }}>
              {b.isWhere && (
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
              )}
              {b.isWhen && (
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3.5" y="5" width="17" height="15" rx="3" />
                  <path d="M3.5 10h17M8 3v4M16 3v4" />
                </svg>
              )}
              {b.isWho && (
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="8" r="3.5" />
                  <path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
                  <path d="M16 4.8a3.3 3.3 0 0 1 0 6.4M18 14.8c2 .6 3.2 2.3 3.5 5.2" />
                </svg>
              )}
              {b.isBudget && (
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M15 9.2a3.4 3.4 0 1 0 0 5.6M7.5 11h5M7.5 13.5h5" />
                </svg>
              )}
              <span className="overflow-hidden [text-overflow:ellipsis]">
                {b.label}
              </span>
            </button>
          ))}
        </div>
        <button className="pr-send flex-none inline-flex items-center justify-center gap-2 border-0 cursor-pointer text-[15px] font-semibold pr-2 pl-[18px] h-11 rounded-full whitespace-nowrap [box-shadow:0_6px_16px_-6px_rgba(11,31,59,0.5)]" type="submit" aria-label="Plan it" title="Plan it" style={{ color: accentText, background: accent }}>
          Plan it
          <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[rgba(255,255,255,0.16)]" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </span>
        </button>
      </div>
      {thinking && (
        <div className="flex flex-col gap-2.5 pt-1 pr-5 pb-[18px] pl-5 [border-top:1px_solid_#EEF1F7]" role="status">
          <div className="flex justify-between gap-3 text-[13px] text-slate pt-3">
            <span>
              {stepText}
            </span>
            <span>
              {stepNum}
            </span>
          </div>
          <div className="pr-bar">
            <span />
          </div>
        </div>
      )}
      {done && (
        <div className="flex flex-col gap-3.5 pt-4 pr-5 pb-[18px] pl-5 [border-top:1px_solid_#EEF1F7]" role="status">
          <div className="flex items-center gap-2.5 text-[14px] font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-navy [box-shadow:0_0_0_3px_#7CFFCB]" />
            Your plan is ready
          </div>
          <div className="grid [grid-template-columns:repeat(3,_minmax(0,_1fr))] gap-2">
            <div className="flex flex-col gap-0.5 bg-[#F4F7FC] rounded-[12px] py-2.5 px-3">
              <span className="text-[12px] text-slate">
                Screens
              </span>
              <span className="text-[22px] font-medium tracking-[-0.02em]">
                {screens}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 bg-[#F4F7FC] rounded-[12px] py-2.5 px-3">
              <span className="text-[12px] text-slate">
                {placeLabel}
              </span>
              <span className="text-[22px] font-medium tracking-[-0.02em]">
                {places}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 bg-[#F4F7FC] rounded-[12px] py-2.5 px-3">
              <span className="text-[12px] text-slate">
                Runs
              </span>
              <span className="text-[22px] font-medium tracking-[-0.02em]">
                {runs}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <button className="pr-tool border-0 bg-transparent text-slate cursor-pointer text-[14px] font-medium py-2.5 px-3 rounded-[10px]" type="button" onClick={onEdit}>
              Edit brief
            </button>
            <a className="pr-book inline-flex items-center gap-2 no-underline text-[15px] font-bold py-3 px-[18px] rounded-[14px]" href="#" style={{ color: accentText, background: accent }}>
              Review and book
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
    {showExamples && (
      <div className="flex flex-wrap items-center gap-2 px-1" id="pr-hint" style={{ justifyContent: hintJustify }}>
        <button className="pr-shuffle inline-flex items-center justify-center w-7 h-7 border-0 rounded-full bg-transparent cursor-pointer" type="button" onClick={onShuffle} aria-label="Show other examples" style={{ color: labelColor }}>
          <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5" />
          </svg>
        </button>
        {examples.map((c, cIndex) => (
          <button key={cIndex} className="pr-ex inline-flex items-center gap-1.5 border-0 cursor-pointer text-[13px] font-medium pr-3 pl-2.5 h-8 rounded-full" type="button" onClick={c.pick} style={{ background: chipBg, color: fg, boxShadow: `inset 0 0 0 1px ${chipBorder}` }}>
            <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: '0.7' }}>
              <path d="M12 3l1.8 4.6L18.5 9l-4.7 1.6L12 15l-1.8-4.4L5.5 9l4.7-1.4z" />
            </svg>
            {c.label}
          </button>
        ))}
      </div>
    )}
  </form>
  );
}
