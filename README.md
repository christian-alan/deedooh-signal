# deedooh web · Signal Bold E

The Signal "Bold E" landing page, built with React 19, Vite 6 and Tailwind CSS 4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  App.jsx                 page order
  index.css               Tailwind import, brand tokens (@theme) and component styles
  data/content.js         all copy and section data (publishers, steps, personas, cities…)
  data/globe.js           land dots and coastlines for the globe
  hooks/useAutoAdvance.js timer behind the auto-advancing cards and steps
  components/
    Hero.jsx              nav, headline, campaign prompt, billboard
    Prompt.jsx            campaign brief box (typewriter, chips, fake planning)
    PublisherBar.jsx      sticky rolling publisher logos
    WhatWeDo.jsx          edge-to-edge video cards
    HowItWorks.jsx        3 step cards + animated scenes
    Personas.jsx          Local / Global / Agencies tabs
    Proof.jsx             testimonial cards that grow on hover
    ScreenNetwork.jsx     2,200,000+ stat, city pills
    Globe.jsx             canvas globe (drag to spin, rotates to the picked city)
    Faq.jsx               accordion
    Footer.jsx            CTA over photo + navy link card
    ChatWidget.jsx        "Sara" support chat
public/assets/            images, logos, publisher wordmarks, videos
```

## Styling

Brand colours are Tailwind tokens, so you can write `bg-brand`, `text-sun`, `text-navy`,
`bg-lavender`, `text-mint`, `text-haze`, `text-slate`, `text-mist`. Fonts are Rubik
(`font-sans`) and IBM Plex Mono (`font-mono`), loaded from Google Fonts in `index.html`.

Layout and typography are Tailwind utilities in the JSX. Animations, state selectors
(`[aria-selected]`, `details[open]`), pseudo-elements and the scene art live as component
classes in `index.css`.

## Placeholders to replace

- `public/assets/video/*`: stand-in clips made from photos. Swap in real DOOH footage
  (same file names, 8–10 s loops).
- Proof brands, people and quotes, and the chat persona "Sara Lind", are invented.
- Links point to `#`.
- Desktop-first: the design was made at 1440 px. It works on phones without horizontal
  scrolling, but the smaller layouts haven't been designed yet.
