# ,by neha — Portfolio Site

Astro + Tailwind build of your portfolio (Photo / Video / Work), matching the
"neha portfolio template" Canva design.

## Running it locally

```bash
npm install
npm run dev
```

Then open the printed localhost URL. To produce a production build:

```bash
npm run build
npm run preview   # serve the built dist/ folder locally to double-check it
```

`npm run build` outputs a static site to `dist/` — that folder is what you'd
upload to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc).

## Adding new photos / videos / work later

All page content lives in four plain JSON files in `src/data/`:

- `home.json` — hero image + About Me text
- `photo.json` — the Photo page: intro block, then a `galleries` array. Each
  gallery has a title, caption list, equipment/software, a description, and
  an `images` array of `{ src, alt }`.
- `video.json` — the Video page: intro block, then an `items` array. Each
  item has a title, `video` + `poster` path, caption, description, filming
  and software info.
- `work.json` — the Work page: intro block, then an `items` array. Each item
  has a `type` (`"image"` or `"video"`), a `media` path, description, a
  `meta` list of label/value pairs, and an optional `link`.

To add a new photo, video, or work piece: drop the file in the matching
folder under `public/media/...`, then add one new entry to the relevant JSON
array with its path and captions. No component code needs to change — the
pages, grids, and the lightbox all render directly from this data, and the
lightbox's arrow navigation automatically includes anything you add.

## Design tokens

Colors and fonts are centralized in `tailwind.config.mjs`:

- `ink` `#0B01D6` — main background
- `ink-dark` `#0B095B` — darker background for alternating sections
- `paper` `#FDFDFD` — text
- `accent` `#F35E02` — links / accents
- `font-display` → Lora (logo, section titles; italic used for "About me" /
  gallery titles)
- `font-body` → Nunito Sans (body copy)
- `font-nav` → Roboto Bold (nav bar)

Fonts are self-hosted via `@fontsource` (no external network calls at
runtime).

## Notes / open items

- The homepage has a reserved, empty **Contact** section (`#contact` in
  `src/pages/index.astro`) waiting on your social links and email — nothing
  else needs to change structurally when you're ready to fill it in.
- Social links aren't wired up yet anywhere in the nav or contact section.
- Built for desktop only for now, as requested. The layout uses Tailwind's
  responsive classes throughout, so a mobile pass later is mostly a matter of
  tightening breakpoints rather than rebuilding pages.
- No scroll/entrance animations yet, per your request — flagged as a fast
  follow whenever you want it.
- The two long-form videos (`paris-2025.mp4`, `wiki-freeze.mp4`) were
  re-encoded for web delivery (H.264, ~1280px wide, CRF 25) — originals were
  216MB and 129MB; the site versions are ~36MB and ~16MB. If you'd rather
  keep full original quality for one of them, just swap the file back in and
  update the path in `video.json`.
- The Munchi recipe-book link in `work.json` uses the URL you gave me
  (`.../mit-mahe/contribu`), which looks like it might be missing a suffix
  compared to the Clarity by Design link (`.../mit-mahe/contribution`) — worth
  double-checking that one.
