// Fondo astrológico decorativo: estrellas, constelaciones y rueda zodiacal.
(function () {
  const sky = document.querySelector(".sky");
  if (!sky) return;

  // Aleatorio con semilla: las estrellas quedan siempre en el mismo sitio.
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  // --- Estrellas ---
  let stars = "";
  for (let i = 0; i < 170; i++) {
    const r = rand() < 0.88 ? 0.4 + rand() * 0.7 : 1.2 + rand() * 0.9;
    stars += `<circle class="s${i % 3}" cx="${(rand() * 100).toFixed(2)}%" cy="${(rand() * 100).toFixed(2)}%" r="${r.toFixed(2)}"/>`;
  }

  // --- Constelaciones (coordenadas en un lienzo de 1000 × 1000) ---
  const CONSTELLATIONS = [
    { // Osa Mayor
      points: [[70, 150], [130, 135], [185, 155], [235, 180], [250, 240], [325, 248], [328, 186]],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
    },
    { // Casiopea
      points: [[690, 80], [735, 135], [780, 95], [825, 145], [875, 100]],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
    },
    { // Orión
      points: [[770, 630], [870, 645], [800, 735], [825, 728], [850, 721], [775, 840], [890, 828], [820, 580]],
      lines: [[7, 0], [7, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]],
    },
    { // Escorpio
      points: [[60, 590], [92, 632], [112, 684], [122, 738], [150, 782], [192, 804], [225, 792], [238, 758], [40, 560], [85, 555]],
      lines: [[8, 0], [9, 0], [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
    },
  ];
  let constellations = "";
  for (const c of CONSTELLATIONS) {
    for (const [a, b] of c.lines) {
      const [x1, y1] = c.points[a];
      const [x2, y2] = c.points[b];
      constellations += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    }
    for (const [x, y] of c.points) constellations += `<circle cx="${x}" cy="${y}" r="3"/>`;
  }

  // --- Rueda zodiacal (centro en 0,0; radio exterior 480) ---
  const polar = (r, deg) => {
    const a = (deg - 90) * Math.PI / 180;
    return [(r * Math.cos(a)).toFixed(1), (r * Math.sin(a)).toFixed(1)];
  };
  const SIGNS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
  const PLANETS = [["☉", 18], ["☽", 64], ["☿", 101], ["♀", 148], ["♂", 196], ["♃", 232], ["♄", 279], ["♅", 318], ["♆", 344]];

  let wheel = [480, 440, 330, 300, 140].map((r) => `<circle r="${r}"/>`).join("");
  for (let deg = 0; deg < 360; deg += 5) {
    const inner = deg % 30 === 0 ? 330 : deg % 10 === 0 ? 452 : 462;
    const [x1, y1] = polar(inner, deg);
    const [x2, y2] = polar(480, deg);
    wheel += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  }
  SIGNS.forEach((sign, i) => {
    const [x, y] = polar(385, i * 30 + 15);
    // U+FE0E pide la versión de texto del símbolo (no el emoji de color).
    wheel += `<text x="${x}" y="${y}" class="sign">${sign}︎</text>`;
  });
  PLANETS.forEach(([glyph, deg]) => {
    const [x, y] = polar(220, deg);
    wheel += `<text x="${x}" y="${y}" class="planet">${glyph}︎</text>`;
  });
  // Aspectos: dos trígonos (triángulos) y una cuadratura (cuadrado).
  const polygon = (angles) => `<polygon points="${angles.map((a) => polar(300, a).join(",")).join(" ")}"/>`;
  wheel += `<g class="aspects">${polygon([15, 135, 255])}${polygon([75, 195, 315])}${polygon([45, 135, 225, 315])}</g>`;

  sky.innerHTML = `
    <svg class="starfield">${stars}</svg>
    <svg class="constellations" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">${constellations}</svg>
    <svg class="zodiac" viewBox="-500 -500 1000 1000">${wheel}</svg>
    <span class="sky-moon"></span>
    <span class="shooting"></span>`;
})();
