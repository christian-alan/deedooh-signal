import { useEffect, useRef, useState } from 'react';

const FIRST_REPLY = "Nice! Tell me roughly where your customers are and when you'd like to go live, and I'll sketch a plan with you.";
const NEXT_REPLY = 'Got it. Give me a minute while I pull up the screens for that.';

function nowLabel() {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [big, setBig] = useState(false);
  const [seen, setSeen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [typing, setTyping] = useState(false);
  const [time] = useState(nowLabel);
  const input = useRef(null);
  const thread = useRef(null);
  const wantFocus = useRef(false);
  const replyTimer = useRef(null);

  // Like a real support chat, the teaser opens on its own after a few seconds.
  useEffect(() => {
    if (seen) return undefined;
    const id = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(id);
  }, [seen]);
  useEffect(() => () => clearTimeout(replyTimer.current), []);
  useEffect(() => {
    if (thread.current) thread.current.scrollTop = thread.current.scrollHeight;
  }, [msgs, typing, big]);
  useEffect(() => {
    if (big && wantFocus.current && input.current) { wantFocus.current = false; input.current.focus(); }
  }, [big]);

  const grow = () => { wantFocus.current = true; setOpen(true); setBig(true); setSeen(true); };
  const submit = () => {
    const v = input.current?.value.trim();
    if (!v) return;
    input.current.value = '';
    const isFirst = !msgs.some((m) => !m.them);
    setMsgs((m) => [...m, { cls: 'cb-me', them: false, text: v }]);
    if (!big) wantFocus.current = true;
    setOpen(true); setBig(true); setSeen(true); setTyping(true);
    clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { cls: 'cb-row', them: true, text: isFirst ? FIRST_REPLY : NEXT_REPLY }]);
    }, 1600);
  };

  const chatOpen = open;
  const chatClosed = !open;
  const chatBig = open && big;
  const chatTeaser = open && !big;
  const chatTime = time;
  const chatLabel = open ? 'Close chat' : 'Chat with Sara';
  const chatMsgs = msgs;
  const chatTyping = typing;
  const chatRef = input;
  const chatScrollRef = thread;
  const chatToggle = () => { setOpen((o) => !o); setBig(false); setSeen(true); };
  const chatClose = () => { setOpen(false); setBig(false); setSeen(true); };
  const chatExpand = grow;
  const chatFocus = () => { if (!big) grow(); };
  const chatSend = submit;
  const chatKey = (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } };

  return (
    <div className="cb">
      {chatTeaser && (
        <div className="cb-card" role="dialog" aria-label="Chat with Sara from deedooh">
          <button className="cb-open" type="button" onClick={chatExpand} aria-label="Open chat with Sara">
            <span className="cb-head">
              <span className="cb-av">
                <img src="/assets/sara-avatar.jpg" alt="" width="56" height="56" />
                <i aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[19px] font-medium text-navy">
                  Sara Lind
                </span>
                <span className="text-[15px] text-slate">
                  Campaign planner at deedooh
                </span>
              </span>
            </span>
            <span className="cb-msgs">
              <span className="cb-line">
                hey, it's Sara, real person based in Stockholm 👋
              </span>
              <span className="cb-line">
                what would you like to put on screens? (not a bot btw!)
              </span>
            </span>
          </button>
          <div className="cb-input">
            <input ref={chatRef} onKeyDown={chatKey} onFocus={chatFocus} type="text" aria-label="Message Sara" placeholder="Enter a message" />
            <button type="button" aria-label="Send message" onClick={chatSend}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.99.99 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
              </svg>
            </button>
          </div>
          <div className="cb-foot">
            <a href="#">
              Privacy policy
            </a>
          </div>
        </div>
      )}
      {chatBig && (
        <div className="cb-panel" role="dialog" aria-label="Chat with Sara from deedooh">
          <div className="cb-bar">
            <span className="cb-av cb-av-s">
              <img src="/assets/sara-avatar.jpg" alt="" width="44" height="44" />
              <i aria-hidden="true" />
            </span>
            <span className="flex flex-col gap-px min-w-0 flex-auto">
              <span className="text-[19px] font-medium text-navy">
                Sara Lind
              </span>
              <span className="text-[15px] text-brand">
                Campaign planner at deedooh
              </span>
            </span>
            <button className="cb-x" type="button" aria-label="Close chat" onClick={chatClose}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div className="cb-thread" ref={chatScrollRef} aria-live="polite">
            <p className="cb-meta">
              Today, {chatTime}
            </p>
            <div className="cb-row">
              <span className="cb-mark" aria-hidden="true">
                <i />
              </span>
              <div className="cb-bub">
                <p className="font-bold">
                  Welcome to deedooh 👋
                </p>
                <p>
                  deedooh is the easiest way to plan and book digital outdoor campaigns. Pick the areas and people you want to reach, and we put you on the right screens from 20+ publishers, locally or worldwide.
                </p>
                <p className="font-bold">
                  How can we help you today?
                </p>
              </div>
            </div>
            <p className="cb-meta cb-joined">
              <img src="/assets/sara-avatar.jpg" alt="" width="26" height="26" />
              <span>
                Sara Lind joined · Today, {chatTime}
              </span>
            </p>
            <div className="cb-row">
              <img className="cb-mini" src="/assets/sara-avatar.jpg" alt="" width="28" height="28" />
              <div className="cb-bub">
                <p>
                  hey, it's Sara, real person based in Stockholm 👋
                </p>
                <p>
                  what would you like to put on screens? (not a bot btw!)
                </p>
              </div>
            </div>
            {chatMsgs.map((m, mIndex) => (
              <div key={mIndex} className={m.cls}>
                {m.them && (
                  <img className="cb-mini" src="/assets/sara-avatar.jpg" alt="" width="28" height="28" />
                )}
                <div className="cb-bub">
                  <p>
                    {m.text}
                  </p>
                </div>
              </div>
            ))}
            {chatTyping && (
              <div className="cb-row">
                <img className="cb-mini" src="/assets/sara-avatar.jpg" alt="" width="28" height="28" />
                <div className="cb-bub cb-typing" aria-label="Sara is typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>
          <div className="cb-input">
            <input ref={chatRef} onKeyDown={chatKey} onFocus={chatFocus} type="text" aria-label="Message Sara" placeholder="Enter a message" />
            <button type="button" aria-label="Send message" onClick={chatSend}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.99.99 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
              </svg>
            </button>
          </div>
          <div className="cb-foot">
            <a href="#">
              Privacy policy
            </a>
          </div>
        </div>
      )}
      <button className="cb-launch" type="button" aria-expanded={chatOpen} aria-label={chatLabel} onClick={chatToggle}>
        {chatOpen && (
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        )}
        {chatClosed && (
          <>
            <img src="/assets/sara-avatar.jpg" alt="" width="58" height="58" />
            <i aria-hidden="true" />
          </>
        )}
      </button>
    </div>
  );
}
