let lang = localStorage.getItem("giper_lang") || "ru";

function setLang(l) {
  lang = l;
  localStorage.setItem("giper_lang", l);
  document.querySelectorAll(".ds-lang-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === l));
  applyTranslations();
}

/* ── Тема (авто по ОС + переключатель, персист в localStorage) ─────────── */
function applyTheme(theme) {
  const btn = document.getElementById('themeToggle');
  if (theme === 'dark' || theme === 'light') {
    document.documentElement.setAttribute('data-theme', theme);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

function applyTranslations() {
  const t = T[lang];
  document.getElementById("app-title").textContent      = t.title;
  document.getElementById("input").placeholder          = t.placeholder;
  document.getElementById("btn-sort").textContent       = t.btnSort;
  document.getElementById("btn-copy").textContent       = t.btnCopy;
  document.getElementById("btn-clear").textContent      = t.btnClear;
  document.getElementById("lnk-basement").textContent   = t.lnkBasement;
  document.getElementById("lnk-floor1").textContent     = t.lnkFloor1;
  document.getElementById("lnk-floor2").textContent     = t.lnkFloor2;
  document.getElementById("lnk-pdf").textContent        = t.lnkPdf;
  document.getElementById("cap-b0").textContent         = t.capBasement;
  document.getElementById("cap-f10").textContent        = t.capFloor1;
  document.getElementById("cap-f20").textContent        = t.capFloor2;
  /* обновить результат если он уже отображён */
  if (lastResult) {
    document.getElementById("output").textContent = buildTranslatedResult();
  }
}

/* ========== БАЗА ДАННЫХ ========== */
const shopToSHO = {
  // ШО-1 (подвал)
  1:"ШО-1 (подвал)",2:"ШО-1 (подвал)",3:"ШО-1 (подвал)",4:"ШО-1 (подвал)",
  21:"ШО-1 (подвал)",23:"ШО-1 (подвал)",26:"ШО-1 (подвал)",28:"ШО-1 (подвал)",
  29:"ШО-1 (подвал)",33:"ШО-1 (подвал)",35:"ШО-1 (подвал)",36:"ШО-1 (подвал)",
  53:"ШО-1 (подвал)",56:"ШО-1 (подвал)",57:"ШО-1 (подвал)",58:"ШО-1 (подвал)",
  61:"ШО-1 (подвал)",62:"ШО-1 (подвал)",69:"ШО-1 (подвал)",
  // ШО-2 (подвал)
  102:"ШО-2 (подвал)",103:"ШО-2 (подвал)",106:"ШО-2 (подвал)",
  127:"ШО-2 (подвал)",131:"ШО-2 (подвал)",132:"ШО-2 (подвал)",
  // ШО-3 (подвал)
  "1a":"ШО-3 (подвал)","1b":"ШО-3 (подвал)","1v":"ШО-3 (подвал)",
  88:"ШО-3 (подвал)",90:"ШО-3 (подвал)",91:"ШО-3 (подвал)",
  107:"ШО-3 (подвал)",108:"ШО-3 (подвал)",109:"ШО-3 (подвал)",110:"ШО-3 (подвал)",
  111:"ШО-3 (подвал)",113:"ШО-3 (подвал)",114:"ШО-3 (подвал)",
  // ШО-4 (подвал)
  72:"ШО-4 (подвал)",73:"ШО-4 (подвал)",74:"ШО-4 (подвал)",77:"ШО-4 (подвал)",
  82:"ШО-4 (подвал)",116:"ШО-4 (подвал)",117:"ШО-4 (подвал)",121:"ШО-4 (подвал)",
  125:"ШО-4 (подвал)",126:"ШО-4 (подвал)",
  // ШО-5 (подвал)
  7:"ШО-5 (подвал)",8:"ШО-5 (подвал)",9:"ШО-5 (подвал)",10:"ШО-5 (подвал)",
  11:"ШО-5 (подвал)",12:"ШО-5 (подвал)",13:"ШО-5 (подвал)",15:"ШО-5 (подвал)",
  17:"ШО-5 (подвал)",18:"ШО-5 (подвал)",20:"ШО-5 (подвал)","20a":"ШО-5 (подвал)",
  42:"ШО-5 (подвал)",43:"ШО-5 (подвал)",44:"ШО-5 (подвал)",48:"ШО-5 (подвал)",
  50:"ШО-5 (подвал)",52:"ШО-5 (подвал)",
  // ШО-5a (подвал)
  37:"ШО-5a (подвал)",38:"ШО-5a (подвал)",39:"ШО-5a (подвал)",40:"ШО-5a (подвал)",41:"ШО-5a (подвал)",
  // ШО-1 (1-этаж)
  134:"ШО-1 (1-этаж)",135:"ШО-1 (1-этаж)",136:"ШО-1 (1-этаж)",137:"ШО-1 (1-этаж)",
  138:"ШО-1 (1-этаж)",139:"ШО-1 (1-этаж)",140:"ШО-1 (1-этаж)",156:"ШО-1 (1-этаж)",
  157:"ШО-1 (1-этаж)",163:"ШО-1 (1-этаж)",164:"ШО-1 (1-этаж)",165:"ШО-1 (1-этаж)",
  166:"ШО-1 (1-этаж)",167:"ШО-1 (1-этаж)",169:"ШО-1 (1-этаж)",170:"ШО-1 (1-этаж)",
  171:"ШО-1 (1-этаж)",190:"ШО-1 (1-этаж)",193:"ШО-1 (1-этаж)",194:"ШО-1 (1-этаж)",
  195:"ШО-1 (1-этаж)",196:"ШО-1 (1-этаж)",200:"ШО-1 (1-этаж)",202:"ШО-1 (1-этаж)",
  // ШО-2 (1-этаж)
  192:"ШО-2 (1-этаж)",197:"ШО-2 (1-этаж)",204:"ШО-2 (1-этаж)",224:"ШО-2 (1-этаж)",
  227:"ШО-2 (1-этаж)",228:"ШО-2 (1-этаж)",229:"ШО-2 (1-этаж)",230:"ШО-2 (1-этаж)",
  231:"ШО-2 (1-этаж)",232:"ШО-2 (1-этаж)",234:"ШО-2 (1-этаж)",235:"ШО-2 (1-этаж)",
  236:"ШО-2 (1-этаж)","236a":"ШО-2 (1-этаж)",237:"ШО-2 (1-этаж)",238:"ШО-2 (1-этаж)",
  239:"ШО-2 (1-этаж)",240:"ШО-2 (1-этаж)",241:"ШО-2 (1-этаж)",242:"ШО-2 (1-этаж)",
  243:"ШО-2 (1-этаж)",244:"ШО-2 (1-этаж)",264:"ШО-2 (1-этаж)",265:"ШО-2 (1-этаж)",
  266:"ШО-2 (1-этаж)",267:"ШО-2 (1-этаж)",268:"ШО-2 (1-этаж)",269:"ШО-2 (1-этаж)",
  // ШО-3 (1-этаж)
  205:"ШО-3 (1-этаж)",206:"ШО-3 (1-этаж)",208:"ШО-3 (1-этаж)",
  216:"ШО-3 (1-этаж)",217:"ШО-3 (1-этаж)",218:"ШО-3 (1-этаж)",219:"ШО-3 (1-этаж)",
  220:"ШО-3 (1-этаж)",221:"ШО-3 (1-этаж)",222:"ШО-3 (1-этаж)",223:"ШО-3 (1-этаж)",
  246:"ШО-3 (1-этаж)",247:"ШО-3 (1-этаж)",248:"ШО-3 (1-этаж)",249:"ШО-3 (1-этаж)",
  251:"ШО-3 (1-этаж)",253:"ШО-3 (1-этаж)",254:"ШО-3 (1-этаж)",255:"ШО-3 (1-этаж)",
  256:"ШО-3 (1-этаж)",258:"ШО-3 (1-этаж)",259:"ШО-3 (1-этаж)",260:"ШО-3 (1-этаж)",
  261:"ШО-3 (1-этаж)",262:"ШО-3 (1-этаж)",263:"ШО-3 (1-этаж)",
  // ШО-3a (1-этаж)
  211:"ШО-3a (1-этаж)",212:"ШО-3a (1-этаж)",215:"ШО-3a (1-этаж)",
  225:"ШО-3a (1-этаж)",226:"ШО-3a (1-этаж)",245:"ШО-3a (1-этаж)",
  // ШО-4 (1-этаж)
  141:"ШО-4 (1-этаж)","141a":"ШО-4 (1-этаж)",142:"ШО-4 (1-этаж)",143:"ШО-4 (1-этаж)",
  144:"ШО-4 (1-этаж)",145:"ШО-4 (1-этаж)",146:"ШО-4 (1-этаж)",147:"ШО-4 (1-этаж)",
  148:"ШО-4 (1-этаж)",149:"ШО-4 (1-этаж)",150:"ШО-4 (1-этаж)",151:"ШО-4 (1-этаж)",
  152:"ШО-4 (1-этаж)",153:"ШО-4 (1-этаж)",154:"ШО-4 (1-этаж)",155:"ШО-4 (1-этаж)",
  172:"ШО-4 (1-этаж)",173:"ШО-4 (1-этаж)",174:"ШО-4 (1-этаж)",175:"ШО-4 (1-этаж)",
  180:"ШО-4 (1-этаж)",181:"ШО-4 (1-этаж)",182:"ШО-4 (1-этаж)",183:"ШО-4 (1-этаж)",
  184:"ШО-4 (1-этаж)",185:"ШО-4 (1-этаж)",187:"ШО-4 (1-этаж)",
  // ШО-1 (2-этаж)
  270:"ШО-1 (2-этаж)",272:"ШО-1 (2-этаж)",273:"ШО-1 (2-этаж)",274:"ШО-1 (2-этаж)",
  275:"ШО-1 (2-этаж)",276:"ШО-1 (2-этаж)",277:"ШО-1 (2-этаж)",297:"ШО-1 (2-этаж)",
  298:"ШО-1 (2-этаж)",299:"ШО-1 (2-этаж)",300:"ШО-1 (2-этаж)",301:"ШО-1 (2-этаж)",
  302:"ШО-1 (2-этаж)",303:"ШО-1 (2-этаж)",304:"ШО-1 (2-этаж)",305:"ШО-1 (2-этаж)",
  306:"ШО-1 (2-этаж)",307:"ШО-1 (2-этаж)",308:"ШО-1 (2-этаж)",309:"ШО-1 (2-этаж)",
  310:"ШО-1 (2-этаж)",311:"ШО-1 (2-этаж)",312:"ШО-1 (2-этаж)",313:"ШО-1 (2-этаж)",
  315:"ШО-1 (2-этаж)",316:"ШО-1 (2-этаж)",335:"ШО-1 (2-этаж)",336:"ШО-1 (2-этаж)",
  337:"ШО-1 (2-этаж)",339:"ШО-1 (2-этаж)",340:"ШО-1 (2-этаж)",341:"ШО-1 (2-этаж)",
  342:"ШО-1 (2-этаж)",345:"ШО-1 (2-этаж)",346:"ШО-1 (2-этаж)",347:"ШО-1 (2-этаж)",
  // ШО-2 (2-этаж)
  348:"ШО-2 (2-этаж)",349:"ШО-2 (2-этаж)",350:"ШО-2 (2-этаж)",351:"ШО-2 (2-этаж)",
  374:"ШО-2 (2-этаж)",375:"ШО-2 (2-этаж)",380:"ШО-2 (2-этаж)",381:"ШО-2 (2-этаж)",
  382:"ШО-2 (2-этаж)",383:"ШО-2 (2-этаж)",385:"ШО-2 (2-этаж)",387:"ШО-2 (2-этаж)",
  388:"ШО-2 (2-этаж)",392:"ШО-2 (2-этаж)",393:"ШО-2 (2-этаж)",394:"ШО-2 (2-этаж)",
  395:"ШО-2 (2-этаж)",413:"ШО-2 (2-этаж)",414:"ШО-2 (2-этаж)",415:"ШО-2 (2-этаж)",
  416:"ШО-2 (2-этаж)",417:"ШО-2 (2-этаж)",418:"ШО-2 (2-этаж)",
  // ШО-3 (2-этаж)
  323:"ШО-3 (2-этаж)",324:"ШО-3 (2-этаж)",355:"ШО-3 (2-этаж)",
  356:"ШО-3 (2-этаж)",357:"ШО-3 (2-этаж)",358:"ШО-3 (2-этаж)",359:"ШО-3 (2-этаж)",
  362:"ШО-3 (2-этаж)",363:"ШО-3 (2-этаж)",364:"ШО-3 (2-этаж)",365:"ШО-3 (2-этаж)",
  366:"ШО-3 (2-этаж)",367:"ШО-3 (2-этаж)",368:"ШО-3 (2-этаж)",
  399:"ШО-3 (2-этаж)",400:"ШО-3 (2-этаж)",401:"ШО-3 (2-этаж)",405:"ШО-3 (2-этаж)",
  409:"ШО-3 (2-этаж)",410:"ШО-3 (2-этаж)",412:"ШО-3 (2-этаж)","412a":"ШО-3 (2-этаж)",
  // ШО-3a (2-этаж)
  319:"ШО-3a (2-этаж)",320:"ШО-3a (2-этаж)",369:"ШО-3a (2-этаж)",370:"ШО-3a (2-этаж)",
  371:"ШО-3a (2-этаж)",372:"ШО-3a (2-этаж)",373:"ШО-3a (2-этаж)",397:"ШО-3a (2-этаж)",
  402:"ШО-3a (2-этаж)",403:"ШО-3a (2-этаж)",408:"ШО-3a (2-этаж)",
  // ШО-4 (2-этаж)
  281:"ШО-4 (2-этаж)",282:"ШО-4 (2-этаж)",283:"ШО-4 (2-этаж)",284:"ШО-4 (2-этаж)",
  285:"ШО-4 (2-этаж)",286:"ШО-4 (2-этаж)",287:"ШО-4 (2-этаж)",288:"ШО-4 (2-этаж)",
  289:"ШО-4 (2-этаж)",290:"ШО-4 (2-этаж)",291:"ШО-4 (2-этаж)",292:"ШО-4 (2-этаж)",
  293:"ШО-4 (2-этаж)",294:"ШО-4 (2-этаж)",295:"ШО-4 (2-этаж)",296:"ШО-4 (2-этаж)",
  321:"ШО-4 (2-этаж)",322:"ШО-4 (2-этаж)",327:"ШО-4 (2-этаж)",328:"ШО-4 (2-этаж)",
  329:"ШО-4 (2-этаж)",330:"ШО-4 (2-этаж)",331:"ШО-4 (2-этаж)",332:"ШО-4 (2-этаж)",
  333:"ШО-4 (2-этаж)",334:"ШО-4 (2-этаж)",354:"ШО-4 (2-этаж)"
};

/* ========== ХРАНЕНИЕ ДАННЫХ ПОСЛЕДНЕГО РЕЗУЛЬТАТА ========== */
let lastResult = "";     // строки формата "ШО-X (подвал): 1, 2, 3\n"
let lastNotFound = [];

/* Перевод названия ШО (только этаж, ШО не переводим) */
function translateSHO(sho) {
  const t = T[lang];
  return sho
    .replace("подвал", t.basement)
    .replace("1-этаж", t.floor1)
    .replace("2-этаж", t.floor2);
}

/* Перестроить результат на текущем языке из сохранённых данных */
function buildTranslatedResult() {
  const t = T[lang];
  // Если нет данных по ШО, но есть ненайденные — показываем только их
  if (!lastResult && lastNotFound.length) {
    return `${t.notFound}\n${lastNotFound.join(", ")}`;
  }
  if (!lastResult) return "";
  let out = lastResult
    .split("\n")
    .filter(l => !l.startsWith("⚠️") && l.trim() !== "")
    .map(line => {
      const [sho, shops] = line.split(": ");
      return translateSHO(sho) + ": " + shops;
    })
    .join("\n");
  if (lastNotFound.length) {
    out += `\n\n${t.notFound}\n${lastNotFound.join(", ")}`;
  }
  return out;
}
/* ========== ОСНОВНЫЕ ФУНКЦИИ ========== */
function sortBySHO() {
  const t = T[lang];
  const input = document.getElementById("input").value.trim();
  if (!input) {
    document.getElementById("output").textContent = t.noInput;
    return;
  }

  const shops = input
    .split(/[\s,.\-–—]+/)
    .map(s => s.trim().toLowerCase())
    .filter(s => s !== "");

  const shoMap = {};
  lastNotFound = [];

  for (const shop of shops) {
    const sho = shopToSHO[shop];
    if (!sho) { lastNotFound.push(shop); continue; }
    if (!shoMap[sho]) shoMap[sho] = [];
    shoMap[sho].push(shop.toUpperCase());
  }

  const sortedKeys = Object.keys(shoMap).sort((a, b) => {
    const fA = a.includes("подвал") ? 0 : a.includes("1-этаж") ? 1 : 2;
    const fB = b.includes("подвал") ? 0 : b.includes("1-этаж") ? 1 : 2;
    if (fA !== fB) return fA - fB;
    return parseInt(a.match(/\d+/)?.[0] || 999) - parseInt(b.match(/\d+/)?.[0] || 999);
  });

  /* Сохраняем в нейтральном (русском) формате для пересчёта при смене языка */
  lastResult = sortedKeys.map(sho => `${sho}: ${shoMap[sho].join(", ")}`).join("\n");

  const display = (sortedKeys.length === 0 && lastNotFound.length > 0)
  ? `${t.notFound}\n${lastNotFound.join(", ")}`
  : buildTranslatedResult() || t.noData;
  document.getElementById("output").textContent = display;
}

function copyResult() {
  const t = T[lang];
  const text = buildTranslatedResult();
  if (!text) { alert(t.noCopy); return; }
  navigator.clipboard.writeText(text)
    .then(() => alert(t.copied))
    .catch(() => alert(t.copyFail));
}

function clearInput() {
  document.getElementById("input").value = "";
  document.getElementById("output").textContent = "";
  lastResult = "";
  lastNotFound = [];
}

/* ========== МОДАЛКИ И СЛАЙДЕР ========== */
function showSlide(modalId, n) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  const slides = modal.querySelectorAll('.slide');
  let current = parseInt(modal.dataset.current || '0');
  slides.forEach(s => s.classList.remove('active'));
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  modal.dataset.current = current;
}

function changeSlide(modalId, step) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  showSlide(modalId, parseInt(modal.dataset.current || '0') + step);
}

function openModal(modalId, startIndex = 0) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.style.display = 'block';
  modal.dataset.current = '0';
  showSlide(modalId, startIndex);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    if (document.fullscreenElement) document.exitFullscreen();
  }
}

function toggleFullscreen(img) {
  if (!document.fullscreenElement) {
    img.requestFullscreen().catch(err => console.log("Fullscreen error:", err));
  } else {
    document.exitFullscreen();
  }
}

window.onclick = function (e) {
  if (e.target.classList.contains('modal')) closeModal(e.target.id);
};

/* ========== ИНИЦИАЛИЗАЦИЯ ========== */
document.addEventListener("DOMContentLoaded", () => {
  setLang(lang);

  applyTheme(localStorage.getItem('giper_theme'));
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
        || (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';
      localStorage.setItem('giper_theme', next);
      applyTheme(next);
    });
  }
});
