/* =========================================================
   Devio — main script
   ========================================================= */

const contactEmail = "obadah.dada1999@gmail.com";
const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const staggerStep = 70;

/* ---------------------------------------------------------
   1. LANGUAGE
   English lives in index.html. Arabic lives here, under the same
   data-i18n keys. To change a line, edit both places.
   --------------------------------------------------------- */
const ar = {
  skip: "تخطَّ إلى المحتوى",
  brandLabel: "ديفيو",
  navLabel: "القائمة الرئيسية",
  navServices: "خدماتنا",
  navProcess: "كيف نعمل",
  navWork: "أعمالنا",
  navWhy: "لماذا ديفيو",
  cta: "ابدأ مشروعك",

  heroKicker: "استوديو برمجيات · الإمارات العربية المتحدة",
  heroTitle: "برمجيات <em>يعتمد عليها</em> عملك.",
  heroLead: "مواقع وتطبيقات جوال وأنظمة أعمال، يصمّمها ويبنيها فريق واحد، من الفكرة الأولى إلى يوم الإطلاق.",
  heroWork: "شاهد أعمالنا",
  strip1T: "الويب",
  strip1P: "مواقع وتطبيقات ويب",
  strip2T: "الجوال",
  strip2P: "آيفون وأندرويد",
  strip3T: "التصميم",
  strip3P: "هوية ومنتجات",
  heroArtLabel: "كيف يتكوّن مشروعك: تخطيط ثم تصميم ثم بناء ثم إطلاق",
  hsPlan: "التخطيط",
  hsDesign: "التصميم",
  hsBuild: "البناء",
  hsLaunch: "الإطلاق",
  tk1: "مواقع",
  tk2: "تطبيقات جوال",
  tk3: "متاجر إلكترونية",
  tk4: "أنظمة حجز",
  tk5: "بوابات عملاء",
  tk6: "لوحات تحكم",
  tk7: "أنظمة أعمال",
  tk8: "هوية بصرية",
  statement: "نخطّط ونصمّم ونبني ونطلق. فريق واحد، بالعربية والإنجليزية، معك في كل خطوة.",

  svcTitle: "ماذا نبني لك",
  svcLead: "اختر ما تحتاجه. كل مشروع يصمّمه ويبنيه ويختبره ويطلقه الفريق نفسه.",
  tabSite: "مواقع تجلب لك العملاء",
  tabApp: "طلبات وحجوزات وبوابات إلكترونية",
  tabMobile: "تطبيقات جوال لآيفون وأندرويد",
  tabSoftware: "أنظمة لإدارة أعمالك",
  tabDesign: "تصميم سهل الاستخدام",
  tabBrand: "شعار وهوية بصرية",
  siteH: "موقع يحوّل الزوّار إلى طلبات.",
  siteP: "واضح وسريع ويبعث على الثقة. يفهم الزائر ما تقدّمه خلال ثوانٍ ويعرف كيف يتواصل معك.",
  site1: "صفحات تحدّثها بنفسك دون الحاجة إلى مبرمج",
  site2: "نماذج تواصل وحجز تصل مباشرة إلى بريدك",
  site3: "مهيّأ للظهور في بحث جوجل من اليوم الأول",
  appH: "دع عملاءك يطلبون ويحجزون ويدفعون دون أن يتصلوا بك.",
  appP: "عملك مفتوح بعد ساعات الدوام. العميل يخدم نفسه، وأنت ترى كل الطلبات في مكان واحد.",
  app1: "طلب وحجز ودفع إلكتروني",
  app2: "حسابات للعملاء فيها سجلّهم وحالة طلباتهم",
  app3: "لوحة إدارة بسيطة لفريقك",
  mobileH: "عملك في جيب عميلك.",
  mobileP: "تطبيق يفتحه عملاؤك ليطلبوا ويحجزوا ويدفعوا ويتابعوا، مع إشعارات تعيدهم إليك.",
  mobile1: "تطبيق واحد لآيفون وأندرويد",
  mobile2: "العربية والإنجليزية من الشاشة الأولى",
  mobile3: "ننشره لك على متجر آبل ومتجر جوجل",
  softH: "استبدل جداول الإكسل والأوراق بنظام واحد بسيط.",
  softP: "نظام مبني على طريقة عملك الحالية: المخزون والفواتير والمدفوعات والتقارير في مكان واحد.",
  soft1: "نسخ أقل بين الملفات وأخطاء أقل",
  soft2: "تقارير جاهزة وقت حاجتك",
  soft3: "دخول لكل فريقك، كلٌّ بصلاحياته",
  designH: "منتج يبدو فاخراً واستخدامه سهل.",
  designP: "نصمّم كل شاشة أولاً وندعك تجرّبها، ليفهمها عملاؤك دون شرح.",
  design1: "تصميم تفاعلي تجرّبه قبل بناء أي شيء",
  design2: "مهيّأ للجوال والتابلت والحاسوب",
  design3: "مظهر واحد متناسق في كل الصفحات",
  brandH: "علامة يعرفها الناس من نظرة.",
  brandP: "شعار وألوان وخطوط وقواعد استخدامها، ليبدو كل ما تنشره شبيهاً بك.",
  brand1: "شعار بكل الصيغ التي ستحتاجها",
  brand2: "ألوان وخطوط تناسب العربية والإنجليزية",
  brand3: "دليل هوية وقوالب للتواصل الاجتماعي والمطبوعات",

  procKicker: "طريقة العمل",
  procTitle: "أربع خطوات من الفكرة إلى الإطلاق",
  procLead: "تعرف دائماً أين وصل مشروعك وما التالي.",
  step1H: "أخبرنا بفكرتك",
  step1P: "مكالمة قصيرة عن أهدافك وعملائك. لا تحتاج إلى أي معرفة تقنية.",
  step1G: "تحصل على خطة واضحة للنسخة الأولى",
  step2H: "شاهدها مصمَّمة",
  step2P: "نحوّل الخطة إلى شاشات حقيقية تتصفحها وتعدّل عليها.",
  step2G: "تحصل على تصميم تجرّبه قبل البناء",
  step3H: "تابع بناءها",
  step3P: "عرض قصير كل أسبوع، لتوجّه العمل مبكراً ودون مفاجآت.",
  step3G: "تحصل على تقدّم فعلي كل أسبوع",
  step4H: "أطلق وتوسّع",
  step4P: "ننشره ونراقب كيف يستخدمه الناس ونواصل تطويره معك.",
  step4G: "تحصل على منتج يعمل ودعم مستمر",

  workKicker: "مشروع مميّز",
  workTitle: "تحصيلي: فواتير غير مدفوعة تتابع نفسها",
  workLead: "تخسر الشركات أسابيع في ملاحقة المدفوعات المتأخرة. صمّمنا وبنينا وأطلقنا منتجاً يقوم بالمتابعة عنها.",
  caseName: "تحصيلي",
  caseLabel: "شاشات من تحصيلي",
  altDashboard: "لوحة المالك في تحصيلي: نسبة التحصيل والمستحقات ومخطط المفوتر مقابل المحصَّل",
  altInvoices: "قائمة الفواتير المتأخرة في تحصيلي",
  altReminders: "مركز التذكيرات في تحصيلي",
  altAging: "تقرير أعمار الديون في تحصيلي",
  altImport: "استيراد الفواتير من إكسل إلى تحصيلي",
  shotDashboard: "لوحة التحكم",
  shotInvoices: "الفواتير",
  shotReminders: "التذكيرات",
  shotAging: "أعمار الديون",
  shotImport: "استيراد إكسل",
  caseMeta: "نظام أعمال، يعمل حالياً في الإمارات",
  caseText: "يأخذ تحصيلي فواتير الشركة مباشرة من إكسل، ويذكّر كل عميل بالبريد وواتساب قبل موعد الاستحقاق وبعده، ويعرض المستحق والمتأخر والمحصَّل في شاشة واحدة.",
  case1: "التذكيرات تُرسل تلقائياً كل صباح",
  case2: "كل عميل يُذكَّر بالعربية أو الإنجليزية",
  case3: "للمالك والمدير والموظف واجهة خاصة بكلٍّ منهم",
  case4: "الاشتراكات تُدفع إلكترونياً بالدرهم",
  caseDidT: "ما قمنا به",
  caseDid: "تخطيط المنتج، تصميم الواجهات، البرمجة، الإطلاق وفيلم الإطلاق",
  caseVisit: "زُر الموقع",
  caseFilm: "شاهد الفيلم (دقيقة)",
  moreTitle: "أعمال أخرى من الاستوديو",
  altSeva: "الصفحة الرئيسية لمتجر سيفا للأزياء",
  altCladflo: "الصفحة الرئيسية لكلادفلو مع لوحة العملاء",
  moreVisit: "زُر الموقع",
  more1H: "متجر سيفا",
  more1M: "متجر إلكتروني، صُمّم للسوق المصري ويعمل فيه",
  more2M: "نظام مبيعات، صُمّم لدبي",
  more1P: "متجر أزياء إلكتروني يختار فيه العميل اللون والمقاس ويدفع ويتابع طلبه حتى باب المنزل.",
  more1R: "المخزون يتحدّث تلقائياً مع كل عملية بيع",
  more1Go: "زُر متجر سيفا",
  more2H: "كلادفلو",
  more2P: "كل عميل ومتابعة ومحضر اجتماع في مكان واحد لفريق المبيعات، مع تذكيرات على التقويم.",
  more2R: "لا متابعة تُنسى",
  more2Go: "زُر كلادفلو",

  whyTitle: "لماذا تختارنا الشركات",
  whyLead: "نحن فريق صغير عن قصد. من تلتقيهم هم من يصمّمون منتجك ويبنونه.",
  langCardT: "شاهد هذه الصفحة بالإنجليزية",
  langCardP: "كل ما نبنيه يبدّل لغته بهذه الطريقة.",
  why1H: "العربية والإنجليزية كما يجب",
  why1P: "كل شاشة تُقرأ من اليمين إلى اليسار ومن اليسار إلى اليمين، وتصل الرسائل إلى عملائك بلغتهم.",
  why2H: "تتحدث مع من يبني منتجك",
  why2P: "بلا وسطاء. رسالتك تصل إلى المصمّم أو المبرمج مباشرة، وتحصل على جواب واضح.",
  why3H: "ترى التقدّم كل أسبوع",
  why3P: "عرض قصير كل أسبوع يتيح لك تغيير الاتجاه مبكراً، لا بعد صرف الميزانية.",
  why4H: "نبقى معك بعد الإطلاق",
  why4P: "نراقب كيف يُستخدم منتجك ونواصل تطويره معك كلما كبر عملك.",

  contactKicker: "تواصل معنا",
  contactTitle: "أخبرنا بفكرتك، ونريك ما يمكن تحقيقه.",
  contactLead: "اكتب لنا بضعة أسطر عمّا تريد بناءه. نردّ خلال 24 ساعة بأسئلة وخطة أولية، مجاناً.",
  contactPlace: "نعمل مع الشركات في أنحاء الإمارات",
  fName: "اسمك",
  fEmail: "البريد الإلكتروني",
  fNeed: "ماذا تحتاج؟",
  c1: "موقع",
  c2: "تطبيق جوال",
  c3: "نظام أعمال",
  c4: "تصميم أو هوية",
  c5: "لست متأكداً بعد",
  fMsg: "عن فكرتك",
  fHint: "ماذا يجب أن يفعل، ولمن هو، وهل لديك موعد تستهدفه؟",
  fSend: "أرسل فكرتي",

  footKicker: "الخطوة التالية",
  footTitle: "عندك فكرة؟ لنضعها على الشاشة.",
  footStatus: "نستقبل مشاريع جديدة",
  footStudio: "الاستوديو",
  fs1: "مواقع",
  fs2: "الطلب والحجز",
  fs3: "تطبيقات جوال",
  fs4: "أنظمة أعمال",
  fs5: "تصميم المنتجات",
  fs6: "هوية بصرية",
  footPlace: "دبي، الإمارات العربية المتحدة",
  footRights: "ديفيو. جميع الحقوق محفوظة.",
  footTime: "توقيت الإمارات",
  footLegal: "مواقع وتطبيقات وأنظمة للشركات الطموحة.",
  footTop: "العودة للأعلى",
  filmLabel: "فيلم إطلاق تحصيلي",
  close: "إغلاق",
};

/* lines that only exist in script: captions, form messages, button labels */
const ui = {
  en: {
    title: document.title,
    description: document.querySelector('meta[name="description"]').content,
    langLabel: "AR",
    langAria: "View this page in Arabic",
    themeLabel: "Light theme",
    capPlan: "First we map what your business needs.",
    capDesign: "Then every screen is designed for you to try.",
    capBuild: "We build it and show you progress every week.",
    capLaunch: "It goes live, and we stay to keep improving it.",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    capDashboard: "The owner sees what is due, overdue and collected on one screen.",
    capInvoices: "Overdue invoices, with who owes what and for how long.",
    capReminders: "Every reminder, who it went to and when.",
    capAging: "The aging report shows how old each debt is, client by client.",
    capImport: "A whole sheet of invoices comes in from Excel in one go.",
    errName: "Please tell us your name.",
    errEmailEmpty: "Please add your email so we can reply.",
    errEmail: "That email address doesn't look complete.",
    errService: 'Pick the closest option, or choose "Not sure yet".',
    errMessage: "A sentence or two about your idea helps us reply properly.",
    errForm: "Please fix the highlighted fields.",
    busy: "Opening email…",
    sent: "Your email app should now be open with your idea ready to send. If nothing opened, write to",
    subject: "New project idea:",
  },
  ar: {
    title: "ديفيو · مواقع وتطبيقات وبرمجيات يعتمد عليها عملك",
    description: "ديفيو تصمّم وتبني وتطلق المواقع وتطبيقات الجوال وأنظمة الأعمال للشركات في الإمارات، بالعربية والإنجليزية.",
    langLabel: "EN",
    langAria: "عرض الصفحة بالإنجليزية",
    themeLabel: "المظهر الفاتح",
    capPlan: "نبدأ برسم ما يحتاجه عملك.",
    capDesign: "ثم نصمّم كل شاشة لتجرّبها.",
    capBuild: "نبنيه ونريك التقدّم كل أسبوع.",
    capLaunch: "ينطلق، ونبقى معك لنطوّره.",
    menuOpen: "فتح القائمة",
    menuClose: "إغلاق القائمة",
    capDashboard: "يرى المالك المستحق والمتأخر والمحصَّل في شاشة واحدة.",
    capInvoices: "الفواتير المتأخرة: من عليه ماذا، ومنذ متى.",
    capReminders: "كل تذكير، لمن أُرسل ومتى.",
    capAging: "تقرير أعمار الديون يبيّن عمر كل دين، عميلاً بعميل.",
    capImport: "جدول فواتير كامل يدخل من إكسل دفعة واحدة.",
    errName: "من فضلك اكتب اسمك.",
    errEmailEmpty: "أضف بريدك الإلكتروني لنتمكن من الرد.",
    errEmail: "يبدو أن عنوان البريد غير مكتمل.",
    errService: "اختر الأقرب لما تحتاجه، أو «لست متأكداً بعد».",
    errMessage: "جملة أو جملتان عن فكرتك تساعدنا على الرد كما يجب.",
    errForm: "من فضلك صحّح الحقول المظلّلة.",
    busy: "جارٍ فتح البريد…",
    sent: "من المفترض أن تطبيق البريد فُتح الآن وفكرتك جاهزة للإرسال. إن لم يُفتح شيء، راسلنا على",
    subject: "فكرة مشروع جديد:",
  },
};

let lang = root.lang === "ar" ? "ar" : "en";
const t = (key) => ui[lang][key];
const isRtl = () => lang === "ar";

// keep the English that shipped in the HTML, so switching back needs no second dictionary
const textNodes = [...document.querySelectorAll("[data-i18n]")].map((el) => ({ el, key: el.dataset.i18n, en: el.innerHTML.trim() }));
const labelNodes = [...document.querySelectorAll("[data-i18n-label]")].map((el) => ({ el, key: el.dataset.i18nLabel, en: el.getAttribute("aria-label") }));
const altNodes = [...document.querySelectorAll("[data-i18n-alt]")].map((el) => ({ el, key: el.dataset.i18nAlt, en: el.alt }));
const pick = (node) => (lang === "ar" && ar[node.key]) || node.en;

const langToggles = [...document.querySelectorAll("[data-lang-toggle]")];
const langLabels = [...document.querySelectorAll("[data-lang-label]")];
const langListeners = []; // parts of the page that hold script-made text re-render through these

function applyLang() {
  root.lang = lang;
  root.dir = isRtl() ? "rtl" : "ltr";
  textNodes.forEach((n) => { n.el.innerHTML = pick(n); });
  labelNodes.forEach((n) => n.el.setAttribute("aria-label", pick(n)));
  altNodes.forEach((n) => { n.el.alt = pick(n); });
  document.title = t("title");
  document.querySelector('meta[name="description"]').content = t("description");
  // each page names the other language in its own words, so nothing on it is in a second language
  langLabels.forEach((el) => { el.textContent = t("langLabel"); });
  langToggles.forEach((btn) => { if (btn.querySelector("[data-lang-label]")) btn.setAttribute("aria-label", t("langAria")); });
  langListeners.forEach((fn) => fn());
}

let langTimer;
function setLang(next) {
  if (next === lang) return;
  lang = next;
  try { localStorage.setItem("devio-lang", lang); } catch (_) {}
  applyLang();
  relayout();
  root.classList.add("lang-switching");
  clearTimeout(langTimer);
  langTimer = setTimeout(() => root.classList.remove("lang-switching"), 500);
}
const toggleLang = () => setLang(isRtl() ? "en" : "ar");
langToggles.forEach((btn) => btn.addEventListener("click", toggleLang));

/* ---------- Theme: dark by default, light on request, remembered ---------- */
const themeToggle = document.getElementById("themeToggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const themeListeners = []; // script-drawn parts (the background canvas) recolour through these
let theme = root.dataset.theme === "light" ? "light" : "dark";

function applyTheme() {
  root.dataset.theme = theme;
  themeMeta.content = theme === "light" ? "#f5f7fc" : "#070b18";
  themeToggle.setAttribute("aria-checked", String(theme === "light"));
  themeToggle.setAttribute("aria-label", t("themeLabel"));
  themeListeners.forEach((fn) => fn());
}
themeToggle.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  try { localStorage.setItem("devio-theme", theme); } catch (_) {}
  applyTheme();
});
langListeners.push(applyTheme);

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
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      )
    : null;

function observeReveal(scope = document) {
  scope.querySelectorAll(".reveal:not(.in)").forEach((el) => {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add("in");
  });
}

/* ---------- Split text: wrap each word so it can move or light up on its own ----------
   Runs again after every language change, because the text is replaced. */
function splitWords(el) {
  let i = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 1) { walk(child); return; }
      if (child.nodeType !== 3) return;
      const frag = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(" "); return; }
        const word = document.createElement("span");
        const inner = document.createElement("span");
        word.className = "w";
        inner.textContent = part;
        inner.style.setProperty("--i", i++);
        word.append(inner);
        frag.append(word);
      });
      child.replaceWith(frag);
    });
  };
  walk(el);
}
const splitNodes = [...document.querySelectorAll("[data-split]")];
const statement = document.getElementById("statement");
let statementWords = [];
langListeners.push(() => {
  splitNodes.forEach(splitWords);
  statementWords = [...statement.querySelectorAll(".w")];
});

/* ---------- Hero: one staggered entrance ---------- */
function playHero() {
  requestAnimationFrame(() => document.querySelector(".hero-words").classList.add("in"));
  document.querySelectorAll(".hero-in").forEach((el, i) => {
    el.style.setProperty("--d", `${250 + i * 90}ms`);
    requestAnimationFrame(() => el.classList.add("in"));
  });
}

/* ---------- Stage viewer ----------
   A frame with steps under it that plays through on its own: the hero drawing and the Tahselly screens.
   stages: { key: { time, caption } }, caption being a key in ui. */
function stageViewer(el, stages, onChange) {
  const steps = [...el.querySelectorAll(".demo-step")];
  const caption = el.querySelector(".demo-caption");
  const order = steps.map((s) => s.dataset.key);

  function set(key, { announce = true } = {}) {
    el.dataset.stage = key;
    el.style.setProperty("--stage-time", stages[key].time);
    steps.forEach((s) => {
      const on = s.dataset.key === key;
      s.setAttribute("aria-selected", String(on));
      s.tabIndex = on ? 0 : -1;
    });
    caption.textContent = t(stages[key].caption);
    if (announce) {
      caption.classList.remove("swap");
      void caption.offsetWidth; // restart the caption fade
      caption.classList.add("swap");
    }
    if (onChange) onChange(key);
  }
  const step = (by) => order[(order.indexOf(el.dataset.stage) + by + order.length) % order.length];

  if (reduceMotion.matches) el.classList.add("is-manual");
  reduceMotion.addEventListener("change", (e) => el.classList.toggle("is-manual", e.matches));

  // the progress line over the current step is a CSS animation; when it finishes, move on
  el.addEventListener("animationend", (e) => {
    if (e.animationName !== "fill" || el.classList.contains("is-manual")) return;
    set(step(1));
  });
  const row = el.querySelector(".demo-steps");
  row.addEventListener("click", (e) => {
    const btn = e.target.closest(".demo-step");
    if (btn) set(btn.dataset.key);
  });
  row.addEventListener("keydown", (e) => {
    const forward = isRtl() ? "ArrowLeft" : "ArrowRight";
    const back = isRtl() ? "ArrowRight" : "ArrowLeft";
    const next = e.key === forward ? step(1) : e.key === back ? step(-1) : null;
    if (!next) return;
    e.preventDefault();
    set(next);
    steps[order.indexOf(next)].focus();
  });
  // pause while someone is looking closely or using the keyboard inside it
  const pause = (on) => el.classList.toggle("is-paused", on);
  el.addEventListener("pointerenter", () => pause(true));
  el.addEventListener("pointerleave", () => pause(el.contains(document.activeElement)));
  el.addEventListener("focusin", () => pause(true));
  el.addEventListener("focusout", (e) => { if (!el.contains(e.relatedTarget)) pause(false); });
  // and while it is scrolled out of view
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => el.classList.toggle("is-offscreen", !entry.isIntersecting)).observe(el);
  }
  langListeners.push(() => { caption.textContent = t(stages[el.dataset.stage].caption); });
  set(order[0], { announce: false });
}

/* ---------- Hero: a product comes together, stage by stage ---------- */
const heroArt = document.getElementById("heroArt");
const heroStages = ["plan", "design", "build", "launch"];
stageViewer(
  heroArt,
  {
    plan: { time: "3.6s", caption: "capPlan" },
    design: { time: "3.2s", caption: "capDesign" },
    build: { time: "3.8s", caption: "capBuild" },
    launch: { time: "4.6s", caption: "capLaunch" },
  },
  (key) => {
    // s1, s2, s3 stay on once their stage has passed, so each stage builds on the one before
    const at = heroStages.indexOf(key);
    [1, 2, 3].forEach((n) => heroArt.classList.toggle(`s${n}`, at >= n));
  }
);
// the phone and the task list lean a little towards the pointer
const hero = document.querySelector(".hero");
hero.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse" || reduceMotion.matches) return;
  const box = hero.getBoundingClientRect();
  heroArt.style.setProperty("--mx", (((e.clientX - box.left) / box.width) * 2 - 1).toFixed(3));
  heroArt.style.setProperty("--my", (((e.clientY - box.top) / box.height) * 2 - 1).toFixed(3));
});
hero.addEventListener("pointerleave", () => {
  heroArt.style.setProperty("--mx", 0);
  heroArt.style.setProperty("--my", 0);
});

const caseViewer = document.getElementById("caseViewer");
const shots = [...caseViewer.querySelectorAll(".shot")];
stageViewer(
  caseViewer,
  {
    dashboard: { time: "5s", caption: "capDashboard" },
    invoices: { time: "4.5s", caption: "capInvoices" },
    reminders: { time: "4.5s", caption: "capReminders" },
    aging: { time: "4.5s", caption: "capAging" },
    import: { time: "4.5s", caption: "capImport" },
  },
  (key) => {
    shots.forEach((img) => {
      const on = img.dataset.key === key;
      if (on) img.loading = "eager";
      img.classList.toggle("is-on", on);
    });
    // on phones the step names scroll sideways: keep the current one in view
    const row = caseViewer.querySelector(".demo-steps");
    const btn = row.querySelector('[aria-selected="true"]');
    if (row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: btn.offsetLeft - row.offsetLeft - 16, behavior: reduceMotion.matches ? "auto" : "smooth" });
    }
  }
);

/* ---------- Launch film ---------- */
const filmDialog = document.getElementById("filmDialog");
const filmVideo = document.getElementById("filmVideo");

document.getElementById("filmOpen").addEventListener("click", () => {
  const src = `assets/work/tahselly/promo-${lang}.mp4`;
  if (filmVideo.getAttribute("src") !== src) {
    filmVideo.poster = `assets/work/tahselly/poster-${lang}.webp`;
    filmVideo.src = src;
  }
  if (!filmDialog.showModal) { window.open(src, "_blank", "noopener"); return; }
  filmDialog.showModal();
  filmVideo.play().catch(() => {}); // if autoplay is refused the controls are right there
});
document.getElementById("filmClose").addEventListener("click", () => { filmVideo.pause(); filmDialog.close(); });
filmDialog.addEventListener("click", (e) => { if (e.target === filmDialog) filmDialog.close(); });
filmDialog.addEventListener("close", () => filmVideo.pause());

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
    const rowBox = row.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    const by = isRtl() ? tabBox.right - rowBox.right + 16 : tabBox.left - rowBox.left - 16;
    row.scrollBy({ left: by, behavior: reduceMotion.matches ? "auto" : "smooth" });
  }
}

svcTabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectSvc(tab));
  tab.addEventListener("keydown", (e) => {
    const side = isRtl() ? -1 : 1;
    const keys = { ArrowDown: 1, ArrowUp: -1, ArrowRight: side, ArrowLeft: -side };
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

/* ---------- Header: border on scroll, hides going down, returns going up ---------- */
const header = document.getElementById("siteHeader");
const navLinks = [...document.querySelectorAll(".site-nav ul a")];
const navIndicator = document.querySelector(".nav-indicator");
const scrollProgress = document.getElementById("scrollProgress");
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
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.setProperty("--p", max > 0 ? Math.min(y / max, 1).toFixed(4) : 0);
  scrollScenes(y);
}

/* ---------- Scroll scenes: three things on the page follow the scroll position ---------- */
const clamp01 = (n) => Math.min(Math.max(n, 0), 1);

function scrollScenes(y) {
  const vh = window.innerHeight;
  const still = reduceMotion.matches;
  // the hero drawing drifts
  heroArt.style.setProperty("--sy", still ? 0 : clamp01(y / vh).toFixed(3));
  // the statement lights up word by word while it crosses the middle of the screen
  const box = statement.getBoundingClientRect();
  const read = still ? 1 : clamp01((vh * 0.82 - box.top) / (vh * 0.42 + box.height));
  const lit = Math.round(read * statementWords.length);
  statementWords.forEach((w, i) => w.classList.toggle("on", i < lit));
  // the project frame tips up into place
  const top = caseViewer.getBoundingClientRect().top;
  caseViewer.style.setProperty("--s", still ? 1 : clamp01((vh - top) / (vh * 0.6)).toFixed(3));
}

let scrollQueued = false;
window.addEventListener("scroll", () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => { scrollQueued = false; onScroll(); });
}, { passive: true });
reduceMotion.addEventListener("change", onScroll);
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
  menuBtn.setAttribute("aria-label", t(open ? "menuClose" : "menuOpen"));
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
langListeners.push(() => setMenu(menuBtn.getAttribute("aria-expanded") === "true"));

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
  name: (v) => (v ? "" : t("errName")),
  email: (v) => (!v ? t("errEmailEmpty") : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : t("errEmail")),
  service: (v) => (v ? "" : t("errService")),
  message: (v) => (v.length >= 10 ? "" : t("errMessage")),
};
const fieldNames = ["name", "email", "service", "message"];
const fieldOf = (name) => (name === "service" ? serviceField : form.elements[name].closest(".field"));

const valueOf = (name) => {
  if (name === "service") return (form.querySelector('input[name="service"]:checked') || {}).value || "";
  return form.elements[name].value.trim();
};

function validate(name) {
  const message = rules[name](valueOf(name));
  fieldOf(name).classList.toggle("has-error", Boolean(message));
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
  const label = lang === "ar" ? ar.fSend : textNodes.find((n) => n.key === "fSend").en;
  submitBtn.innerHTML = busy
    ? `<span class="spinner" aria-hidden="true"></span><span class="btn-label">${t("busy")}</span>`
    : `<span class="btn-label">${label}</span>`;
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
  const subject = `${t("subject")} ${data.service}`;
  const body = `${data.message}\n\n${data.name}\n${data.email}`;
  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (submitBtn.disabled) return;

  const results = fieldNames.map(validate);
  if (results.includes(false)) {
    fieldNames.forEach((name, i) => { if (!results[i]) shake(fieldOf(name)); });
    note.textContent = t("errForm");
    note.className = "form-note is-error";
    const first = fieldNames[results.indexOf(false)];
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
    note.innerHTML = `<svg class="tick" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><span>${t("sent")} <span dir="ltr">${contactEmail}</span>.</span>`;
  }, 700);
});

// messages already on screen follow the language
langListeners.push(() => {
  fieldNames.forEach((name) => { if (fieldOf(name).classList.contains("has-error")) validate(name); });
  note.textContent = "";
  note.className = "form-note";
});

/* ---------- Background: signals travelling along the page grid ----------
   The grid itself is CSS (body::before, 64px). This canvas sits on it and sends short
   pulses down its lines; grid points near the pointer light up. Off under reduced motion. */
const fx = document.getElementById("fx");
const fxCtx = fx.getContext("2d");
const fxCell = 64;
const fxPointer = { x: -9999, y: -9999 };
let fxW = 0, fxH = 0, fxPulses = [], fxFrame = 0, fxLast = 0;
// signal colours: pale royal on navy, full royal on the light page
let fxRgb = "123, 158, 238", fxHead = "rgba(170, 195, 250, .9)";
themeListeners.push(() => {
  const light = theme === "light";
  fxRgb = light ? "42, 92, 214" : "123, 158, 238";
  fxHead = light ? "rgba(31, 77, 192, .9)" : "rgba(170, 195, 250, .9)";
});

function fxSpawn(p) {
  const cols = Math.ceil(fxW / fxCell), rows = Math.ceil(fxH / fxCell);
  const across = Math.random() < 0.5, forward = Math.random() < 0.5;
  p.dx = across ? (forward ? 1 : -1) : 0;
  p.dy = across ? 0 : forward ? 1 : -1;
  p.x = across ? (forward ? 0 : cols * fxCell) : Math.round(Math.random() * cols) * fxCell;
  p.y = across ? Math.round(Math.random() * rows) * fxCell : forward ? 0 : rows * fxCell;
  p.speed = 60 + Math.random() * 100;
  p.left = fxCell; // distance to the next crossing
  p.trail = [];
  return p;
}

function fxResize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  fxW = window.innerWidth;
  fxH = window.innerHeight;
  fx.width = fxW * dpr;
  fx.height = fxH * dpr;
  fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.min(Math.max(Math.round((fxW * fxH) / 90000), 8), 26);
  fxPulses = Array.from({ length: count }, () => fxSpawn({}));
}

function fxDraw(now) {
  fxFrame = requestAnimationFrame(fxDraw);
  const dt = Math.min((now - fxLast) / 1000, 0.05);
  fxLast = now;
  fxCtx.clearRect(0, 0, fxW, fxH);
  fxCtx.lineWidth = 1;
  fxPulses.forEach((p) => {
    let move = p.speed * dt;
    while (move > 0) {
      const stepBy = Math.min(move, p.left);
      p.x += p.dx * stepBy;
      p.y += p.dy * stepBy;
      p.left -= stepBy;
      move -= stepBy;
      if (p.left <= 0) {
        p.left = fxCell;
        if (Math.random() < 0.3) { // turn at the crossing
          const turn = Math.random() < 0.5 ? 1 : -1;
          [p.dx, p.dy] = p.dx ? [0, turn] : [turn, 0];
        }
      }
    }
    p.trail.push(p.x, p.y);
    if (p.trail.length > 80) p.trail.splice(0, 2);
    const n = p.trail.length / 2;
    for (let i = 1; i < n; i++) {
      fxCtx.strokeStyle = `rgba(${fxRgb}, ${((i / n) * 0.5).toFixed(3)})`;
      fxCtx.beginPath();
      fxCtx.moveTo(p.trail[i * 2 - 2] + 0.5, p.trail[i * 2 - 1] + 0.5);
      fxCtx.lineTo(p.trail[i * 2] + 0.5, p.trail[i * 2 + 1] + 0.5);
      fxCtx.stroke();
    }
    fxCtx.fillStyle = fxHead;
    fxCtx.fillRect(p.x - 1, p.y - 1, 3, 3);
    if (p.x < -fxCell || p.y < -fxCell || p.x > fxW + fxCell || p.y > fxH + fxCell) fxSpawn(p);
  });
  // grid points around the pointer
  const reach = 180;
  const x0 = Math.floor((fxPointer.x - reach) / fxCell) * fxCell, y0 = Math.floor((fxPointer.y - reach) / fxCell) * fxCell;
  for (let x = x0; x <= fxPointer.x + reach; x += fxCell) {
    for (let y = y0; y <= fxPointer.y + reach; y += fxCell) {
      const near = 1 - Math.hypot(x - fxPointer.x, y - fxPointer.y) / reach;
      if (near <= 0) continue;
      fxCtx.fillStyle = `rgba(${fxRgb}, ${(near * 0.8).toFixed(3)})`;
      fxCtx.fillRect(x - 1.5, y - 1.5, 4, 4);
    }
  }
}

function fxRun() {
  cancelAnimationFrame(fxFrame);
  fxCtx.clearRect(0, 0, fxW, fxH);
  if (reduceMotion.matches || document.hidden) return;
  fxLast = performance.now();
  fxFrame = requestAnimationFrame(fxDraw);
}
window.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse") return;
  fxPointer.x = e.clientX;
  fxPointer.y = e.clientY;
}, { passive: true });
document.addEventListener("pointerleave", () => { fxPointer.x = fxPointer.y = -9999; });
document.addEventListener("visibilitychange", fxRun);
reduceMotion.addEventListener("change", fxRun);
window.addEventListener("resize", () => { fxResize(); fxRun(); });
fxResize();
fxRun();

/* ---------- Footer: service links open that service, and the clock shows UAE time ---------- */
document.querySelectorAll("[data-svc]").forEach((a) => {
  a.addEventListener("click", () => selectSvc(document.getElementById(a.dataset.svc)));
});
const clock = document.getElementById("clock");
const clockFormat = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dubai", hour: "2-digit", minute: "2-digit" });
const tick = () => { clock.textContent = clockFormat.format(new Date()); };
tick();
setInterval(tick, 30000);

/* ---------- Start ---------- */
function relayout() {
  placeNavIndicator();
  placeSvcMarker();
  onScroll();
}
document.getElementById("year").textContent = new Date().getFullYear();
applyLang();
observeReveal();
playHero();
relayout();
window.addEventListener("resize", relayout);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
