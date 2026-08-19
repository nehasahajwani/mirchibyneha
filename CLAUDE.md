# CLAUDE.md

Orientation for Claude Code working in this repo. This is Neha's photography /
videography / design portfolio site, built in Astro + Tailwind to replicate a
Canva template ("neha portfolio template"). It was built by Claude (Cowork)
in a prior session — this file exists so a fresh Claude Code session has the
same context without Neha having to re-explain everything.

## Commands

```bash
npm install       # first time / after pulling changes to package.json
npm run dev        # dev server with hot reload
npm run build       # production build -> dist/
npm run preview     # serve the dist/ build locally to sanity-check it
```

No test suite, no linter configured yet.

## Stack

- Astro 4, static output (no SSR, no framework islands — plain `.astro`
  components + a small amount of vanilla JS for the lightbox).
- Tailwind CSS (`@astrojs/tailwind`, `applyBaseStyles: false` — base styles
  come from `src/styles/global.css` instead).
- Fonts are self-hosted via `@fontsource` packages (Lora, Nunito Sans,
  Roboto) — no Google Fonts CDN calls at runtime.

## Site structure

Three nav tabs (Photo / Video / Work) plus a Home page reached via the
`,by neha` logo in the nav — Home is intentionally *not* a fourth tab.

```
src/
  layouts/BaseLayout.astro   — <html> shell, imports global.css, renders Nav + <slot/>. No footer (client asked for no bottom bar).
  components/Nav.astro       — sticky top nav: logo + 3 tabs, active-tab styling via Astro.url.pathname
  components/Lightbox.astro  — reusable per-page lightbox, see below
  data/
    site.json    — brand/nav config
    home.json    — hero image + About Me copy
    photo.json   — Photo page: intro block + `galleries[]` (each gallery = title, captionList, equipment, software, description, images[])
    video.json   — Video page: intro block + `items[]` (each = title, video, poster, caption, description, filming, software)
    work.json    — Work page: intro block + `items[]` (each = type image|video, media, poster?, description, meta[], link?)
  pages/
    index.astro  — Home: hero, About Me, empty reserved #contact section
    photo.astro  — reads photo.json, renders masonry grids per gallery
    video.astro  — reads video.json, alternating media/text rows
    work.astro   — reads work.json, alternating media/text rows
public/
  media/{home,photo,video,work}/...  — all images/video, organized by page
```

## Content model — how to add new work

This was explicitly built so Neha can add new photos/videos/projects without
touching component code:

1. Drop the file under `public/media/<page>/...`.
2. Add one entry to the matching array in `src/data/<page>.json` with its
   path, alt text, and captions.

That's it — the grids, the lightbox item list, and lightbox arrow navigation
are all derived from these JSON arrays at build time (see the `cursor`/index
logic at the top of each page's frontmatter, which assigns sequential
`data-lightbox-index` values in DOM order). Don't hardcode media in the
`.astro` files themselves; always go through the JSON.

## The lightbox (important, non-obvious behavior)

`src/components/Lightbox.astro` takes `groupId` + `items[]` props. Each page
instantiates **exactly one** Lightbox with a page-scoped `groupId` (`"photo"`,
`"video"`, `"work"`). This is deliberate: arrow-key/arrow-button navigation
inside an open lightbox cycles only through that page's own `items` array —
it must never jump between Photo/Video/Work. Do not merge these into a single
site-wide lightbox or share a `groupId` across pages.

Implementation: each page builds a flat `lightboxItems` array server-side (in
frontmatter) in the same order the thumbnails appear in the DOM, then renders
clickable elements with `data-lightbox-group={groupId}` and
`data-lightbox-index={n}`. The Lightbox component embeds that array as JSON
in a `<script type="application/json">` tag and a small vanilla-JS block
(`define:vars`) wires up click handlers, open/close, and prev/next. No client
framework — keep it that way unless there's a good reason to add one.

Video items show a poster image with a play-button overlay on the page;
clicking opens the lightbox where the real `<video controls>` element is
injected. Videos are not autoplayed anywhere (browser autoplay policies +
it was a deliberate choice to keep initial page loads light).

## Design tokens

Defined in `tailwind.config.mjs`, do not hardcode hex values in components:

- `ink` `#0B01D6` — main background
- `ink-dark` `#0B095B` — darker/alternate section background
- `paper` `#FDFDFD` — text
- `accent` `#F35E02` — links/accents
- `font-display` → Lora (logo, section titles, gallery titles — italic used
  for "About me" and gallery titles specifically)
- `font-body` → Nunito Sans (body copy, mixed weight — some bold, some not,
  per the original Canva template)
- `font-nav` → Roboto Bold (nav bar only)

## Known open items / things Neha may ask to fix

- Homepage has an empty, reserved `#contact` section in `index.astro` —
  waiting on social links + email before it gets built out.
- No social links wired up anywhere yet.
- Desktop-only layout for now; Tailwind responsive classes are used
  throughout but haven't been tuned for mobile breakpoints yet — a mobile
  pass is expected as a future task.
- No scroll/entrance animations yet — explicitly deferred, not forgotten.
- `paris-2025.mp4` and `wiki-freeze.mp4` were re-encoded for web (H.264,
  ~1280px wide, CRF 25) from much larger originals (216MB/129MB →
  36MB/16MB). If quality complaints come up, that's the first place to look;
  originals are still in the sibling asset folders outside this project if a
  re-encode at higher quality is wanted.
- The Munchi recipe-book link in `work.json` (`.../mit-mahe/contribu`) looks
  possibly truncated compared to the Clarity by Design link
  (`.../mit-mahe/contribution`) — flagged to Neha, unconfirmed either way.
- **Neha said "there are multiple things that need to be rectified" but the
  list wasn't captured in this session before work moved to Claude Code.**
  Ask her for that list before making changes — don't guess at what's wrong.
