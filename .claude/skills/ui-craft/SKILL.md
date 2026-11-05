---
name: ui-craft
description: Use when designing, building or reviewing any user interface (a page, a component, a mockup, a redesign) so it looks deliberate and crafted instead of generic AI output. A two-pass method (plan, then critique and cut), default rules against the usual AI look (purple-pink gradients, glows, decorative blobs, filler copy), and measurable craft checks (spacing grid, type, concentric radii, borders and shadows, every interactive state, contrast). Works on any stack - plain CSS, Blade, Bootstrap, Tailwind, React, Vue - and is the checklist a design review judges against.
version: 1.0.0
---

# UI craft: deliberate, not generated

Generic AI interfaces are recognisable at a glance: a purple-to-pink hero, a glow on every
button, three identical cards with an icon, blurred blobs floating behind everything, "Lorem
ipsum" or "Feature 1". This skill replaces that with a method and checks you can measure.

These rules are **defaults**. The project's own brand and design system come first: a brand that
is built on a gradient keeps it. What this skill forbids is reaching for these things *by default*.

## 1. Two passes before any markup

### Pass 1: the plan (write it down, five lines)
1. **Who and what:** the one job this screen does for whom ("a shop owner checks today's orders").
2. **Layout:** the reading order and the grid (columns, max width, what sits above the fold).
3. **Tokens:** the colours (from the project's palette; new ones in OKLCH with a hex fallback),
   the type family and scale, the radius and spacing scale.
4. **Hierarchy:** the one thing that should be seen first, and how it wins (size, weight, colour,
   space; not all four).
5. **Responsive:** what changes at phone width (stacking, hidden, reordered).

### Pass 2: the critique (then cut)
Ask, and act on every yes:
- Is anything here **decoration filling space**? Delete it.
- Do two elements compete for first look? Demote one.
- Is there an effect (gradient, glow, blur, shadow, motion) that carries **no meaning**? Remove it.
- Could a section be a sentence? Could a card be a row?
- Would a designer on this product recognise their system, or does it look like a template?

Only then build. In a review, run Pass 2 on what was built.

## 2. Default rules against the AI look

| Don't, by default | Do instead |
|---|---|
| Purple-to-pink / blue-to-purple gradients, neon glows, coloured `box-shadow` halos | Solid colours from semantic tokens (`--surface`, `--text`, `--accent`, `--danger`); one accent per view |
| Decorative blobs, blurred circles, floating abstract shapes, random geometry | Real content, real imagery, or white space |
| Every card wrapped in a heavy drop shadow | A 1px border in a low-contrast line colour; shadows only for things that float (menus, dialogs, popovers) |
| Identical three-card "feature" rows with an icon each | A layout shaped by the content: a list, a table, a comparison, one strong example |
| "Lorem ipsum", "Card title 1", "John Doe", "Click here" | Real, domain-specific copy in sentence case and an active voice ("Send the invoice", "3 orders wait for packing") |
| Emoji as icons, mixed icon sets | One icon set, one stroke width, sized to the text it sits beside |
| Centre-aligned paragraphs | Left-aligned body text (right in RTL); centre only short headings |
| Text in ALL CAPS for emphasis | Weight or colour; caps only for real codes (`INV-0042`) and tiny labels with letter-spacing |

## 3. Craft standards (measurable)

### Spacing
- One scale, built on **4px with 8px steps**: 4, 8, 12, 16, 24, 32, 48, 64. No one-off values
  (13px, 22px). Tailwind: `1, 2, 3, 4, 6, 8, 12, 16`. Bootstrap: `$spacer` multiples via
  `p-1`…`p-5` plus custom tokens.
- **Related things sit closer than unrelated things** (proximity): the gap inside a group is
  smaller than the gap between groups, every time.
- Padding inside a control ≥ the gap between controls.

### Type
- A scale with a clear ratio (e.g. 12, 14, 16, 20, 24, 32, 40); body 15-18px on the web.
- **Line length 45-75 characters** for body text (`max-width: 65ch`).
- Line height: ~1.5 for body, 1.1-1.25 for large headings.
- Letter-spacing: slightly negative on large display text (`-0.01em` to `-0.02em`), normal on body,
  positive (`0.04em`+) only on tiny uppercase labels.
- At most two families (one is usually enough); weights 400/500/600/700, not all of them.
- Numbers in tables use tabular figures (`font-variant-numeric: tabular-nums`).

### Shape and surface
- **Concentric radii:** a rounded element inside a rounded container uses
  `inner radius = outer radius − the padding between them` (never below 0), so the corners stay
  parallel. A 16px card with 8px padding holds 8px-radius children.
- **Borders:** 1px, low contrast against the surface (about 8-12% darker/lighter than it). In dark
  mode, lighter than the surface, not black.
- **Shadows**, when something floats: layered and faint, e.g.
  `0 1px 2px rgb(0 0 0 / 0.04), 0 4px 12px rgb(0 0 0 / 0.06)`. Never a single large dark blur.
- **Optical alignment:** align by what the eye sees, not the bounding box: an icon next to text
  sits on the text's centre line; a play triangle nudges right; round shapes slightly overshoot
  square ones.

### Colour and contrast
- Text contrast **WCAG AA**: 4.5:1 for body, 3:1 for large text (≥24px, or ≥19px bold) and for
  UI parts (borders of inputs, focus rings, icons that carry meaning).
- Colour never carries meaning alone: a status has a label or an icon too.
- Dark mode is designed, not inverted: surfaces step up in lightness for elevation; accents are
  re-tuned so they don't glow.
- New colours in OKLCH for even steps (`oklch(62% 0.15 250)`), with a hex fallback where older
  browsers matter.

### Every interactive state
Every control has, visibly and distinctly: **default, hover, focus-visible, active/pressed,
disabled**, and where it applies **loading, selected, error**.
- Transitions on `color`, `background-color`, `border-color`, `box-shadow`, `transform` at
  **120-180ms ease-out**; pressed = `scale(0.97)` or a darker fill, instant.
- `:focus-visible` ring: 2px, offset 2px, ≥3:1 against its background. Never remove outlines
  without a replacement.
- Disabled: lower contrast **and** `cursor: not-allowed`; say why nearby when it isn't obvious.
- Touch targets ≥ 44×44px on phones, with ≥8px between them.

### Empty, loading and error
Design them; they are not afterthoughts. An empty state says what goes here and the one action
that fills it. Loading reserves the final size (skeleton), never a jumping spinner. An error says
what happened and what to do, next to where it happened.

### Motion
Motion explains (where something came from, what changed); it never decorates. 150-300ms for UI,
`transform`/`opacity` only, and a `prefers-reduced-motion` version. Bigger, creative motion: see
the `creative-motion` skill.

## 4. Stack notes

| Stack | How the rules map |
|---|---|
| Plain CSS / Blade / templates | Tokens as CSS custom properties on `:root` (and a dark set); one stylesheet per screen; states with `:hover`, `:focus-visible`, `:active`, `[disabled]` |
| Bootstrap 5 | Override the Sass variables / CSS variables (`--bs-border-radius`, `--bs-body-font-size`, `$spacer`) instead of fighting components with `!important`; drop default shadows (`$enable-shadows: false`) |
| Tailwind | Configure the theme (spacing, radius, colours as CSS variables) and use only those; no arbitrary values (`p-[13px]`) except for a real one-off |
| React / Vue component libraries | Theme the library's tokens; don't restyle each instance |

## 5. Review checklist (for a design check or before hand-over)

- [ ] Pass 1 written; Pass 2 run and something was cut.
- [ ] No default AI look: gradients, glows, blobs, filler copy, emoji icons (unless the brand asks).
- [ ] Spacing all on the scale; groups tighter inside than between.
- [ ] Type: one scale, body 45-75ch, headings tracked tighter, tabular numbers in tables.
- [ ] Radii concentric; borders 1px low-contrast; shadows only on floating things, layered and faint.
- [ ] AA contrast on text and UI parts; meaning never by colour alone.
- [ ] Every control: hover, focus-visible, pressed, disabled (and loading/error where relevant).
- [ ] Empty, loading and error states designed.
- [ ] Phone width checked: stacking, 44px targets, nothing overflows.
- [ ] Reduced motion checked.
