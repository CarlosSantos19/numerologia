const ASPECTS = [
  { key: "lifePath", label: "Camino de Vida", hint: "Tu propósito y las lecciones principales de tu vida." },
  { key: "expression", label: "Expresión", hint: "Tus talentos y cómo te manifiestas en el mundo." },
  { key: "soulUrge", label: "Impulso del Alma", hint: "Lo que deseas en lo más profundo (vocales)." },
  { key: "personality", label: "Personalidad", hint: "La imagen que proyectas a los demás (consonantes)." },
  { key: "birthday", label: "Día de Nacimiento", hint: "Un talento especial que traes contigo." },
];
const ASPECT_LABELS = Object.fromEntries(ASPECTS.map((a) => [a.key, a.label]));
const LEVEL_NAMES = { natural: "Afinidad natural", compatible: "Compatibles", desafiante: "Desafiante" };
const HISTORY_KEY = "numerologia.historial";
const THEME_KEY = "numerologia.tema";
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const $ = (id) => document.getElementById(id);

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function arrow(total, value) {
  return total !== value ? `${total} → <strong>${value}</strong>` : `<strong>${value}</strong>`;
}

function validate(name, birth) {
  if (!/[AEIOU]/.test(normalize(name))) return "Escribe un nombre válido (con al menos una vocal).";
  if (!birth || new Date(birth) > new Date()) return "Introduce una fecha de nacimiento válida.";
  return null;
}

function showError(el, message) {
  el.textContent = message ?? "";
  el.hidden = !message;
}

let toastTimer;
function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

function orb(value, size = "") {
  return `<div class="orb ${size}${value > 9 ? " master" : ""}" data-count="${value}">${value}</div>`;
}

function chips(keywords) {
  return `<ul class="chips">${keywords.split(" · ").map((k) => `<li>${k}</li>`).join("")}</ul>`;
}

// Cuenta los números hacia arriba y arranca las barras y anillos de progreso.
function animateIn(root) {
  if (!reducedMotion) {
    root.querySelectorAll("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / 900);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }
  requestAnimationFrame(() => requestAnimationFrame(() => {
    root.querySelectorAll("[data-offset]").forEach((c) => { c.style.strokeDashoffset = c.dataset.offset; });
    root.querySelectorAll("[data-width]").forEach((b) => { b.style.width = `${b.dataset.width}%`; });
  }));
}

// --- Tema claro / oscuro ---

function currentTheme() {
  return document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function syncThemeColor() {
  document.querySelector('meta[name="theme-color"]').content = currentTheme() === "dark" ? "#0b0a14" : "#f3ead8";
}

$("theme-toggle").addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {}
  syncThemeColor();
});

// --- Pestañas ---

function showTab(name) {
  document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
  document.querySelectorAll(".panel").forEach((p) => { p.hidden = p.id !== `panel-${name}`; });
  if (name === "calendario") renderCalendar();
  window.scrollTo({ top: 0 });
}

document.querySelectorAll(".tab").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));

// --- Historial (localStorage, solo en este dispositivo) ---

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveHistory(list) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  } catch {
    // Almacenamiento no disponible (modo privado, etc.): el historial simplemente no se guarda.
  }
}

function addToHistory(name, birth) {
  const list = loadHistory().filter((p) => !(p.name === name && p.birth === birth));
  list.unshift({ name, birth });
  saveHistory(list.slice(0, 50));
  renderHistory();
}

function renderHistory() {
  const list = loadHistory();
  $("history").innerHTML = list.length
    ? list.map((p, i) => `
        <li>
          ${orb(calculate(p.name, p.birth).lifePath.value, "sm")}
          <span class="who"><strong>${escapeHtml(p.name)}</strong><span class="hint">${formatDate(p.birth)}</span></span>
          <button type="button" class="ghost" data-action="view" data-index="${i}">Ver</button>
          <button type="button" class="ghost" data-action="delete" data-index="${i}" aria-label="Borrar">✕</button>
        </li>`).join("")
    : `<li class="empty">Todavía no hay cartas. Calcula la primera en «Mi carta».</li>`;
  $("clear-history").hidden = list.length === 0;

  const options = `<option value="">Elegir del historial…</option>` +
    list.map((p, i) => `<option value="${i}">${escapeHtml(p.name)} · ${formatDate(p.birth)}</option>`).join("");
  document.querySelectorAll(".from-history").forEach((s) => {
    s.innerHTML = options;
    s.hidden = list.length === 0;
  });
}

$("history").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const list = loadHistory();
  const person = list[Number(btn.dataset.index)];
  if (btn.dataset.action === "view") {
    $("name").value = person.name;
    $("birth").value = person.birth;
    showTab("carta");
    showChart(person.name, person.birth);
  } else if (btn.dataset.action === "delete") {
    list.splice(Number(btn.dataset.index), 1);
    saveHistory(list);
    renderHistory();
    toast("Carta eliminada");
  }
});

$("clear-history").addEventListener("click", () => {
  if (confirm("¿Borrar todo el historial?")) {
    saveHistory([]);
    renderHistory();
  }
});

document.querySelectorAll(".from-history").forEach((select) => {
  select.addEventListener("change", () => {
    const person = loadHistory()[Number(select.value)];
    if (!person) return;
    $(`name-${select.dataset.target}`).value = person.name;
    $(`birth-${select.dataset.target}`).value = person.birth;
  });
});

// --- Carta personal ---

function profileDetails(m) {
  return `
    <div class="profile">
      <div><h5>Fortalezas</h5><ul>${m.strengths.map((s) => `<li>${s}</li>`).join("")}</ul></div>
      <div><h5>Retos</h5><ul>${m.challenges.map((s) => `<li>${s}</li>`).join("")}</ul></div>
    </div>
    <h5>En el amor</h5><p>${m.love}</p>
    <h5>En el trabajo</h5><p>${m.work}</p>
    <p class="advice">${m.advice}</p>`;
}

function karmicBadge(karmic) {
  return karmic ? `<p><span class="badge">✦ Deuda kármica ${karmic}</span></p>` : "";
}

function renderFeatured(r) {
  const v = r.lifePath.value;
  const m = MEANINGS[v];
  const harmony = scoreLevel(pairScore(v, r.expression.value));
  return `
    <article class="glass featured reveal">
      <div class="card-wrap">${tarotCard(v, "lg")}</div>
      <div>
        <p class="label">Tu Camino de Vida</p>
        <h2>${m.title}</h2>
        <p class="arcana">Arcano mayor: <strong>${ARCANA[v].name}</strong> (${ARCANA[v].numeral})${ARCANA[v].note ? ` · ${ARCANA[v].note}` : ""}</p>
        ${chips(m.keywords)}
        ${karmicBadge(r.lifePath.karmic)}
        <p>${m.general}</p>
        <div class="synthesis">
          <p>Tu vida te pide <strong>${m.camino}</strong>. Para lograrlo cuentas con <strong>${MEANINGS[r.expression.value].talento}</strong>.
          En lo más íntimo deseas <strong>${MEANINGS[r.soulUrge.value].deseo}</strong>, aunque los demás te perciben como
          <strong>${MEANINGS[r.personality.value].imagen}</strong>.</p>
          <p>${HARMONY_TEXTS[harmony]}</p>
        </div>
        <details><summary>Leer más sobre el ${v}</summary>${profileDetails(m)}</details>
      </div>
    </article>`;
}

function numberCard(aspect, value, karmic, i) {
  const m = MEANINGS[value];
  return `
    <article class="glass number-card reveal${value > 9 ? " is-master" : ""}" style="--i:${i}">
      <div class="card-head">
        ${tarotCard(value, "sm")}
        <div><h3>${aspect.label}</h3><p class="hint">${aspect.hint}</p></div>
      </div>
      <p class="title">${m.title}</p>
      <p class="arcana">Arcano: ${ARCANA[value].name} (${ARCANA[value].numeral})</p>
      ${chips(m.keywords)}
      ${karmicBadge(karmic)}
      <p>${m.general}</p>
      <details><summary>Leer más</summary>${profileDetails(m)}</details>
    </article>`;
}

// Carta de tarot con el arcano mayor asociado al número.
function tarotCard(value, size = "") {
  const a = ARCANA[value];
  return `
    <div class="tarot ${size}${value > 9 ? " master" : ""}" aria-hidden="true">
      <span class="numeral">${a.numeral}</span>
      <span class="tarot-center">
        <span class="tarot-num" data-count="${value}">${value}</span>
        <span class="glyph">${a.glyph}︎</span>
      </span>
      <span class="tarot-name">${a.name}</span>
    </div>`;
}

function renderCareers(r) {
  const v = r.expression.value;
  const c = CAREERS[v];
  return `
    <h2 class="section-title">Tabla de expresión <small>El campo en el que te puedes desarrollar, según el total de tu nombre</small></h2>
    <article class="glass careers reveal">
      <div class="card-head">
        ${tarotCard(v, "sm")}
        <div>
          <p class="label">Expresión ${v} · ${MEANINGS[v].title}</p>
          <p class="careers-summary">${c.summary}</p>
        </div>
      </div>
      <div class="career-areas">
        ${c.areas.map(([area, jobs]) => `
          <div class="career-area">
            <h4>${area}</h4>
            <ul class="chips">${jobs.map((j) => `<li>${j}</li>`).join("")}</ul>
          </div>`).join("")}
      </div>
      <p class="hint">Calculado con todas las letras de tu nombre completo: ${arrow(r.expression.total, v)}.</p>
    </article>`;
}

// El Camino de Vida de cada famoso se calcula igual que el del usuario.
const FAMOUS_LIST = FAMOUS.map(([name, birth, role, country]) => {
  const [y, m, d] = birth.split("-").map(Number);
  return { name, birth, role, country, lifePath: lifePath(y, m, d).value };
});

function renderFamous(r) {
  const v = r.lifePath.value;
  const matches = FAMOUS_LIST.filter((p) => p.lifePath === v);
  const column = (title, country, i) => {
    const people = matches.filter((p) => p.country === country);
    return `
      <article class="glass famous-col reveal" style="--i:${i}">
        <h3>${title} <span class="count">${people.length}</span></h3>
        ${people.length
          ? `<ul class="people">${people.map((p) => `<li><strong>${p.name}</strong><span class="hint">${p.role} · ${formatDate(p.birth)}</span></li>`).join("")}</ul>`
          : `<p class="hint">Aún no hay famosos registrados con este número.</p>`}
      </article>`;
  };
  return `
    <h2 class="section-title">Famosos con tu Camino de Vida ${v} <small>Personas conocidas que comparten tu número</small></h2>
    <div class="grid famous-grid">
      ${column("Colombia", "co", 0)}
      ${column("Internacionales", "int", 1)}
    </div>`;
}

function renderKarmic(r) {
  const debts = ASPECTS.filter((a) => r[a.key].karmic).map((a) => ({ label: a.label, debt: r[a.key].karmic }));
  if (!debts.length) return "";
  return `
    <h2 class="section-title">Deudas kármicas <small>Aparecen cuando un número se forma a partir de 13, 14, 16 o 19</small></h2>
    <div class="glass karmic reveal">
      ${debts.map((d) => `<p><span class="badge">${d.debt}</span> <strong>${d.label}:</strong> ${KARMIC_TEXTS[d.debt]}</p>`).join("")}
    </div>`;
}

function cycleCard(label, value, i) {
  return `
    <article class="glass cycle reveal" style="--i:${i}">
      <div class="card-head">
        ${orb(value, "sm")}
        <div><p class="label">${label}</p><h3>${MEANINGS[value].title}</h3></div>
      </div>
      <p>${label.split(" ")[0]} de ${CYCLES[value]}</p>
    </article>`;
}

function renderPinnacles(r) {
  return r.pinnacles.map((p, i) => {
    const current = r.age >= p.from && (p.to === null || r.age <= p.to);
    const ages = p.to === null ? `Desde los ${p.from} años` : `De ${p.from} a ${p.to} años`;
    return `
      <li class="reveal${current ? " current" : ""}" style="--i:${i}">
        ${orb(p.value, "sm")}
        <p class="ages">${ages} ${current ? `<span class="badge">Ahora</span>` : ""}</p>
        <p><strong>${MEANINGS[p.value].title}</strong></p>
        <p>Etapa de ${CYCLES[p.value]}</p>
      </li>`;
  }).join("");
}

function renderChallenges(r) {
  const names = ["Primer desafío · juventud", "Segundo desafío · madurez", "Desafío principal · toda la vida", "Cuarto desafío · etapa final"];
  return r.challenges.map((c, i) => `
    <div class="row${i === 2 ? " current" : ""}">
      <div class="orb sm">${c}</div>
      <div><strong>${names[i]}</strong><p>${CHALLENGES[c]}</p></div>
    </div>`).join("");
}

function nameBreakdown(label, r) {
  const words = r.parts.map((p) => `
    <div class="letters">
      <span class="w">${p.word}</span>
      ${p.letters.map(([ch, v]) => `<span class="tile"><b>${ch}</b><i>${v}</i></span>`).join("")}
      <span class="sum">= ${p.raw}${p.raw !== p.reduced ? ` → ${p.reduced}` : ""}</span>
    </div>`).join("");
  return `<h4>${label}</h4>${words}<p>Total: ${arrow(r.total, r.value)}</p>`;
}

function renderBreakdown(r) {
  const lp = r.lifePath;
  return `
    <h4>Camino de Vida</h4>
    <p>Día ${lp.parts.day} + Mes ${lp.parts.month} + Año ${lp.parts.year} = ${arrow(lp.total, lp.value)}</p>
    ${nameBreakdown("Expresión · todas las letras", r.expression)}
    ${nameBreakdown("Impulso del Alma · vocales", r.soulUrge)}
    ${nameBreakdown("Personalidad · consonantes", r.personality)}
    <h4>Año Personal ${r.personalYear.year}</h4>
    <p>Día + Mes de nacimiento + Año actual = ${arrow(r.personalYear.total, r.personalYear.value)}.
       El mes personal suma el año personal y el mes actual; el día personal suma el mes personal y el día de hoy.</p>
    <h4>Pináculos y desafíos</h4>
    <p>Se calculan con el mes, el día y el año de nacimiento reducidos a un dígito. Los pináculos suman (mes + día, día + año…);
       los desafíos restan (|mes − día|, |día − año|…). El primer pináculo termina a los 36 años menos tu Camino de Vida.</p>
    <p class="hint">Tabla pitagórica: A J S = 1 · B K T = 2 · C L U = 3 · D M V = 4 · E N W = 5 · F O X = 6 · G P Y = 7 · H Q Z = 8 · I R = 9.
    Las tildes se ignoran y la Ñ cuenta como N.</p>`;
}

function showChart(name, birth) {
  const r = calculate(name, birth);
  $("featured").innerHTML = renderFeatured(r);
  $("numbers").innerHTML = ASPECTS.slice(1).map((a, i) => numberCard(a, r[a.key].value, r[a.key].karmic, i)).join("");
  $("careers").innerHTML = renderCareers(r);
  $("famous").innerHTML = renderFamous(r);
  $("karmic").innerHTML = renderKarmic(r);
  $("cycles").innerHTML =
    cycleCard(`Año personal ${r.personalYear.year}`, r.personalYear.value, 0) +
    cycleCard("Mes personal", r.personalMonth.value, 1) +
    cycleCard("Día personal", r.personalDay.value, 2);
  $("pinnacles").innerHTML = renderPinnacles(r);
  $("challenges").innerHTML = renderChallenges(r);
  $("breakdown").innerHTML = renderBreakdown(r);
  $("results").hidden = false;
  animateIn($("results"));
  $("featured").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("name").value.trim().replace(/\s+/g, " ");
  const birth = $("birth").value;
  const error = validate(name, birth);
  showError($("error"), error);
  if (error) return;
  addToHistory(name, birth);
  cal.personKey = personKey({ name, birth });
  showChart(name, birth);
  toast("Guardada en tu historial");
});

// --- Compatibilidad ---

function renderCompatibility(nameA, nameB, a, b) {
  const c = compatibility(a, b);
  const firstName = (n) => escapeHtml(n.split(" ")[0]);
  const circumference = 2 * Math.PI * 52;
  const rows = c.aspects.map((x) => `
    <div class="compat-row">
      <div>${ASPECT_LABELS[x.key]} <span class="hint">· ${Math.round(x.weight * 100)} %</span></div>
      <div class="compat-pair">${orb(x.a, "sm")}×${orb(x.b, "sm")}</div>
      <div class="bar"><span class="${x.level}" data-width="${x.score}"></span></div>
      <div class="compat-score">${x.score} %</div>
    </div>`).join("");
  const loveCard = (name, r, i) => `
    <article class="glass reveal" style="--i:${i}">
      <div class="card-head">${orb(r.lifePath.value)}<div><p class="label">En el amor</p><h3>${name}</h3></div></div>
      <p class="title">${MEANINGS[r.lifePath.value].title}</p>
      <p>${MEANINGS[r.lifePath.value].love}</p>
    </article>`;
  return `
    <article class="glass compat-hero reveal">
      <div class="couple">
        <div class="person">${orb(a.lifePath.value)}${firstName(nameA)}</div>
        <div class="ring">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle class="track" cx="60" cy="60" r="52"/>
            <circle class="value ${c.level}" cx="60" cy="60" r="52"
              stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"
              data-offset="${circumference * (1 - c.total / 100)}"/>
          </svg>
          <div class="score" data-count="${c.total}" data-suffix="%">${c.total}%</div>
        </div>
        <div class="person">${orb(b.lifePath.value)}${firstName(nameB)}</div>
      </div>
      <span class="level-pill ${c.level}">${LEVEL_NAMES[c.level]}</span>
      <h2>${firstName(nameA)} y ${firstName(nameB)}</h2>
      <p>${COMPATIBILITY_TEXTS[c.level]}</p>
    </article>
    <div class="glass compat-rows reveal" style="--i:1">
      ${rows}
      <p class="hint">El Camino de Vida pesa la mitad; Expresión e Impulso del Alma, una cuarta parte cada uno.</p>
    </div>
    <div class="grid compat-love">
      ${loveCard(firstName(nameA), a, 2)}
      ${loveCard(firstName(nameB), b, 3)}
    </div>`;
}

$("compat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const people = ["a", "b"].map((k) => ({
    name: $(`name-${k}`).value.trim().replace(/\s+/g, " "),
    birth: $(`birth-${k}`).value,
  }));
  const error = people.map((p, i) => {
    const err = validate(p.name, p.birth);
    return err && `Persona ${i + 1}: ${err}`;
  }).find(Boolean);
  showError($("compat-error"), error);
  if (error) return;
  const [a, b] = people.map((p) => calculate(p.name, p.birth));
  const results = $("compat-results");
  results.innerHTML = renderCompatibility(people[0].name, people[1].name, a, b);
  results.hidden = false;
  animateIn(results);
  results.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
});

// --- Calendario ---

const cal = { month: startOfMonth(new Date()), selected: new Date(), personKey: null };
const longDate = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const monthTitle = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" });
const isNarrow = () => matchMedia("(max-width: 900px)").matches;

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const personKey = (p) => `${p.name}|${p.birth}`;

function birthMonthDay(person) {
  const [, month, day] = person.birth.split("-").map(Number);
  return { month, day };
}

// Tema corto de un ciclo: "responsabilidades: hogar…" → "responsabilidades".
const cycleTheme = (n) => CYCLES[n].split(":")[0];

function selectDate(date) {
  cal.selected = date;
  cal.month = startOfMonth(date);
  renderCalendar();
}

function renderCalendar() {
  const list = loadHistory();
  const person = list.find((p) => personKey(p) === cal.personKey) || list[0];
  $("cal-empty").hidden = Boolean(person);
  $("cal-content").hidden = !person;
  if (!person) return;
  cal.personKey = personKey(person);

  $("cal-person").innerHTML = list.map((p) =>
    `<option value="${escapeHtml(personKey(p))}"${personKey(p) === cal.personKey ? " selected" : ""}>${escapeHtml(p.name)} · ${formatDate(p.birth)}</option>`).join("");

  const { month, day } = birthMonthDay(person);
  const first = cal.month;
  const monthCycles = personalCycles(month, day, first);
  $("cal-title").textContent = capitalize(monthTitle.format(first));
  $("cal-month-info").innerHTML =
    `Año personal <strong>${monthCycles.personalYear}</strong> · Mes personal <strong>${monthCycles.personalMonth}</strong>: mes de ${CYCLES[monthCycles.personalMonth]}`;

  const today = new Date();
  const offset = (first.getDay() + 6) % 7; // la semana empieza en lunes
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  let html = "<span></span>".repeat(offset);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(first.getFullYear(), first.getMonth(), d);
    const n = personalCycles(month, day, date).personalDay;
    const classes = ["day", sameDay(date, today) && "today", sameDay(date, cal.selected) && "selected",
      biorhythm(person.birth, date).critical && "critical"].filter(Boolean).join(" ");
    html += `<button type="button" class="${classes}" data-day="${d}" data-n="${n}" aria-label="${d}: día personal ${n}, ${DAILY[n].title}">
      <span class="d">${d}</span><span class="n">${n}</span></button>`;
  }
  $("cal-grid").innerHTML = html;
  renderYearCard(person);
  renderDayDetail(person);
  renderBiorhythm(person);
}

const shortMonth = new Intl.DateTimeFormat("es-ES", { month: "short" });

function guideSections(guide) {
  return `
    <section class="guide good">
      <h3>✦ Sugerencias</h3>
      <ul>${guide.suggestions.map((s) => `<li>${s}</li>`).join("")}</ul>
    </section>
    <section class="guide expect">
      <h3>◐ Qué esperar</h3>
      <p>${guide.expect}</p>
    </section>
    <section class="guide warn">
      <h3>⚠ Prevenciones</h3>
      <ul>${guide.cautions.map((s) => `<li>${s}</li>`).join("")}</ul>
    </section>`;
}

function renderYearCard(person) {
  const { month, day } = birthMonthDay(person);
  const year = cal.month.getFullYear();
  const yearOf = (y) => personalCycles(month, day, new Date(y, 0, 1)).personalYear;
  const py = yearOf(year);
  const guide = YEARLY[py];
  const position = toDigit(py); // posición dentro del ciclo de 9 años
  const thisYear = new Date().getFullYear();
  const label = py > 9 ? `${py}/${toDigit(py)}` : py;

  const steps = Array.from({ length: 9 }, (_, i) => {
    const y = year - (position - 1) + i;
    const n = yearOf(y);
    const state = y === year ? "current" : y < year ? "past" : "";
    return `<button type="button" class="cycle-step ${state}" data-year="${y}" data-n="${n}" aria-label="${y}: año personal ${n}">
      <span class="chip-n">${n}</span><span class="y">${y}</span></button>`;
  }).join("");

  const months = Array.from({ length: 12 }, (_, m) => {
    const n = personalCycles(month, day, new Date(year, m, 1)).personalMonth;
    const active = m === cal.month.getMonth() ? " active" : "";
    return `<button type="button" class="month-chip${active}" data-month="${m}" data-n="${n}" aria-label="${shortMonth.format(new Date(year, m, 1))}: mes personal ${n}">
      <span>${capitalize(shortMonth.format(new Date(year, m, 1)).replace(".", ""))}</span><span class="chip-n">${n}</span></button>`;
  }).join("");

  $("year-card").innerHTML = `
    <div class="reveal">
      <div class="year-top">
        <button type="button" class="icon-button" data-year-shift="-1" aria-label="Año anterior">‹</button>
        <p class="label">${year === thisYear ? "Este año · " : ""}Tu año personal ${year}</p>
        <button type="button" class="icon-button" data-year-shift="1" aria-label="Año siguiente">›</button>
      </div>
      <div class="year-head">
        ${orb(py, "xl")}
        <div>
          <p class="hint">Año personal ${label} · año ${position} de tu ciclo de 9</p>
          <h2>${guide.title}</h2>
          <p class="year-key">Palabra clave: <strong>${guide.key}</strong></p>
        </div>
      </div>
      <div class="year-guides">${guideSections(guide)}</div>

      <h3 class="year-sub">Tu ciclo de 9 años</h3>
      <div class="cycle-strip">${steps}</div>

      <h3 class="year-sub">Los meses de ${year} <small class="hint">· toca uno para verlo en el calendario</small></h3>
      <div class="month-chips">${months}</div>
    </div>`;
  animateIn($("year-card"));
}

function selectYear(y) {
  const today = new Date();
  selectDate(y === today.getFullYear() ? today : new Date(y, 0, 1));
}

$("year-card").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const year = cal.month.getFullYear();
  if (btn.dataset.yearShift) selectYear(year + Number(btn.dataset.yearShift));
  else if (btn.dataset.year) selectYear(Number(btn.dataset.year));
  else if (btn.dataset.month) {
    const m = Number(btn.dataset.month);
    const today = new Date();
    selectDate(today.getFullYear() === year && today.getMonth() === m ? today : new Date(year, m, 1));
    $("cal-section").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }
});

function renderDayDetail(person) {
  const { month, day } = birthMonthDay(person);
  const date = cal.selected;
  const c = personalCycles(month, day, date);
  const n = c.personalDay;
  const guide = DAILY[n];
  const u = universalDay(date);
  $("day-detail").innerHTML = `
    <div class="reveal">
      <p class="label">${sameDay(date, new Date()) ? "Hoy · " : ""}${longDate.format(date)}</p>
      <div class="day-head">
        ${orb(n, "lg")}
        <div><p class="hint">Día personal ${n}</p><h2>${guide.title}</h2></div>
      </div>
      <p class="day-context">Dentro de tu <strong>mes personal ${c.personalMonth}</strong> (${cycleTheme(c.personalMonth)})
        y tu <strong>año personal ${c.personalYear}</strong> (${cycleTheme(c.personalYear)}).
        Energía colectiva del día: <strong>${u}</strong> · ${MEANINGS[u].keywords}.</p>
      ${bioSummary(person, date)}
      ${guideSections(guide)}
      <div class="day-nav">
        <button type="button" class="ghost" data-shift="-1">‹ Día anterior</button>
        <button type="button" class="ghost" data-shift="1">Día siguiente ›</button>
      </div>
    </div>`;
  animateIn($("day-detail"));
}

// --- Biorritmo ---

const BIO_KEYS = ["physical", "emotional", "intellectual"];
const signedPercent = (p) => (p > 0 ? `+${p}` : `${p}`) + " %";

function bioState(c) {
  if (c.critical) return "critico";
  if (c.percent >= 50) return "alto";
  if (c.percent >= 0) return "positivo";
  if (c.percent > -50) return "negativo";
  return "bajo";
}

// Resumen de una línea para el detalle del día.
function bioSummary(person, date) {
  const b = biorhythm(person.birth, date);
  return `
    <p class="bio-mini">
      <span class="label">Biorritmo</span>
      ${BIO_KEYS.map((k) => `<span class="bio-chip" style="--c: var(--bio-${k})"><i></i>${BIORHYTHM[k].label} ${signedPercent(b.cycles[k].percent)}</span>`).join("")}
      ${b.critical ? `<span class="badge">Día crítico</span>` : ""}
      <a href="#bio-section">Ver gráfica ›</a>
    </p>`;
}

function bioChart(person) {
  // En pantallas estrechas la gráfica es más alta en proporción para que se lea bien.
  const W = window.innerWidth < 600 ? 380 : 720, H = 230, PX = 24, PY = 22;
  const first = cal.month;
  const n = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const x = (d) => PX + ((d - 1) / (n - 1)) * (W - 2 * PX); // d: día del mes (admite decimales)
  const y = (v) => H / 2 - v * (H / 2 - PY);
  const base = daysLived(person.birth, first);

  const curves = BIO_KEYS.map((k) => {
    let d = "";
    for (let t = 0; t <= n - 1; t += 0.25) d += `${t ? "L" : "M"}${x(1 + t).toFixed(1)},${y(bioValue(base + t, BIORHYTHM_CYCLES[k])).toFixed(1)}`;
    return `<path class="curve" style="--c: var(--bio-${k})" d="${d}"/>`;
  }).join("");

  const ticks = [1, 5, 10, 15, 20, 25, n].filter((d, i, a) => a.indexOf(d) === i && !(d !== n && n - d < 3))
    .map((d) => `<text x="${x(d)}" y="${H - 4}" text-anchor="middle">${d}</text>`).join("");

  const today = new Date();
  const marker = (date, cls) => (date.getFullYear() === first.getFullYear() && date.getMonth() === first.getMonth())
    ? `<line class="${cls}" x1="${x(date.getDate())}" x2="${x(date.getDate())}" y1="${PY - 8}" y2="${H - PY + 8}"/>` : "";

  const sel = cal.selected.getDate();
  const selDays = daysLived(person.birth, cal.selected);
  const dots = BIO_KEYS.map((k) => `<circle class="dot" style="--c: var(--bio-${k})" cx="${x(sel)}" cy="${y(bioValue(selDays, BIORHYTHM_CYCLES[k]))}" r="5"/>`).join("");

  const step = (W - 2 * PX) / (n - 1);
  const hits = Array.from({ length: n }, (_, i) => `<rect class="hit" data-day="${i + 1}" x="${x(i + 1) - step / 2}" y="0" width="${step}" height="${H}"><title>Día ${i + 1}</title></rect>`).join("");

  return `
    <svg class="bio-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfica del biorritmo del mes">
      <line class="grid" x1="${PX}" x2="${W - PX}" y1="${y(1)}" y2="${y(1)}"/>
      <line class="grid" x1="${PX}" x2="${W - PX}" y1="${y(-1)}" y2="${y(-1)}"/>
      <line class="axis" x1="${PX}" x2="${W - PX}" y1="${y(0)}" y2="${y(0)}"/>
      <text x="4" y="${y(1) + 4}">+</text><text x="4" y="${y(-1) + 4}">−</text>
      ${marker(today, "today-line")}
      ${marker(cal.selected, "selected-line")}
      ${curves}
      ${dots}
      ${ticks}
      ${hits}
    </svg>`;
}

function renderBiorhythm(person) {
  const b = biorhythm(person.birth, cal.selected);
  const meters = BIO_KEYS.map((k) => {
    const c = b.cycles[k];
    const p = c.percent;
    return `
      <div class="bio-meter" style="--c: var(--bio-${k})">
        <div class="top">
          <h3>${BIORHYTHM[k].label}</h3>
          <span class="pct">${signedPercent(p)} ${c.rising ? "↑" : "↓"}</span>
        </div>
        <p class="hint">${BIORHYTHM[k].about}</p>
        <div class="bio-bar"><span style="left:${p >= 0 ? 50 : 50 + p / 2}%; width:${Math.abs(p) / 2}%"></span></div>
        ${c.critical ? `<p><span class="badge">Día crítico</span></p>` : ""}
        <p>${BIORHYTHM[k].states[bioState(c)]}</p>
      </div>`;
  }).join("");

  $("biorhythm").innerHTML = `
    <div class="bio-head">
      <p class="label">${capitalize(monthTitle.format(cal.month))} · seleccionado: ${cal.selected.getDate()}</p>
      <p class="hint">${b.days.toLocaleString("es-ES")} días vividos</p>
    </div>
    ${bioChart(person)}
    <div class="bio-legend">
      ${BIO_KEYS.map((k) => `<span style="--c: var(--bio-${k})"><i></i>${BIORHYTHM[k].label}</span>`).join("")}
      <span class="legend-line"><i class="dashed"></i>Hoy</span>
      <span class="hint">Toca la gráfica para elegir un día</span>
    </div>
    <h3 class="year-sub">${capitalize(longDate.format(cal.selected))}</h3>
    <div class="bio-meters">${meters}</div>
    <p class="hint bio-note">Los días críticos (cuando una curva cruza el cero) se marcan con un punto en el calendario.
      El biorritmo es una teoría sin respaldo científico: tómalo como entretenimiento.</p>`;
}

$("biorhythm").addEventListener("click", (e) => {
  const hit = e.target.closest("[data-day]");
  if (hit) selectDate(new Date(cal.month.getFullYear(), cal.month.getMonth(), Number(hit.dataset.day)));
});

$("cal-grid").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-day]");
  if (!btn) return;
  selectDate(new Date(cal.month.getFullYear(), cal.month.getMonth(), Number(btn.dataset.day)));
  if (isNarrow()) $("day-detail").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
});

$("day-detail").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-shift]");
  if (!btn) return;
  const d = cal.selected;
  selectDate(new Date(d.getFullYear(), d.getMonth(), d.getDate() + Number(btn.dataset.shift)));
});

function shiftMonth(delta) {
  const target = new Date(cal.month.getFullYear(), cal.month.getMonth() + delta, 1);
  const today = new Date();
  // Al cambiar de mes se selecciona hoy si cae en ese mes; si no, el día 1.
  selectDate(target.getFullYear() === today.getFullYear() && target.getMonth() === today.getMonth() ? today : target);
}

$("cal-prev").addEventListener("click", () => shiftMonth(-1));
$("cal-next").addEventListener("click", () => shiftMonth(1));
$("cal-today").addEventListener("click", () => selectDate(new Date()));
$("cal-person").addEventListener("change", (e) => {
  cal.personKey = e.target.value;
  renderCalendar();
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-goto]");
  if (btn) showTab(btn.dataset.goto);
});

// --- Inicio ---

syncThemeColor();
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncThemeColor);
renderHistory();

// La app funciona sin conexión e instalable cuando se sirve por http(s); con file:// se omite.
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js");
}
