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

- One accent colour: indigo blue (`--accent` in `css/style.css`, `#4f46e5` light / `#818cf8` dark) on
  cool greys. No gradients on text or buttons, no glows, blurred blobs, emoji icons, floating chips or
  typing effects.
- Copy is for customers, not developers: talk about what they get (more enquiries, less paperwork),
  never the tech stack.
- Type: Geist for everything, Geist Mono for small meta labels. Sentence case headings. No ALL CAPS
  labels. Paragraphs stay under about 65 characters wide.
- Numbers only for real sequences (the process steps).
- Motion must say something (the hero demo shows Idea → Design → Launch; indicators show where you
  are). `transform` and `opacity` only, never `transition: all`; pressed buttons scale to 0.97;
  everything respects `prefers-reduced-motion`.
- Every interactive element has hover, focus-visible and active states. Touch targets at least 44 px.
- Responsive is part of done: check 375, 768, 1024, 1280, 1440 and 1920 px. No horizontal page scroll.
- Forms: label above field, inline error next to the field, the submit button shows a busy state.
- Icons: the project icon set lives in `assets/icons/` (source `favicon.svg`); never ship a default icon.
