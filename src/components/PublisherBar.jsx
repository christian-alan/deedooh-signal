import { PUBLISHERS } from '../data/content';

// Six columns that roll through three rows of logos; the first row repeats at the
// end so the loop is seamless.
const pubCols = Array.from({ length: 6 }, (_, c) => ({
  delay: `${(c * 0.09).toFixed(2)}s`,
  items: [0, 1, 2, 0].map((r, k) => {
    const [name, src, h] = PUBLISHERS[r * 6 + c];
    return { src, alt: k === 3 ? '' : name, h: `${(h * 0.8).toFixed(1)}px` };
  }),
}));

export default function PublisherBar() {
  return (
    <>
      <section className="pub-bar sticky bottom-0 z-[5] bg-[rgba(74,64,236,0.94)] [-webkit-backdrop-filter:blur(16px)_saturate(1.3)] [backdrop-filter:blur(16px)_saturate(1.3)] [border-top:1px_solid_rgba(255,255,255,0.14)]" aria-label="Publishers on deedooh">
        <div className="max-w-[1240px] mx-auto py-3.5 px-10">
          <div className="pub-row w-full grid grid-cols-6 gap-x-6 text-[rgba(11,31,59,0.72)]">
            {pubCols.map((col, colIndex) => (
              <div key={colIndex} className="h-14 overflow-hidden">
                <div className="pub-track" style={{ animationDelay: col.delay }}>
                  {col.items.map((it, itIndex) => (
                    <span key={itIndex} className="flex items-center justify-center h-14">
                      <img className="block w-auto max-w-full opacity-[0.82] [filter:brightness(0)_invert(1)]" src={it.src} alt={it.alt} style={{ height: it.h }} />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="pt-5 pr-6 pb-18 pl-6 flex justify-center">
        <p className="text-[13px] font-bold tracking-[0.08em] uppercase text-[rgba(255,255,255,0.7)] text-center">
          Screens from 20+ publishers all over the world
        </p>
      </div>
    </>
  );
}
