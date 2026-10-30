export default function Footer() {
  return (
    <footer className="ft" aria-label="Site footer">
      <img className="ft-bg" src="/assets/crossing.jpg" alt="" />
      <div className="ft-shade" aria-hidden="true" />
      <div className="ft-in">
        <div className="ft-cta">
          <h2 className="text-[clamp(48px,5.6vw,84px)] font-extrabold leading-[0.95] tracking-[-0.055em]">
            From brief to{' '}
            <span className="text-sun">
              billboard.
            </span>
          </h2>
          <p className="max-w-[520px] text-[20px] font-light leading-[1.45] text-[rgba(255,255,255,0.86)]">
            Tell us who you want to reach. We find the screens, get the approvals and put you live, in minutes.
          </p>
          <a className="btn-cta-y mt-2" href="#">
            Start planning
            <span className="btn-cta-y-ic" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        </div>
        <div className="ft-card">
          <div className="ft-grid">
            <div className="ft-col">
              <h3 className="ft-h">
                Product
              </h3>
              <ul>
                <li>
                  <a className="ft-link" href="#">
                    Campaign planner
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Screen inventory
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Audiences
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Reporting
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div className="ft-col">
              <h3 className="ft-h">
                Solutions
              </h3>
              <ul>
                <li>
                  <a className="ft-link" href="#">
                    Agencies
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Brands
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Local businesses
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Publishers
                  </a>
                </li>
              </ul>
            </div>
            <div className="ft-col">
              <h3 className="ft-h">
                Resources
              </h3>
              <ul>
                <li>
                  <a className="ft-link" href="#">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Guides
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Help centre
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Screen map
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div className="ft-col">
              <h3 className="ft-h">
                Company
              </h3>
              <ul>
                <li>
                  <a className="ft-link" href="#">
                    About
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Careers
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Customers
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Press
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="ft-col">
              <h3 className="ft-h">
                Follow us
              </h3>
              <div className="flex gap-3.5 mt-1">
                <a className="ft-soc" href="#" aria-label="deedooh on LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" />
                  </svg>
                </a>
                <a className="ft-soc" href="#" aria-label="deedooh on Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a className="ft-soc" href="#" aria-label="deedooh on X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.8 3h3.3l-7.2 8.2L22.4 21h-6.6l-5.2-6.8L4.7 21H1.4l7.7-8.8L1 3h6.8l4.7 6.2zm-1.2 16h1.8L7.5 4.9H5.6z" />
                  </svg>
                </a>
              </div>
              <h3 className="ft-h mt-7">
                Talk to us
              </h3>
              <a className="ft-link" href="#">
                Book a demo
              </a>
            </div>
          </div>
          <div className="ft-grid ft-grid2">
            <div className="ft-col">
              <h3 className="ft-h">
                Screens in
              </h3>
              <ul className="ft-two">
                <li>
                  <a className="ft-link" href="#">
                    Stockholm
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Oslo
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Copenhagen
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Helsinki
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    London
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Berlin
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Paris
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    New York
                  </a>
                </li>
              </ul>
            </div>
            <div className="ft-col [grid-column:span_2]">
              <h3 className="ft-h">
                From the blog
              </h3>
              <ul>
                <li>
                  <a className="ft-link" href="#">
                    How rush hour became the best time slot in outdoor
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    Local first: planning a campaign for one neighbourhood
                  </a>
                </li>
                <li>
                  <a className="ft-link" href="#">
                    What a 2-week DOOH flight actually costs
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="ft-bottom">
            <a className="ft-mark" href="#" aria-label="deedooh home">
              <span className="logo block w-full h-full bg-white" />
            </a>
            <div className="flex flex-col items-end gap-2 text-[14px] text-mist">
              <span>
                deedooh © 2026
              </span>
              <span className="flex gap-1.5 flex-wrap justify-end">
                <a className="ft-legal" href="#">
                  Terms
                </a>
                ·
                <a className="ft-legal" href="#">
                  Privacy
                </a>
                ·
                <a className="ft-legal" href="#">
                  Cookies
                </a>
                ·
                <a className="ft-legal" href="#">
                  DPA
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
