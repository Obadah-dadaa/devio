/* =========================================================
   Devio — main script
   ========================================================= */

/* ---------------------------------------------------------
   1. YOUR PROJECTS — edit this list to add or change projects.
   category: "web" | "software" | "design"
   result:   one line about what it changed for the client
   image:    optional screenshot, e.g. "images/seva.jpg" ("" shows no image)
   link:     live URL ("" hides the link)
   --------------------------------------------------------- */
const projects = [
  {
    title: "Seva Store",
    category: "web",
    description: "An online shop where customers pick colour and size, pay, and get updates on their order.",
    result: "Stock updates itself with every sale",
    image: "",
    link: "",
  },
  {
    title: "Nova Clinic",
    category: "web",
    description: "Appointment booking for a clinic, with patient records and each doctor's schedule in one place.",
    result: "Patients book online instead of calling",
    image: "",
    link: "",
  },
  {
    title: "Al-Qalam ERP",
    category: "software",
    description: "One system for stock, invoices and reports, built for a business that had outgrown spreadsheets.",
    result: "Monthly reports in minutes, not days",
    image: "",
    link: "",
  },
  {
    title: "Tahselly",
    category: "software",
    description: "A payments and collections tool that shows what each customer owes and what has been paid.",
    result: "Every payment tracked in one place",
    image: "",
    link: "",
  },
  {
    title: "Devio Design System",
    category: "design",
    description: "A shared set of buttons, colours and layouts that keeps every screen consistent.",
    result: "New screens designed in hours",
    image: "",
    link: "",
  },
  {
    title: "Mobile banking app",
    category: "design",
    description: "Research with real users and a clickable design for a simple, friendly banking app.",
    result: "Tested with real customers before building",
    image: "",
    link: "",
  },
];

const categoryNames = { web: "Website and app", software: "Business software", design: "Design" };
const contactEmail = "hello@devio.com";

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const staggerStep = 70;

/* ---------- Count-up for numbers (runs once per container) ---------- */
function countUp(container) {
  if (reduceMotion.matches || container.dataset.counted) return;
  container.dataset.counted = "1";
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
            if (el.querySelector("[data-count]")) countUp(el);
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
  const trust = document.querySelector(".trust");
  if (trust) setTimeout(() => countUp(trust), 500);
}

/* ---------- Hero demo: Idea → Design → Launch, plays on its own ---------- */
const demo = document.getElementById("demo");
const demoSteps = [...demo.querySelectorAll(".demo-step")];
const demoCaption = document.getElementById("demoCaption");
const stageOrder = ["idea", "design", "launch"];
const stageInfo = {
  idea: { time: "3s", caption: "We sketch every screen around what your customers need." },
  design: { time: "3.4s", caption: "You click through the real design before anything is built." },
  launch: { time: "4.6s", caption: "It goes live, and the enquiries start coming in." },
};

function setStage(stage) {
  demo.dataset.stage = stage;
  demo.style.setProperty("--stage-time", stageInfo[stage].time);
  demoSteps.forEach((s) => {
    const on = s.dataset.stage === stage;
    s.setAttribute("aria-selected", String(on));
    s.tabIndex = on ? 0 : -1;
  });
  demoCaption.textContent = stageInfo[stage].caption;
  demoCaption.classList.remove("swap");
  void demoCaption.offsetWidth; // restart the caption fade
  demoCaption.classList.add("swap");
}

if (reduceMotion.matches) demo.classList.add("is-manual");
reduceMotion.addEventListener("change", (e) => demo.classList.toggle("is-manual", e.matches));

// the progress line under the current step is a CSS animation; when it finishes, move on
demo.addEventListener("animationend", (e) => {
  if (e.animationName !== "fill" || demo.classList.contains("is-manual")) return;
  const next = stageOrder[(stageOrder.indexOf(demo.dataset.stage) + 1) % stageOrder.length];
  setStage(next);
});
demo.querySelector(".demo-steps").addEventListener("click", (e) => {
  const step = e.target.closest(".demo-step");
  if (step) setStage(step.dataset.stage);
});
demo.querySelector(".demo-steps").addEventListener("keydown", (e) => {
  const i = stageOrder.indexOf(demo.dataset.stage);
  let next = null;
  if (e.key === "ArrowRight") next = stageOrder[(i + 1) % 3];
  if (e.key === "ArrowLeft") next = stageOrder[(i + 2) % 3];
  if (next) {
    e.preventDefault();
    setStage(next);
    demoSteps[stageOrder.indexOf(next)].focus();
  }
});
// pause while someone is looking closely or using the keyboard inside it
const pauseDemo = (on) => demo.classList.toggle("is-paused", on);
demo.addEventListener("pointerenter", () => pauseDemo(true));
demo.addEventListener("pointerleave", () => pauseDemo(demo.contains(document.activeElement)));
demo.addEventListener("focusin", () => pauseDemo(true));
demo.addEventListener("focusout", (e) => { if (!demo.contains(e.relatedTarget)) pauseDemo(false); });
// and while it is scrolled out of view
if ("IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => demo.classList.toggle("is-offscreen", !entry.isIntersecting)).observe(demo);
}
setStage("idea");

/* ---------- Services: pick one, see what you get ---------- */
const svcTabs = [...document.querySelectorAll(".svc-tab")];
const svcMarker = document.querySelector(".svc-marker");

function placeSvcMarker() {
  const tab = svcTabs.find((t) => t.getAttribute("aria-selected") === "true");
  if (!tab || !svcMarker) return;
  svcMarker.style.setProperty("--y", `${tab.offsetTop}px`);
  svcMarker.style.setProperty("--h", tab.offsetHeight / 100);
}

function selectSvc(tab, { focus = false } = {}) {
  svcTabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute("aria-controls"));
    panel.hidden = !on;
    if (on) {
      panel.classList.remove("swap");
      void panel.offsetWidth;
      panel.classList.add("swap");
    }
  });
  placeSvcMarker();
  if (focus) tab.focus();
  // in the chip layout, bring the chosen chip fully into view without moving the page
  const row = tab.parentElement;
  if (row.scrollWidth > row.clientWidth) {
    row.scrollTo({ left: tab.offsetLeft - 16, behavior: reduceMotion.matches ? "auto" : "smooth" });
  }
}

svcTabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectSvc(tab));
  tab.addEventListener("keydown", (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let target = null;
    if (e.key in keys) target = svcTabs[(i + keys[e.key] + svcTabs.length) % svcTabs.length];
    if (e.key === "Home") target = svcTabs[0];
    if (e.key === "End") target = svcTabs[svcTabs.length - 1];
    if (target) {
      e.preventDefault();
      selectSvc(target, { focus: true });
    }
  });
});

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
  const result = p.result ? `<div class="project-result"><p>${escapeHtml(p.result)}</p></div>` : "";
  const link = p.link
    ? `<a class="text-link project-link" href="${escapeHtml(p.link)}" target="_blank" rel="noopener">See it live <span aria-hidden="true">↗</span></a>`
    : "";
  const cls = entering ? "project is-entering" : "project reveal";
  return `
    <article class="${cls}" style="--d:${Math.min(i, 6) * 60}ms">
      ${thumb}
      <div class="project-body">
        <span class="project-cat">${escapeHtml(categoryNames[p.category] || p.category)}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
        ${result}
        ${link}
      </div>
    </article>`;
}

function emptyState() {
  const filtered = activeFilter !== "all" && projects.length > 0;
  return `
    <div class="empty is-entering">
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>
      <p>${filtered ? "Nothing in this category yet." : "Projects will appear here once they are added to js/main.js."}</p>
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
    m.setAttribute("content", currentTheme() === "dark" ? "#0b0d17" : "#f6f7fb")
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
const serviceField = form.querySelector("fieldset.field");
serviceField.setAttribute("aria-describedby", "service-error");

const rules = {
  name: (v) => (v ? "" : "Please tell us your name."),
  email: (v) =>
    !v ? "Please add your email so we can reply." : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "That email address doesn't look complete.",
  service: (v) => (v ? "" : "Pick the closest option, or choose \"Not sure yet\"."),
  message: (v) => (v.length >= 10 ? "" : "A sentence or two about your idea helps us reply properly."),
};

const valueOf = (name) => {
  if (name === "service") return (form.querySelector('input[name="service"]:checked') || {}).value || "";
  return form.elements[name].value.trim();
};

function validate(name) {
  const message = rules[name](valueOf(name));
  const field = name === "service" ? serviceField : form.elements[name].closest(".field");
  field.classList.toggle("has-error", Boolean(message));
  if (name !== "service") form.elements[name].setAttribute("aria-invalid", String(Boolean(message)));
  document.getElementById(`${name}-error`).textContent = message;
  return !message;
}

["name", "email", "message"].forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("blur", () => { if (input.value.trim()) validate(name); });
  input.addEventListener("input", () => { if (input.closest(".field").classList.contains("has-error")) validate(name); });
});
form.querySelectorAll('input[name="service"]').forEach((r) => r.addEventListener("change", () => validate("service")));

function setBusy(busy) {
  form.setAttribute("aria-busy", String(busy));
  submitBtn.disabled = busy;
  submitBtn.setAttribute("aria-busy", String(busy));
  submitBtn.innerHTML = busy
    ? '<span class="spinner" aria-hidden="true"></span><span class="btn-label">Opening email…</span>'
    : '<span class="btn-label">Send my idea</span>';
  form.querySelectorAll("input, textarea").forEach((el) => {
    if (el.type === "radio") el.disabled = busy;
    else el.readOnly = busy;
  });
}

function shake(field) {
  field.classList.remove("shake");
  void field.offsetWidth; // restart the animation
  field.classList.add("shake");
}

function sendMessage(data) {
  const subject = `New project idea: ${data.service}`;
  const body = `${data.message}\n\n${data.name}\n${data.email}`;
  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (submitBtn.disabled) return;

  const names = ["name", "email", "service", "message"];
  const results = names.map(validate);
  if (results.includes(false)) {
    names.forEach((name, i) => {
      if (results[i]) return;
      shake(name === "service" ? serviceField : form.elements[name].closest(".field"));
    });
    note.textContent = "Please fix the highlighted fields.";
    note.className = "form-note is-error";
    const first = names[results.indexOf(false)];
    (first === "service" ? form.querySelector('input[name="service"]') : form.elements[first]).focus();
    return;
  }

  const data = { name: valueOf("name"), email: valueOf("email"), service: valueOf("service"), message: valueOf("message") };
  note.textContent = "";
  note.className = "form-note";
  setBusy(true);
  sendMessage(data);

  setTimeout(() => {
    setBusy(false);
    note.className = "form-note is-success";
    note.innerHTML = `<svg class="tick" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><span>Your email app should now be open with your idea ready to send. If nothing opened, write to ${contactEmail}.</span>`;
  }, 700);
});

/* ---------- Start ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
observeReveal();
playHero();
placeFilterIndicator();
placeSvcMarker();
const relayout = () => {
  placeFilterIndicator();
  placeNavIndicator();
  placeSvcMarker();
};
window.addEventListener("resize", relayout);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
