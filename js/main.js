/* =========================================================
   Devio — main script
   ========================================================= */

/* ---------------------------------------------------------
   1. YOUR PROJECTS — edit this list to add or change projects.
   category: "web" | "design" | "software"
   image:    optional screenshot, e.g. "images/seva.jpg" ("" shows no image)
   link:     live URL or repository ("" hides the link)
   --------------------------------------------------------- */
const projects = [
  {
    title: "Seva Store",
    category: "web",
    description: "Online store with colour and size variants, stock tracking, an admin panel and push notifications.",
    tags: ["Laravel", "MySQL", "JavaScript"],
    image: "",
    link: "",
  },
  {
    title: "Nova Clinic",
    category: "web",
    description: "Clinic management for appointments, patient records and doctors' schedules.",
    tags: ["Laravel", "Bootstrap"],
    image: "",
    link: "",
  },
  {
    title: "Al-Qalam ERP",
    category: "software",
    description: "ERP prototype covering inventory, invoicing and reporting for a growing business.",
    tags: ["PHP", "ERP", "Dashboards"],
    image: "",
    link: "",
  },
  {
    title: "Tahselly",
    category: "software",
    description: "Payments and collections platform that tracks what is owed and what has been paid.",
    tags: ["Laravel", "API"],
    image: "",
    link: "",
  },
  {
    title: "Devio Design System",
    category: "design",
    description: "Reusable UI kit with components, colours and type rules for fast, consistent products.",
    tags: ["Figma", "UI kit"],
    image: "",
    link: "",
  },
  {
    title: "Mobile banking UX",
    category: "design",
    description: "UX research and a high-fidelity prototype for a simple, friendly banking app.",
    tags: ["UX research", "Prototype"],
    image: "",
    link: "",
  },
];

const categoryNames = { web: "Web app", design: "UI / UX", software: "Software" };
const contactEmail = "hello@devio.com";

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const staggerStep = 70;

/* ---------- Reveal: content settles in once, siblings in a short stagger ---------- */
const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
            const index = Math.max(0, siblings.indexOf(el));
            el.style.setProperty("--d", `${Math.min(index, 6) * staggerStep}ms`);
            el.classList.add("in");
            revealObserver.unobserve(el);
            if (el.matches(".stats")) countUp(el);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      )
    : null;

function observeReveal(root = document) {
  root.querySelectorAll(".reveal:not(.in)").forEach((el) => {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add("in");
  });
}

/* ---------- Hero: one staggered entrance ---------- */
function playHero() {
  document.querySelectorAll(".hero-in").forEach((el, i) => {
    el.style.setProperty("--d", `${i * 90}ms`);
    requestAnimationFrame(() => el.classList.add("in"));
  });
}

/* ---------- Stats: count up once, when they come into view ---------- */
function countUp(container) {
  if (reduceMotion.matches) return;
  container.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = "0";
    requestAnimationFrame(tick);
  });
}

/* ---------- Projects: render, filter, empty state ---------- */
const grid = document.getElementById("projectsGrid");
const filtersEl = document.getElementById("filters");
const filterButtons = [...filtersEl.querySelectorAll(".filter")];
const filterIndicator = filtersEl.querySelector(".filter-indicator");
let activeFilter = "all";

function projectCard(p, i, entering) {
  const thumb = p.image
    ? `<div class="project-thumb"><img src="${escapeHtml(p.image)}" alt="Screenshot of ${escapeHtml(p.title)}" loading="lazy" /></div>`
    : "";
  const link = p.link
    ? `<a class="text-link project-link" href="${escapeHtml(p.link)}" target="_blank" rel="noopener">View project <span aria-hidden="true">↗</span></a>`
    : "";
  const cls = entering ? "project is-entering" : "project reveal";
  return `
    <article class="${cls}" style="--d:${Math.min(i, 6) * 60}ms">
      ${thumb}
      <div class="project-body">
        <div class="project-meta"><span class="cat">${escapeHtml(categoryNames[p.category] || p.category)}</span></div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
        <ul class="project-tags" aria-label="Built with">${p.tags.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
        ${link}
      </div>
    </article>`;
}

function emptyState() {
  const filtered = activeFilter !== "all" && projects.length > 0;
  return `
    <div class="empty is-entering">
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>
      <p>${filtered ? "No projects in this category yet." : "Projects will appear here once they are added to js/main.js."}</p>
      ${filtered ? '<button type="button" class="text-link" data-reset-filter>Show all projects</button>' : ""}
    </div>`;
}

function renderProjects(entering) {
  const list = projects.filter((p) => activeFilter === "all" || p.category === activeFilter);
  grid.innerHTML = list.length ? list.map((p, i) => projectCard(p, i, entering)).join("") : emptyState();
  if (!entering) observeReveal(grid);
}

function placeFilterIndicator() {
  const active = filterButtons.find((b) => b.getAttribute("aria-pressed") === "true");
  if (!active || !filterIndicator) return;
  filterIndicator.style.setProperty("--x", `${active.offsetLeft}px`);
  filterIndicator.style.setProperty("--y", `${active.offsetTop}px`);
  filterIndicator.style.setProperty("--w", active.offsetWidth / 100);
  filterIndicator.style.height = `${active.offsetHeight}px`;
}

let filterTimer;
function setFilter(value) {
  if (value === activeFilter) return;
  activeFilter = value;
  filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === value)));
  placeFilterIndicator();
  clearTimeout(filterTimer);
  if (reduceMotion.matches) {
    renderProjects(true);
    return;
  }
  grid.classList.add("is-leaving");
  filterTimer = setTimeout(() => {
    grid.classList.remove("is-leaving");
    renderProjects(true);
  }, 140);
}

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (btn) setFilter(btn.dataset.filter);
});
grid.addEventListener("click", (e) => {
  if (e.target.closest("[data-reset-filter]")) setFilter("all");
});
renderProjects(false);

/* ---------- Header: border on scroll, hides going down, returns going up ---------- */
const header = document.getElementById("siteHeader");
const navLinks = [...document.querySelectorAll(".site-nav ul a")];
const navIndicator = document.querySelector(".nav-indicator");
const menuBtn = document.getElementById("menuBtn");
const siteNav = document.getElementById("siteNav");
let lastY = window.scrollY;

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 8);
  const menuOpen = menuBtn.getAttribute("aria-expanded") === "true";
  if (!menuOpen && y > lastY + 4 && y > 240) header.classList.add("is-hidden");
  if (y < lastY - 4 || y < 240 || menuOpen) header.classList.remove("is-hidden");
  if (Math.abs(y - lastY) > 4) lastY = y;
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
// keyboard users tabbing into the header always get it back
header.addEventListener("focusin", () => header.classList.remove("is-hidden"));

function placeNavIndicator() {
  if (!navIndicator) return;
  const current = navLinks.find((a) => a.getAttribute("aria-current") === "true");
  if (!current) {
    navIndicator.classList.remove("on");
    return;
  }
  const pad = 12; // the link's side padding, so the bar sits under the text only
  const navBox = siteNav.getBoundingClientRect();
  const linkBox = current.getBoundingClientRect();
  navIndicator.style.setProperty("--x", `${linkBox.left - navBox.left + pad}px`);
  navIndicator.style.setProperty("--w", (linkBox.width - pad * 2) / 100);
  navIndicator.classList.add("on");
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          if (a.getAttribute("href") === `#${entry.target.id}`) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
        placeNavIndicator();
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));
}

/* ---------- Mobile menu ---------- */
function setMenu(open) {
  siteNav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  if (open) header.classList.remove("is-hidden");
}
menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
siteNav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuBtn.focus();
  }
});
document.addEventListener("click", (e) => {
  if (!header.contains(e.target)) setMenu(false);
});
window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => {
  if (e.matches) setMenu(false);
  placeNavIndicator();
});

/* ---------- Theme toggle (follows the system until you choose) ---------- */
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = () => root.dataset.theme || (systemDark.matches ? "dark" : "light");

function syncThemeLabel() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  themeToggle.setAttribute("aria-label", `Switch to ${next} theme`);
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) =>
    m.setAttribute("content", currentTheme() === "dark" ? "#141311" : "#f7f6f3")
  );
}
let themeTimer;
themeToggle.addEventListener("click", () => {
  root.classList.add("theme-switching");
  root.dataset.theme = currentTheme() === "dark" ? "light" : "dark";
  try { localStorage.setItem("devio-theme", root.dataset.theme); } catch (_) {}
  syncThemeLabel();
  clearTimeout(themeTimer);
  themeTimer = setTimeout(() => root.classList.remove("theme-switching"), 350);
});
systemDark.addEventListener("change", syncThemeLabel);
syncThemeLabel();

/* ---------- Contact form ----------
   No backend yet: after validation the message opens in the visitor's
   email app, addressed to Devio. Swap sendMessage() for a POST to the
   Laravel API (/api/contact) when it exists. */
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
const submitBtn = document.getElementById("submitBtn");

const rules = {
  name: (v) => (v ? "" : "Please tell us your name."),
  email: (v) =>
    !v ? "Please add your email so we can reply." : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "That email address doesn't look complete.",
  service: (v) => (v ? "" : "Please choose the closest option."),
  message: (v) => (v.length >= 10 ? "" : "A sentence or two about the project helps us reply properly."),
};

function validateField(input) {
  const message = rules[input.name] ? rules[input.name](input.value.trim()) : "";
  const field = input.closest(".field");
  field.classList.toggle("has-error", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
  document.getElementById(`${input.id}-error`).textContent = message;
  return !message;
}

form.querySelectorAll("input, select, textarea").forEach((input) => {
  input.addEventListener("blur", () => { if (input.value.trim()) validateField(input); });
  input.addEventListener("input", () => { if (input.closest(".field").classList.contains("has-error")) validateField(input); });
  input.addEventListener("change", () => { if (input.tagName === "SELECT") validateField(input); });
});

function setBusy(busy) {
  form.setAttribute("aria-busy", String(busy));
  submitBtn.disabled = busy;
  submitBtn.setAttribute("aria-busy", String(busy));
  submitBtn.innerHTML = busy
    ? '<span class="spinner" aria-hidden="true"></span><span class="btn-label">Opening email…</span>'
    : '<span class="btn-label">Send message</span>';
  form.querySelectorAll("input, select, textarea").forEach((el) => { el.readOnly = busy; });
}

function shake(field) {
  field.classList.remove("shake");
  void field.offsetWidth; // restart the animation
  field.classList.add("shake");
}

function sendMessage(data) {
  const subject = `Project enquiry: ${data.service}`;
  const body = `${data.message}\n\n${data.name}\n${data.email}`;
  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (submitBtn.disabled) return;

  const inputs = [...form.querySelectorAll("[required]")];
  const results = inputs.map(validateField);
  if (results.includes(false)) {
    inputs.forEach((input, i) => { if (!results[i]) shake(input.closest(".field")); });
    note.textContent = "Please fix the highlighted fields.";
    note.className = "form-note is-error";
    inputs[results.indexOf(false)].focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  note.textContent = "";
  note.className = "form-note";
  setBusy(true);
  sendMessage(data);

  setTimeout(() => {
    setBusy(false);
    note.className = "form-note is-success";
    note.innerHTML = `<svg class="tick" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><span>Your email app should now be open with the message ready. If nothing opened, write to ${contactEmail}.</span>`;
  }, 700);
});

/* ---------- Start ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
observeReveal();
playHero();
placeFilterIndicator();
window.addEventListener("resize", () => {
  placeFilterIndicator();
  placeNavIndicator();
});
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    placeFilterIndicator();
    placeNavIndicator();
  });
}
