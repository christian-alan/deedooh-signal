import Prompt from './Prompt';
import { VISITOR_CITY } from '../data/content';

export default function Hero({ city = VISITOR_CITY }) {
  return (
    <section className="hero-card relative isolate overflow-hidden">
      <div className="max-w-[1320px] mx-auto pt-5 pr-8 pl-8 box-border">
        <nav className="rise [--d:0s] flex flex-wrap items-center justify-between gap-3 pt-2 pr-2 pb-2 pl-6 rounded-full bg-[rgba(11,31,59,0.22)] [-webkit-backdrop-filter:blur(14px)] [backdrop-filter:blur(14px)] [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.14)]">
          <a className="block" href="#" aria-label="deedooh home">
            <div className="logo w-[132px] h-[22px] bg-white" />
          </a>
          <div className="nav-links flex items-center gap-0.5">
            <a className="nl-d" href="#">
              Product
            </a>
            <a className="nl-d" href="#">
              Screens
            </a>
            <a className="nl-d" href="#">
              For agencies
            </a>
            <a className="nl-d" href="#">
              For publishers
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <a className="nl-d" href="#">
              Log in
            </a>
            <a className="btn-cta-y" href="#">
              Start planning
              <span className="btn-cta-y-ic" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </div>
        </nav>
        <div className="relative pt-12 pr-6 pb-[120px] pl-6">
          <div className="flex flex-wrap items-start justify-between gap-y-10 gap-x-16">
            <div className="[flex:1_1_560px] min-w-0 flex flex-col gap-[22px] pt-6">
              <h1 className="rise [--d:.08s] text-[clamp(52px,5.6vw,82px)] font-extrabold leading-[0.95] tracking-[-0.055em]" aria-label="Every screen has a moment in someone's day.">
                <span aria-hidden="true">
                  Every screen
                  <br />
                  has a moment in
                </span>
              </h1>
              <p className="rise [--d:.14s] text-[24px] font-light leading-[1.35] tracking-[-0.02em] text-haze">
                Plan outdoor campaigns in minutes.
              </p>
              <div className="rise [--d:.2s] max-w-[580px] mt-1.5">
                <Prompt align="left" theme="dark" accent="#FFF04A" accentText="#0B1F3B" />
              </div>
            </div>
            <div className="rise [--d:.1s] [flex:0_1_430px] min-w-0 mr-2 mb-[-200px] ml-auto relative z-[1]">
              <div className="relative aspect-[736/920] rounded-[28px] overflow-hidden [box-shadow:0_0_0_1px_rgba(255,255,255,0.22),_0_40px_80px_-20px_rgba(11,31,59,0.55)]">
                <span className="glass live-chip absolute z-[2] right-3.5 top-3.5">
                  <span className="live w-2 h-2 rounded-full bg-mint" />
                  <span>
                    Live · {city} · 09:00
                  </span>
                </span>
                <img className="absolute inset-0 w-full h-full block" src="/assets/billboard.jpg" alt="Digital billboard on a city building" />
                <div className="absolute left-[41.17%] top-[41.09%] w-[58.83%] h-[42.72%] @container bg-sun text-navy overflow-hidden flex">
                  <div className="[flex:1_1_52%] flex flex-col justify-center gap-[3cqw] pl-[7cqw]">
                    <span className="text-[13cqw] font-extrabold leading-[0.92] tracking-[-0.04em]">
                      Spring is here.
                    </span>
                    <span className="text-[4.2cqw] font-medium">
                      Nordic Oat · in stores now
                    </span>
                  </div>
                  <img className="[flex:0_0_48%] w-[48%] h-full object-cover [object-position:50%_22%] block" src="/assets/ad-model.jpg" alt="Ad photo of a woman in a green sweater" />
                </div>
              </div>
              <div className="brief-tag absolute z-[3] left-[-40px] top-14 flex flex-col gap-0.5 text-navy bg-[rgba(255,240,74,0.92)] [-webkit-backdrop-filter:blur(10px)] [backdrop-filter:blur(10px)] pt-3 pr-4 pb-[13px] pl-4 rounded-[18px] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.6),_0_18px_40px_-12px_rgba(11,31,59,0.45)] [transform:rotate(-4deg)]">
                <span className="text-[12px] font-medium opacity-[0.7]">
                  Brief
                </span>
                <span className="text-[15px] font-bold leading-[1.3]">
                  Commuters, {city},
                  <br />
                  two weeks from Monday
                </span>
              </div>
            </div>
          </div>
          <div className="rise [--d:.14s] relative z-[2] mt-9 mr-[-4px] ml-[-4px] text-[clamp(96px,12vw,170px)] font-extrabold leading-[0.86] tracking-[-0.065em] text-sun whitespace-nowrap pointer-events-none [text-shadow:0_18px_40px_rgba(11,31,59,0.25)]" aria-hidden="true">
            someone's day.
          </div>
        </div>
      </div>
    </section>
  );
}
