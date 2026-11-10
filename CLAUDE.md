# Devio website: rules for Claude

Static site: `index.html`, `css/style.css`, `js/main.js`. No build step. Open `index.html` or run
`python -m http.server` in this folder.

## Rule set

- On the owner's machine, read `C:\Users\chrys\OneDrive\Desktop\Magics\AGENTS.md` first (parallel lanes,
  safety, Telegram status board in `.claude/STATUS.md`, which is git-excluded).
- Project skills live in `.claude/skills/` (copied from the Magics kit, all security-scan approved).
  For any UI change use `ui-craft` (plan, then critique and cut), `frontend-design`,
  `redesign-existing-projects` and `emil-design-eng`. Finish with `verify-and-stop`.

## Design rules for this site

- One accent colour: royal blue (`--accent` in `css/style.css`, `#2a5cd6`) on deep navy (`--bg`,
  `#070b18`). The site is dark only, there is no light theme. Text on royal is white; royal as small
  text on navy uses `--accent-ink` (`#7b9eee`). The logo is the "devio" wordmark with a square royal
  dot on the i, no separate symbol. The identity lives in `brand/` (guidelines PDF, logos, tokens);
  `brand/build-brand.mjs --render` regenerates it and the site icons. No gradients on text or
  buttons, no glows, blurred blobs, emoji icons, floating chips or typing effects.
- English and Arabic: English text is in `index.html` under `data-i18n` keys, Arabic is the `ar`
  dictionary in `js/main.js`; change both. Use CSS logical properties (`inline-start`, not `left`) so
  the page mirrors; check every change in both languages.
- Copy is for customers, not developers: talk about what they get (more enquiries, less paperwork),
  never the tech stack.
- Type: Sora for Latin headings, Readex Pro for body text and all Arabic, JetBrains Mono for small
  meta labels. Sentence case headings. No ALL CAPS
  labels. Paragraphs stay under about 65 characters wide.
- Numbers only for real sequences (the process steps).
- Motion must say something (the logo draws itself; the hero headline rises word by word; the
  statement lights up as you read down; the Tahselly frame tilts upright on scroll and plays the
  real screens; indicators show where you are). `transform` and `opacity` only, never `transition: all`; pressed buttons scale to 0.97;
  everything respects `prefers-reduced-motion`.
- Every interactive element has hover, focus-visible and active states. Touch targets at least 44 px.
- Responsive is part of done: check 375, 768, 1024, 1280, 1440 and 1920 px. No horizontal page scroll.
- Forms: label above field, inline error next to the field, the submit button shows a busy state.
- Icons: the project icon set lives in `assets/icons/` (source `favicon.svg`); never ship a default icon.
