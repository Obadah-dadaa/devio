# Micro-interactions on every stack (not only React)

The principles in SKILL.md apply unchanged: 100-250 ms, `transform`/`opacity`, instant press
feedback, enter slower than exit, reduced motion respected. This file gives the same patterns for
plain JS (Blade, jQuery, any server templates), Vue, Svelte and Alpine.js.

## The React → everywhere map

| React (Framer Motion) | Plain JS / CSS | Vue | Svelte |
|---|---|---|---|
| `whileTap`, `whileHover` | Motion vanilla `press()`, `hover()`; or CSS `:active`, `:hover` | `motion-v` `:while-press`, `:while-hover`; or CSS | CSS, or an action calling Motion's `press()` |
| `AnimatePresence` exit | CSS `@starting-style` + `transition-behavior: allow-discrete` (see css-recipes.md), or animate then remove | `<Transition>` / `<TransitionGroup>` | `transition:`, `in:`, `out:` |
| `layout` / `layoutId` (magic move) | View Transitions API: `document.startViewTransition(update)` + `view-transition-name` | `startViewTransition` around the state change | `startViewTransition` in the handler |
| Spring physics | Motion vanilla `animate(el, {...}, { type: 'spring' })` | `motion-v` transitions | `svelte/motion` `spring()` |
| `useReducedMotion` | `matchMedia('(prefers-reduced-motion: reduce)')` | same, or `MotionConfig reduced-motion="user"` | `prefersReducedMotion.current` from `svelte/motion` (Svelte 5) |

## Plain JS (Blade, jQuery, any template)

Motion's vanilla API (`motion` package, or the pinned CDN build
`https://cdn.jsdelivr.net/npm/motion@13.4.4/dist/motion.js` → global `Motion`):

```js
const { animate, press, hover } = Motion;
const spring = { type: 'spring', stiffness: 400, damping: 30 };

press('[data-press]', (el) => {
    animate(el, { scale: 0.96 }, spring);
    return () => animate(el, { scale: 1 }, spring);
});

hover('.card', (el) => {
    animate(el, { y: -2 }, { duration: 0.18, ease: 'easeOut' });
    return () => animate(el, { y: 0 }, { duration: 0.18, ease: 'easeOut' });
});
```

No library at all, the Web Animations API:

```js
// A toast that slides in, then out before it is removed.
function showToast(el) {
    document.body.append(el);
    el.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
               { duration: 220, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
    setTimeout(async () => {
        await el.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(4px)' }],
                         { duration: 160, easing: 'ease-in', fill: 'forwards' }).finished;
        el.remove();
    }, 4000);
}
```

List reorder or "magic move" without React: wrap the DOM change in a view transition.

```js
function moveItem(item, toList) {
    item.style.viewTransitionName = 'moving-item';
    const done = () => { item.style.viewTransitionName = ''; };
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
        toList.append(item);
        done();
        return;
    }
    document.startViewTransition(() => toList.append(item)).finished.then(done);
}
```

jQuery projects: keep jQuery for DOM selection and events, but animate with CSS classes, the Web
Animations API or Motion; jQuery's `.animate()` runs on the main thread and can't use transforms.

## Vue

```vue
<template>
  <Transition name="toast">
    <div v-if="open" class="toast" role="status">Saved</div>
  </Transition>
</template>

<style>
.toast-enter-active { transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-leave-active { transition: opacity 0.16s ease-in, transform 0.16s ease-in; }
.toast-enter-from { opacity: 0; transform: translateY(8px); }
.toast-leave-to { opacity: 0; transform: translateY(4px); }
@media (prefers-reduced-motion: reduce) {
  .toast-enter-active, .toast-leave-active { transition: opacity 0.12s linear; }
  .toast-enter-from, .toast-leave-to { transform: none; }
}
</style>
```

Lists: `<TransitionGroup tag="ul" name="list">` gives enter, leave and move (`.list-move`) classes.
Springs and gestures: `motion-v` if the project has it.

## Svelte

```svelte
<script>
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  let open = $state(false);
</script>

{#if open}
  <div class="toast" role="status" in:fly={{ y: 8, duration: 220, easing: cubicOut }} out:fly={{ y: 4, duration: 160 }}>Saved</div>
{/if}
```

Lists: `animate:flip` on keyed `{#each}` items. Svelte's built-in transitions don't check reduced
motion by themselves: `import { prefersReducedMotion } from 'svelte/motion'` and pass
`y: prefersReducedMotion.current ? 0 : 8`.

## Alpine.js (often with Blade)

```html
<div x-show="open" role="status"
     x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0"
     x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0">
  Saved
</div>
```

(Those are Tailwind classes; with plain CSS, `x-transition` alone gives a default fade and scale.)
