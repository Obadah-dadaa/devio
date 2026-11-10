/* Devio brand kit builder.
   Writes the logo SVGs and colour tokens, then (with --render) exports PNGs, social images,
   business cards, site icons and the guidelines PDF through a local Chrome.

   node brand/build-brand.mjs            → SVGs + tokens only
   node brand/build-brand.mjs --render   → everything (needs puppeteer-core, see PUPPETEER below) */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const out = (p, s) => { mkdirSync(dirname(join(here, p)), { recursive: true }); writeFileSync(join(here, p), s); };

/* ---------- Colour ---------- */
export const color = {
  navy: "#070B18",
  navy2: "#0B1124",
  surface: "#101830",
  line: "#1C2748",
  line2: "#2B3968",
  royal: "#2A5CD6",
  royalLight: "#7B9EEE",
  mist: "#96A2C2",
  cloud: "#F3F5FA",
  white: "#FFFFFF",
};

/* ---------- Logo geometry ---------- */
// The logo is the name. Five letters from one 16-unit stroke and one 24-unit radius, square corners,
// and a square dot on the i: the only part that takes the accent colour.
const strokes = (fg, sw = 16) => `
  <g fill="none" stroke="${fg}" stroke-width="${sw}" stroke-linejoin="miter">
    <circle cx="34" cy="64" r="24"/>
    <path d="M58 4V96"/>
    <path d="M76 64H124A24 24 0 1 0 117 81"/>
    <path d="M140 36L164 86L188 36"/>
    <path d="M210 40V96"/>
    <circle cx="250" cy="64" r="24"/>
  </g>`;
const wordmark = (fg, dot) => `${strokes(fg)}
  <rect x="202" y="8" width="16" height="16" fill="${dot}"/>`;

// Icon: the d from the wordmark with the square dot beside it, for the places a name does not fit.
const glyph = (fg, dot) => `
  <g fill="none" stroke="${fg}" stroke-width="14">
    <circle cx="50" cy="70" r="21"/>
    <path d="M71 22V98"/>
  </g>
  <rect x="85" y="77" width="14" height="14" fill="${dot}"/>`;

const svg = (viewBox, body, title = "Devio") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${title}"><title>${title}</title>${body}\n</svg>\n`;

const logo = (fg, dot) => svg("2 4 280 92", wordmark(fg, dot));
const tile = (bg, fg, dot, rx = 26) => svg("0 0 120 120", `\n  <rect width="120" height="120" rx="${rx}" fill="${bg}"/>${glyph(fg, dot)}`);

const files = {
  "logo/devio-logo.svg": logo(color.navy, color.royal),
  "logo/devio-logo-reversed.svg": logo(color.white, color.royal),
  "logo/devio-logo-mono-navy.svg": logo(color.navy, color.navy),
  "logo/devio-logo-mono-white.svg": logo(color.white, color.white),
  "logo/devio-icon.svg": tile(color.navy, color.white, color.royal),
  "logo/devio-icon-royal.svg": tile(color.royal, color.white, color.white),
  "logo/devio-icon-light.svg": tile(color.cloud, color.navy, color.royal),
};
for (const [p, s] of Object.entries(files)) out(p, s);

out("tokens.css", `/* Devio brand tokens */
:root {
  --devio-navy: ${color.navy};
  --devio-navy-2: ${color.navy2};
  --devio-surface: ${color.surface};
  --devio-line: ${color.line};
  --devio-line-2: ${color.line2};
  --devio-royal: ${color.royal};
  --devio-royal-light: ${color.royalLight}; /* the accent for small text and icons on navy */
  --devio-mist: ${color.mist};
  --devio-cloud: ${color.cloud};
  --devio-white: ${color.white};

  --devio-font-display: "Sora", "Readex Pro", system-ui, sans-serif;
  --devio-font-body: "Readex Pro", system-ui, sans-serif; /* Latin and Arabic */
  --devio-font-mono: "JetBrains Mono", ui-monospace, monospace;

  --devio-radius: 18px;
  --devio-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
`);
out("tokens.json", JSON.stringify({
  color,
  font: { display: "Sora", body: "Readex Pro", arabic: "Readex Pro", mono: "JetBrains Mono" },
  radius: { sm: 8, md: 12, lg: 18, pill: 999 },
  motion: { ease: "cubic-bezier(0.22, 1, 0.36, 1)", fast: 180, base: 450, slow: 1000 },
}, null, 2) + "\n");

// Site icons share the icon tile.
writeFileSync(join(root, "assets/icons/favicon.svg"), files["logo/devio-icon.svg"]);
writeFileSync(join(root, "assets/icons/maskable.svg"), svg("0 0 120 120", `\n  <rect width="120" height="120" fill="${color.navy}"/>\n  <g transform="translate(21 21) scale(.65)">${glyph(color.white, color.royal)}</g>`));

console.log("SVGs and tokens written.");
if (!process.argv.includes("--render")) process.exit(0);

/* ---------- Raster exports ---------- */
const PUPPETEER = process.env.PUPPETEER_PATH || "puppeteer-core";
const CHROME = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const puppeteer = createRequire(import.meta.url)(PUPPETEER);
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();

const fonts = `<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Readex+Pro:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`;
const inline = (p) => files[p].replace(/<title>.*?<\/title>/, "");

async function shot(html, w, h, file, { transparent = false, scale = 1 } = {}) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: scale });
  await page.setContent(`<!doctype html><meta charset="utf-8">${fonts}<style>*{margin:0;box-sizing:border-box}html,body{width:${w}px;height:${h}px;overflow:hidden;background:${transparent ? "transparent" : color.navy}}</style>${html}`, { waitUntil: "load", timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  const path = file.startsWith("@") ? join(root, file.slice(1)) : join(here, file);
  mkdirSync(dirname(path), { recursive: true });
  await page.screenshot({ path, omitBackground: transparent });
}

// Logos as transparent PNGs
const fit = (p) => `<div style="width:100%;height:100%">${inline(p).replace("<svg ", '<svg style="width:100%;height:100%;display:block" ')}</div>`;
for (const [p, [w, h]] of Object.entries({
  "logo/devio-logo.svg": [1680, 552], "logo/devio-logo-reversed.svg": [1680, 552],
  "logo/devio-logo-mono-navy.svg": [1680, 552], "logo/devio-logo-mono-white.svg": [1680, 552],
  "logo/devio-icon.svg": [1024, 1024], "logo/devio-icon-royal.svg": [1024, 1024], "logo/devio-icon-light.svg": [1024, 1024],
})) await shot(fit(p), w, h, p.replace("logo/", "png/").replace(".svg", ".png"), { transparent: true });

// Site icons
for (const [f, s] of [["icon-512.png", 512], ["icon-192.png", 192], ["apple-touch-icon.png", 180], ["favicon-48.png", 48]])
  await shot(fit("logo/devio-icon.svg"), s, s, "@assets/icons/" + f, { transparent: f !== "apple-touch-icon.png" });
const flat = (bg, fg, dot, scale = 62) => `<div style="width:100%;height:100%;display:grid;place-items:center;background:${bg}"><svg viewBox="0 0 120 120" style="width:${scale}%">${glyph(fg, dot)}</svg></div>`;
await shot(flat(color.navy, color.white, color.royal), 512, 512, "@assets/icons/maskable-512.png");
await shot(flat(color.navy, color.white, color.royal), 192, 192, "@assets/icons/maskable-192.png");

// Social
const grid = `background-image:linear-gradient(${color.line} 1px,transparent 1px),linear-gradient(90deg,${color.line} 1px,transparent 1px);background-size:80px 80px;opacity:.5`;
const light = (at) => `<div style="position:absolute;inset:0;background:radial-gradient(${at},rgba(42,92,214,.2),transparent 70%)"></div>`;
const kick = (t) => `<p style="display:flex;align-items:center;gap:14px;font:500 20px 'JetBrains Mono','Readex Pro';color:${color.royalLight};margin-bottom:26px"><i style="width:32px;height:1px;background:${color.royal}"></i>${t}</p>`;
const og = (dir, kicker, h1, sub) => `
<div dir="${dir}" style="position:relative;width:100%;height:100%;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;color:${color.white};background:${color.navy};font-family:'Readex Pro'">
  ${light("760px 520px at 78% 30%")}
  <div style="position:absolute;inset:0;${grid};-webkit-mask-image:radial-gradient(800px 560px at 78% 30%,#000,transparent 75%)"></div>
  <div style="width:210px;position:relative" dir="ltr">${inline("logo/devio-logo-reversed.svg")}</div>
  <div style="position:relative">
    ${kick(kicker)}
    <h1 style="font:600 84px/${dir === "rtl" ? "1.3 'Readex Pro'" : "1.02 'Sora'"};letter-spacing:${dir === "rtl" ? "0" : "-.035em"};max-width:960px">${h1}</h1>
    <p style="font:300 27px/1.5 'Readex Pro';color:${color.mist};margin-top:26px;max-width:820px">${sub}</p>
  </div>
</div>`;
await shot(og("ltr", "Software studio · United Arab Emirates", `Software your business <span style="color:${color.royal}">runs on.</span>`, "Websites, mobile apps and business systems, designed and built by one team."), 1200, 630, "social/og-image.png");
await shot(og("rtl", "استوديو برمجيات · الإمارات العربية المتحدة", `برمجيات <span style="color:${color.royal}">يعتمد عليها</span> عملك.`, "مواقع وتطبيقات جوال وأنظمة أعمال، يصمّمها ويبنيها فريق واحد."), 1200, 630, "social/og-image-ar.png");
await shot(flat(color.navy, color.white, color.royal, 56), 1024, 1024, "social/avatar.png");
await shot(flat(color.royal, color.white, color.white, 56), 1024, 1024, "social/avatar-royal.png");
await shot(`
<div style="position:relative;width:100%;height:100%;padding:0 96px;display:flex;align-items:center;justify-content:space-between;color:${color.white};background:${color.navy};font-family:'Readex Pro'">
  ${light("700px 420px at 80% 50%")}
  <div style="position:absolute;inset:0;${grid};-webkit-mask-image:linear-gradient(90deg,transparent 20%,#000)"></div>
  <div style="width:300px;position:relative">${inline("logo/devio-logo-reversed.svg")}</div>
  <div style="position:relative;text-align:right">
    <p style="font:600 46px/1.1 'Sora';letter-spacing:-.03em">Software your business <span style="color:${color.royal}">runs on.</span></p>
    <p dir="rtl" style="font:400 28px/1.5 'Readex Pro';color:${color.mist};margin-top:8px">برمجيات يعتمد عليها عملك.</p>
    <p style="font:400 16px 'JetBrains Mono';color:${color.royalLight};margin-top:20px">Web · Mobile · Software · Design</p>
  </div>
</div>`, 1584, 396, "social/linkedin-banner.png");

// Business card, 90 × 55 mm at 12 px/mm
const cardFront = `
<div style="position:relative;width:100%;height:100%;display:grid;place-items:center;background:${color.navy}">
  <div style="position:absolute;inset:0;${grid};-webkit-mask-image:radial-gradient(520px 360px at 50% 50%,#000,transparent 75%)"></div>
  <div style="width:40%;position:relative">${inline("logo/devio-logo-reversed.svg")}</div>
</div>`;
const cardBack = `
<div style="width:100%;height:100%;padding:76px 84px;display:flex;flex-direction:column;justify-content:space-between;background:${color.cloud};color:${color.navy};font-family:'Readex Pro'">
  <div style="display:flex;justify-content:space-between;align-items:flex-start">
    <div><p style="font:600 46px 'Sora';letter-spacing:-.03em">Your Name</p><p style="font:400 25px 'Readex Pro';color:#55607d;margin-top:8px">Job title · المسمّى الوظيفي</p></div>
    <div style="width:150px">${inline("logo/devio-logo.svg")}</div>
  </div>
  <div style="font:400 24px/1.75 'JetBrains Mono';display:flex;justify-content:space-between;align-items:flex-end">
    <div><p>+971 00 000 0000</p><p>name@devio.com</p><p>devio.com</p></div>
    <p style="font:500 24px 'Readex Pro';color:${color.royal}" dir="rtl">برمجيات يعتمد عليها عملك.</p>
  </div>
</div>`;
await shot(cardFront, 1080, 660, "stationery/business-card-front.png");
await shot(cardBack, 1080, 660, "stationery/business-card-back.png");

// Guidelines PDF
await page.setViewport({ width: 1440, height: 810, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(join(here, "brand-guidelines.html")).href, { waitUntil: "load", timeout: 90000 });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: join(here, "Devio-Brand-Guidelines.pdf"), width: "1440px", height: "810px", printBackground: true });

await browser.close();
console.log("Raster exports written.");
