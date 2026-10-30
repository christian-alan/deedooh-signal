export default function Proof() {
  return (
    <section className="bg-brand text-white pt-[128px] pb-[140px] [border-top:1px_solid_rgba(255,255,255,0.14)]" aria-labelledby="pf-title">
      <div className="max-w-[1320px] mx-auto px-14 box-border">
        <h2 className="mb-14 text-[clamp(44px,5vw,76px)] font-extrabold leading-[0.95] tracking-[-0.055em]" id="pf-title">
          Proof?{' '}
          <span className="text-sun">
            It's on the street.
          </span>
        </h2>
        <div className="pf-row">
          <a className="pf-card bg-[#1A2C55]" href="#">
            <img className="pf-img [object-position:50%_20%]" src="/assets/proof-kvarter-coffee.jpg" alt="" />
            <span className="pf-fade" aria-hidden="true" />
            <span className="pf-fade btm" aria-hidden="true" />
            <span className="pf-brand">
              Kvarter Coffee
            </span>
            <span className="pf-btm">
              <span className="pf-q">
                <span>
                  <span className="pf-quote">
                    “We booked the screens around our three new cafés in an afternoon. Opening week was our busiest ever.”
                  </span>
                </span>
              </span>
              <span className="pf-who">
                Johan Ek, Head of Marketing
              </span>
            </span>
          </a>
          <a className="pf-card bg-[#3D2C7A]" href="#">
            <img className="pf-img [object-position:50%_18%]" src="/assets/proof-fjord-bank.jpg" alt="" />
            <span className="pf-fade" aria-hidden="true" />
            <span className="pf-fade btm" aria-hidden="true" />
            <span className="pf-brand">
              Fjord Bank
            </span>
            <span className="pf-btm">
              <span className="pf-q">
                <span>
                  <span className="pf-quote">
                    “For the first time, outdoor felt as measurable as our digital channels, city by city.”
                  </span>
                </span>
              </span>
              <span className="pf-who">
                Sara Lind, Brand Lead
              </span>
            </span>
          </a>
          <a className="pf-card bg-[#2A2A2A]" href="#">
            <img className="pf-img [object-position:45%_40%]" src="/assets/proof-studio-nord.jpg" alt="" />
            <span className="pf-fade" aria-hidden="true" />
            <span className="pf-fade btm" aria-hidden="true" />
            <span className="pf-brand">
              Studio Nord
            </span>
            <span className="pf-btm">
              <span className="pf-q">
                <span>
                  <span className="pf-quote">
                    “I plan campaigns for six clients. deedooh turned two weeks of emails into one brief.”
                  </span>
                </span>
              </span>
              <span className="pf-who">
                Amira Haddad, Media Planner
              </span>
            </span>
          </a>
          <a className="pf-card bg-sun" href="#">
            <img className="pf-img [object-position:50%_12%]" src="/assets/proof-nordic-oat.webp" alt="" />
            <span className="pf-fade" aria-hidden="true" />
            <span className="pf-fade btm" aria-hidden="true" />
            <span className="pf-brand">
              Nordic Oat
            </span>
            <span className="pf-btm">
              <span className="pf-q">
                <span>
                  <span className="pf-quote">
                    “Our spring launch went live on 18 screens on the commute, in less time than it took to write the brief.”
                  </span>
                </span>
              </span>
              <span className="pf-who">
                Elin Berg, Marketing Director
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
