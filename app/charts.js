// StatistikNusa — grafik SVG polos (tanpa pustaka):
// batang, garis, dan donat. Semua grafik digambar dari data,
// dengan label angka di setiap batang/titik.

const NS = "http://www.w3.org/2000/svg";
const PALETTE = ["#312e81", "#0d9488", "#c2410c", "#ca8a04", "#4d7c0f", "#0e7490", "#9d174d", "#6d28d9"];

function el(tag, attrs = {}, text = "") {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text !== "") node.textContent = text;
  return node;
}

function fmtId(n) {
  return n.toLocaleString("id-ID", { maximumFractionDigits: 2 });
}

// Grafik batang vertikal. items: [{label, value}]. valueLabel: teks di atas batang.
export function barChart(items, { width = 640, height = 260, color = "#312e81", suffix = "" } = {}) {
  const svg = el("svg", { viewBox: `0 0 ${width} ${height}`, class: "chart-svg", role: "img", "aria-label": "Grafik batang" });
  const padL = 8, padB = 34, padT = 30;
  const max = Math.max(...items.map((i) => i.value), 1);
  const plotH = height - padB - padT;
  const slot = (width - padL * 2) / items.length;
  const barW = Math.min(64, slot * 0.62);
  // garis dasar
  svg.appendChild(el("line", { x1: padL, y1: height - padB, x2: width - padL, y2: height - padB, stroke: "#d6d0c2", "stroke-width": 1 }));
  items.forEach((item, i) => {
    const h = Math.max(2, (item.value / max) * plotH);
    const x = padL + i * slot + (slot - barW) / 2;
    const y = height - padB - h;
    const rect = el("rect", { x, y, width: barW, height: h, rx: 4, fill: item.color || color });
    svg.appendChild(rect);
    svg.appendChild(el("text", { x: x + barW / 2, y: y - 8, "text-anchor": "middle", class: "chart-val" }, fmtId(item.value) + suffix));
    const label = el("text", { x: x + barW / 2, y: height - 12, "text-anchor": "middle", class: "chart-lab" }, item.label);
    svg.appendChild(label);
  });
  return svg;
}

// Grafik garis dengan titik dan label nilai. items: [{label, value}].
export function lineChart(items, { width = 640, height = 260, color = "#0d9488", suffix = "%" } = {}) {
  const svg = el("svg", { viewBox: `0 0 ${width} ${height}`, class: "chart-svg", role: "img", "aria-label": "Grafik garis" });
  const padL = 24, padR = 24, padB = 34, padT = 30;
  const values = items.map((i) => i.value);
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  const lo = Math.min(0, min - span * 0.15), hi = max + span * 0.15;
  const plotW = width - padL - padR, plotH = height - padB - padT;
  const px = (i) => padL + (i * plotW) / (items.length - 1);
  const py = (v) => padT + plotH * (1 - (v - lo) / (hi - lo));
  svg.appendChild(el("line", { x1: padL, y1: height - padB, x2: width - padR, y2: height - padB, stroke: "#d6d0c2", "stroke-width": 1 }));
  // garis penghubung
  const points = items.map((it, i) => `${px(i)},${py(it.value)}`).join(" ");
  svg.appendChild(el("polyline", { points, fill: "none", stroke: color, "stroke-width": 3, "stroke-linejoin": "round", "stroke-linecap": "round" }));
  items.forEach((item, i) => {
    svg.appendChild(el("circle", { cx: px(i), cy: py(item.value), r: 5, fill: "#fff", stroke: color, "stroke-width": 3 }));
    svg.appendChild(el("text", { x: px(i), y: py(item.value) - 12, "text-anchor": "middle", class: "chart-val" }, fmtId(item.value) + suffix));
    svg.appendChild(el("text", { x: px(i), y: height - 12, "text-anchor": "middle", class: "chart-lab" }, item.label));
  });
  return svg;
}

// Grafik donat dengan legenda di samping (dibuat oleh pemanggil).
// items: [{label, value}]. Mengembalikan {svg, total}.
export function donutChart(items, { size = 240, thickness = 34 } = {}) {
  const svg = el("svg", { viewBox: `0 0 ${size} ${size}`, class: "chart-svg donut", role: "img", "aria-label": "Grafik donat" });
  const cx = size / 2, cy = size / 2, r = size / 2 - thickness / 2 - 4;
  const total = items.reduce((s, i) => s + i.value, 0);
  const circ = 2 * Math.PI * r;
  let offset = 0;
  items.forEach((item, i) => {
    const frac = item.value / total;
    const circle = el("circle", {
      cx, cy, r, fill: "none",
      stroke: item.color || PALETTE[i % PALETTE.length],
      "stroke-width": thickness,
      "stroke-dasharray": `${frac * circ} ${circ}`,
      "stroke-dashoffset": -offset * circ,
      transform: `rotate(-90 ${cx} ${cy})`,
    });
    svg.appendChild(circle);
    offset += frac;
  });
  const big = el("text", { x: cx, y: cy - 4, "text-anchor": "middle", class: "donut-big" }, fmtId(items[0].value) + "%");
  const small = el("text", { x: cx, y: cy + 18, "text-anchor": "middle", class: "donut-small" }, items[0].label);
  svg.appendChild(big);
  svg.appendChild(small);
  return { svg, total };
}

// Bilah horizontal untuk peringkat (mis. provinsi terpadat).
export function rankBars(items, { max = null } = {}) {
  const wrap = document.createElement("div");
  wrap.className = "rank-bars";
  const top = max ?? Math.max(...items.map((i) => i.value), 1);
  items.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "rank-row";
    const rank = document.createElement("span");
    rank.className = "rank-num";
    rank.textContent = `${i + 1}.`;
    const name = document.createElement("span");
    name.className = "rank-name";
    name.textContent = item.label;
    const track = document.createElement("div");
    track.className = "rank-track";
    const fill = document.createElement("div");
    fill.className = "rank-fill";
    fill.style.width = `${Math.max(2, (item.value / top) * 100)}%`;
    fill.style.background = item.color || PALETTE[i % PALETTE.length];
    track.appendChild(fill);
    const val = document.createElement("span");
    val.className = "rank-val";
    val.textContent = item.valueText;
    row.append(rank, name, track, val);
    wrap.appendChild(row);
  });
  return wrap;
}

export { PALETTE };
