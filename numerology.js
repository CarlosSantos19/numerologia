// Cálculos de numerología pitagórica.
// Tabla: A J S = 1, B K T = 2, C L U = 3, D M V = 4, E N W = 5,
//        F O X = 6, G P Y = 7, H Q Z = 8, I R = 9

const LETTER_VALUES = {};
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((ch, i) => {
  LETTER_VALUES[ch] = (i % 9) + 1;
});

const VOWELS = new Set(["A", "E", "I", "O", "U"]);
const MASTER_NUMBERS = new Set([11, 22, 33]);
const KARMIC_DEBTS = new Set([13, 14, 16, 19]);

// Quita tildes y diéresis; la Ñ se trata como N.
function normalize(text) {
  return text
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Z\s]/g, "");
}

function sumDigits(n) {
  return String(n).split("").reduce((acc, d) => acc + Number(d), 0);
}

// Todos los pasos de la reducción, conservando los números maestros.
function reduceChain(n) {
  const chain = [n];
  while (n > 9 && !MASTER_NUMBERS.has(n)) {
    n = sumDigits(n);
    chain.push(n);
  }
  return chain;
}

function reduce(n) {
  const chain = reduceChain(n);
  return chain[chain.length - 1];
}

// Reduce a un solo dígito sin respetar números maestros (11 → 2, 22 → 4, 33 → 6).
function toDigit(n) {
  while (n > 9) n = sumDigits(n);
  return n;
}

// Devuelve la deuda kármica (13, 14, 16 o 19) que aparece al reducir `n`, o null.
function karmicDebt(n) {
  return reduceChain(n).find((x) => KARMIC_DEBTS.has(x)) ?? null;
}

// Suma las letras de cada palabra que cumplen `filter`, reduce cada palabra
// y después reduce el total (método tradicional).
function nameNumber(name, filter) {
  const words = normalize(name).split(/\s+/).filter(Boolean);
  const parts = words.map((word) => {
    const letters = word.split("").filter(filter);
    const raw = letters.reduce((acc, ch) => acc + LETTER_VALUES[ch], 0);
    return { word, letters: letters.map((ch) => [ch, LETTER_VALUES[ch]]), raw, reduced: reduce(raw) };
  }).filter((p) => p.letters.length > 0);
  const total = parts.reduce((acc, p) => acc + p.reduced, 0);
  return { parts, total, value: reduce(total), karmic: karmicDebt(total) };
}

function lifePath(year, month, day) {
  const parts = { day: reduce(day), month: reduce(month), year: reduce(year) };
  const total = parts.day + parts.month + parts.year;
  return { parts, total, value: reduce(total), karmic: karmicDebt(total) };
}

// Los cuatro desafíos se calculan con mes, día y año reducidos a un dígito.
function challenges(month, day, year) {
  const m = toDigit(month), d = toDigit(day), y = toDigit(year);
  const first = Math.abs(m - d);
  const second = Math.abs(d - y);
  return [first, second, Math.abs(first - second), Math.abs(m - y)];
}

// Cuatro pináculos con la edad en la que empieza cada uno.
function pinnacles(month, day, year, lifePathValue) {
  const m = toDigit(month), d = toDigit(day), y = toDigit(year);
  const p1 = reduce(m + d);
  const p2 = reduce(d + y);
  const p3 = reduce(toDigit(p1) + toDigit(p2));
  const p4 = reduce(m + y);
  const firstEnd = 36 - toDigit(lifePathValue);
  return [
    { value: p1, from: 0, to: firstEnd },
    { value: p2, from: firstEnd + 1, to: firstEnd + 9 },
    { value: p3, from: firstEnd + 10, to: firstEnd + 18 },
    { value: p4, from: firstEnd + 19, to: null },
  ];
}

function ageOn(year, month, day, today) {
  let age = today.getFullYear() - year;
  const hadBirthday = today.getMonth() + 1 > month || (today.getMonth() + 1 === month && today.getDate() >= day);
  return hadBirthday ? age : age - 1;
}

// Año, mes y día personal de alguien nacido en `month`/`day` para una fecha concreta.
function personalCycles(month, day, date) {
  const year = date.getFullYear();
  const yearTotal = reduce(day) + reduce(month) + reduce(year);
  const personalYear = reduce(yearTotal);
  const personalMonth = reduce(toDigit(personalYear) + date.getMonth() + 1);
  const personalDay = reduce(toDigit(personalMonth) + date.getDate());
  return { year, yearTotal, personalYear, personalMonth, personalDay };
}

// Día universal: la energía colectiva de una fecha (suma de todos sus dígitos).
function universalDay(date) {
  return reduce(sumDigits(`${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`));
}

function calculate(name, birthDate, today = new Date()) {
  const [year, month, day] = birthDate.split("-").map(Number);
  const lp = lifePath(year, month, day);
  const cycles = personalCycles(month, day, today);

  return {
    lifePath: lp,
    expression: nameNumber(name, () => true),
    soulUrge: nameNumber(name, (ch) => VOWELS.has(ch)),
    personality: nameNumber(name, (ch) => !VOWELS.has(ch)),
    birthday: { total: day, value: reduce(day), karmic: KARMIC_DEBTS.has(day) ? day : null },
    personalYear: { total: cycles.yearTotal, value: cycles.personalYear, year: cycles.year },
    personalMonth: { value: cycles.personalMonth },
    personalDay: { value: cycles.personalDay },
    challenges: challenges(month, day, year),
    pinnacles: pinnacles(month, day, year, lp.value),
    age: ageOn(year, month, day, today),
  };
}

// --- Compatibilidad ---
// Grupos clásicos: mentales (1, 5, 7), creativos (3, 6, 9) y prácticos (2, 4, 8).
const NUMBER_GROUPS = { 1: "mente", 5: "mente", 7: "mente", 3: "creativo", 6: "creativo", 9: "creativo", 2: "practico", 4: "practico", 8: "practico" };
const COMPLEMENTARY_PAIRS = new Set(["1-3", "1-9", "2-6", "2-9", "3-5", "4-6", "4-7", "5-9", "6-8", "7-9", "1-2", "2-7"]);

function pairScore(a, b) {
  a = toDigit(a);
  b = toDigit(b);
  if (a === b) return 80;
  if (NUMBER_GROUPS[a] === NUMBER_GROUPS[b]) return 90;
  if (COMPLEMENTARY_PAIRS.has(`${Math.min(a, b)}-${Math.max(a, b)}`)) return 70;
  return 45;
}

function scoreLevel(score) {
  if (score >= 80) return "natural";
  if (score >= 65) return "compatible";
  return "desafiante";
}

const COMPATIBILITY_WEIGHTS = { lifePath: 0.5, expression: 0.25, soulUrge: 0.25 };

function compatibility(a, b) {
  const aspects = Object.entries(COMPATIBILITY_WEIGHTS).map(([key, weight]) => {
    const score = pairScore(a[key].value, b[key].value);
    return { key, weight, a: a[key].value, b: b[key].value, score, level: scoreLevel(score) };
  });
  const total = Math.round(aspects.reduce((acc, x) => acc + x.score * x.weight, 0));
  return { aspects, total, level: scoreLevel(total) };
}

// --- Biorritmo ---
// Tres ondas senoidales que empiezan en cero el día del nacimiento.
const BIORHYTHM_CYCLES = { physical: 23, emotional: 28, intellectual: 33 };

function daysLived(birthDate, date) {
  const [y, m, d] = birthDate.split("-").map(Number);
  // En UTC para que los cambios de horario no descuadren la cuenta de días.
  return Math.round((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(y, m - 1, d)) / 86400000);
}

function bioValue(days, period) {
  return Math.sin((2 * Math.PI * days) / period);
}

function biorhythm(birthDate, date) {
  const days = daysLived(birthDate, date);
  const cycles = {};
  for (const [key, period] of Object.entries(BIORHYTHM_CYCLES)) {
    const value = bioValue(days, period);
    // Día crítico: la curva cruza el cero a lo largo de ese día.
    const critical = Math.sign(bioValue(days - 0.5, period)) !== Math.sign(bioValue(days + 0.5, period));
    cycles[key] = { value, percent: Math.round(value * 100), critical, rising: bioValue(days + 1, period) > value };
  }
  return { days, cycles, critical: Object.values(cycles).some((c) => c.critical) };
}
