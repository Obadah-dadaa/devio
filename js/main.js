/* =========================================================
   Devio — main script
   ========================================================= */

/* ---------------------------------------------------------
   1. YOUR PROJECTS — edit this list to add / change projects.
   category: "web" | "design" | "software"
   image:    optional path like "images/seva.jpg" (leave "" to show a colored card)
   link:     live URL or GitHub link ("" hides the button)
   --------------------------------------------------------- */
const projects = [
  {
    title: "Seva Store",
    category: "web",
    description: "E-commerce storefront with color/size variants, stock tracking, admin panel and push notifications.",
    tags: ["Laravel", "MySQL", "JavaScript"],
    image: "",
    color: ["#6366f1", "#a855f7"],
    link: "",
  },
  {
    title: "Nova Clinic",
    category: "web",
    description: "Clinic management system for appointments, patients and doctors' schedules.",
    tags: ["Laravel", "Bootstrap"],
    image: "",
    color: ["#06b6d4", "#3b82f6"],
    link: "",
  },
  {
    title: "Al-Qalam ERP",
    category: "software",
    description: "ERP prototype covering inventory, invoicing and reporting for a growing business.",
    tags: ["PHP", "ERP", "Dashboards"],
    image: "",
    color: ["#f59e0b", "#ef4444"],
    link: "",
  },
  {
    title: "Tahselly",
    category: "software",
    description: "Payments and collections platform that keeps track of what's owed and what's paid.",
    tags: ["Laravel", "API"],
    image: "",
    color: ["#10b981", "#06b6d4"],
    link: "",
  },
  {
    title: "Devio Design System",
    category: "design",
    description: "Reusable UI kit with components, colors and typography for fast, consistent products.",
    tags: ["Figma", "UI Kit"],
    image: "",
    color: ["#ec4899", "#8b5cf6"],
    link: "",
  },
  {
    title: "Mobile Banking UX",
    category: "design",
    description: "UX research and high-fidelity prototype for a simple, friendly banking app.",
    tags: ["UX Research", "Prototype"],
    image: "",
    color: ["#3b82f6", "#22d3ee"],
    link: "",
  },
];

const categoryNames = { web: "Web App", design: "UI / UX", software: "Software" };

/* ---------- Render projects ---------- */
const grid = document.getElementById("projectsGrid");

function renderProjects() {
  grid.innerHTML = projects
    .map((p) => {
      const thumb = p.image
        ? `<img src="${p.image}" alt="${p.title}" loading="lazy" />`
        : `<span class="thumb-letter">${p.title.charAt(0)}</span>`;
      const link = p.link
        ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener">View project <span>→</span></a>`
        : "";
      return `
        <article class="project-card reveal" data-category="${p.category}">
          <div class="project-thumb" style="background: linear-gradient(135deg, ${p.color[0]}, ${p.color[1]})">${thumb}</div>
          <div class="project-body">
            <span class="project-cat">${categoryNames[p.category] || p.category}</span>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
            ${link}
          </div>
        </article>`;
    })
    .join("");
}
renderProjects();

/* ---------- Project filters ---------- */
document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  const filter = btn.dataset.filter;
  grid.querySelectorAll(".project-card").forEach((card) => {
    const show = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("hide", !show);
    card.classList.remove("fade-in");
    if (show) {
      void card.offsetWidth; // restart animation
      card.classList.add("fade-in");
    }
  });
});

/* ---------- Scroll reveal (with small stagger) ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.children].filter((el) => el.classList.contains("reveal"));
      const index = Math.max(0, siblings.indexOf(entry.target));
      entry.target.style.transitionDelay = `${Math.min(index, 5) * 80}ms`;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- Navbar: shrink on scroll + active link ---------- */
const navbar = document.getElementById("navbar");
const navAnchors = document.querySelectorAll(".nav-links a:not(.btn)");
const sections = document.querySelectorAll("main section[id]");

function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 30);

  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

/* ---------- Theme toggle (remembered) ---------- */
const root = document.documentElement;
try {
  const saved = localStorage.getItem("devio-theme");
  if (saved) root.dataset.theme = saved;
} catch (_) {}

document.getElementById("themeToggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("devio-theme", root.dataset.theme); } catch (_) {}
});

/* ---------- Typing effect in hero ---------- */
const words = ["web apps", "UI / UX", "software", "startups"];
const typedEl = document.getElementById("typed");
let wordIndex = 0, charIndex = words[0].length, deleting = true;

function typeLoop() {
  const word = words[wordIndex];
  typedEl.textContent = word.slice(0, charIndex);

  if (deleting) {
    charIndex--;
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
    }
    setTimeout(typeLoop, 50);
  } else {
    charIndex++;
    if (charIndex > words[wordIndex].length) {
      deleting = true;
      charIndex = words[wordIndex].length;
      return setTimeout(typeLoop, 1800);
    }
    setTimeout(typeLoop, 90);
  }
}
setTimeout(typeLoop, 2200);

/* ---------- Counters ---------- */
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

/* ---------- Service cards: glow follows the mouse ---------- */
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

/* ---------- Contact form (front-end only for now) ---------- */
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  form.querySelectorAll("[required]").forEach((input) => {
    const field = input.closest(".field");
    const ok = input.value.trim() !== "" && (input.type !== "email" || /^\S+@\S+\.\S+$/.test(input.value));
    field.classList.toggle("error", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    note.textContent = "Please fill in all fields correctly.";
    note.className = "form-note fail";
    return;
  }

  // TODO: connect to Laravel backend later (POST /api/contact)
  const btn = form.querySelector("button");
  btn.textContent = "Sending...";
  btn.disabled = true;
  setTimeout(() => {
    note.textContent = "Thanks! We'll get back to you within 24 hours. 🎉";
    note.className = "form-note success";
    btn.textContent = "Send Message";
    btn.disabled = false;
    form.reset();
  }, 900);
});

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
