import { useState } from 'react';
import Globe from './Globe';
import { NETWORK_CITIES } from '../data/content';

export default function ScreenNetwork() {
  const [sel, setSel] = useState(0);
  const netCities = NETWORK_CITIES.map(([name], i) => ({ name, sel: i === sel ? 'true' : 'false', pick: () => setSel(i) }));

  return (
    <section className="no nb" aria-labelledby="net-title">
      <div className="no-in">
        <div className="nb-top">
          <h2 className="nb-kick" id="net-title">
            Start on your street.{' '}
            <span className="text-sun">
              Go anywhere.
            </span>
          </h2>
          <p className="nb-num">
            2,200,000+
          </p>
          <span className="no-cap">
            screens worldwide
          </span>
        </div>
        <div className="nb-row">
          <div className="nb-left">
            <p className="no-p">
              Book the screens around one store, or across a continent. Pick a city to see it on the globe.
            </p>
            <ul className="no-pills" role="list">
              {netCities.map((c, cIndex) => (
                <li key={cIndex}>
                  <button className="no-pill" type="button" aria-pressed={c.sel} onClick={c.pick}>
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
            <a className="btn-cta self-start" href="#">
              Explore the screen map
              <span className="btn-cta-ic" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </div>
          <div className="nb-globe">
            <div>
              <Globe selected={sel} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
