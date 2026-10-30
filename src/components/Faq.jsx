export default function Faq() {
  return (
    <section className="fx fb" aria-labelledby="faq-title">
      <div className="fb-in">
        <h2 className="fb-word" id="faq-title">
          Questions
          <span>
            ?
          </span>
        </h2>
        <div className="fb-sub">
          <p className="max-w-[520px] text-[20px] leading-[1.5] text-slate">
            The things marketers ask us most. Can't find yours? Ask in plain words and we'll plan it with you.
          </p>
          <a className="ask-btn" href="#">
            Ask our planner
            <span aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.8 4.6L18.5 9l-4.7 1.6L12 15l-1.8-4.4L5.5 9l4.7-1.4z" />
                <path d="M19 15l.8 2 2 .8-2 .8L19 21l-.8-2.4-2-.8 2-.8z" />
              </svg>
            </span>
          </a>
        </div>
        <div className="fb-list">
          <details className="fb-i" name="faq" open>
            <summary>
              <span className="fb-i-n">
                01
              </span>
              <span className="fb-i-q">
                Do I need an outdoor specialist or a media team?
              </span>
              <span className="fx-pm" aria-hidden="true" />
            </summary>
            <p>
              No. Describe who you want to reach and where, and deedooh plans the screens, hours and budget for you. If you know your area, like the streets around your store, that is all you need.
            </p>
          </details>
          <details className="fb-i" name="faq">
            <summary>
              <span className="fb-i-n">
                02
              </span>
              <span className="fb-i-q">
                Can I run both local and global campaigns?
              </span>
              <span className="fx-pm" aria-hidden="true" />
            </summary>
            <p>
              Yes. Book the screens around a single store, stitch together a national campaign from local areas, or launch across many markets from one plan.
            </p>
          </details>
          <details className="fb-i" name="faq">
            <summary>
              <span className="fb-i-n">
                03
              </span>
              <span className="fb-i-q">
                Which publishers and screens can I book?
              </span>
              <span className="fx-pm" aria-hidden="true" />
            </summary>
            <p>
              Screens from 20+ publishers, over 2,200,000 worldwide. You choose by area and audience, not by publisher, and we handle the bookings with each of them.
            </p>
          </details>
          <details className="fb-i" name="faq">
            <summary>
              <span className="fb-i-n">
                04
              </span>
              <span className="fb-i-q">
                How fast can my campaign go live?
              </span>
              <span className="fx-pm" aria-hidden="true" />
            </summary>
            <p>
              You can plan and submit a campaign in under five minutes. Once publishers approve your creative, your ads go live on the dates you picked.
            </p>
          </details>
          <details className="fb-i" name="faq">
            <summary>
              <span className="fb-i-n">
                05
              </span>
              <span className="fb-i-q">
                Can I hand the work to your team instead?
              </span>
              <span className="fx-pm" aria-hidden="true" />
            </summary>
            <p>
              Yes. Plan, buy and analyse campaigns yourself, or let our team set up and run them for you. Many agencies use both.
            </p>
          </details>
          <details className="fb-i" name="faq">
            <summary>
              <span className="fb-i-n">
                06
              </span>
              <span className="fb-i-q">
                I run an agency. Can I manage several clients?
              </span>
              <span className="fx-pm" aria-hidden="true" />
            </summary>
            <p>
              Yes. Keep local, national and multi-market clients in one place, and switch between them without separate processes or tools.
            </p>
          </details>
          <details className="fb-i" name="faq">
            <summary>
              <span className="fb-i-n">
                07
              </span>
              <span className="fb-i-q">
                How much does it cost?
              </span>
              <span className="fx-pm" aria-hidden="true" />
            </summary>
            <p>
              You set the budget for each campaign and see the full price of your plan before you book anything.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
