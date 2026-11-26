// StatistikNusa — perender lima halaman.
// Setiap angka yang tampil membawa label "Sumber: … , tahun …".

import { SITE, YEARS, KEY_INDICATORS, PROVINCES, ISLAND_SHARE, ECONOMY, EDUCATION, HEALTH, INSIGHTS, formatValue } from "./data.js";
import { barChart, lineChart, donutChart, rankBars, PALETTE } from "./charts.js";

function h(tag, cls, text = "") {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== "") node.textContent = text;
  return node;
}

function srcTag(source, year) {
  const s = h("span", "src", `Sumber: ${source}, ${year}`);
  return s;
}

function pageHead(title, sub) {
  const wrap = h("div", "page-head");
  wrap.append(h("h1", "", title), h("p", "page-sub", sub));
  return wrap;
}

// ---------- Dasbor / Ringkasan ----------
export function renderOverview(state, onYear) {
  const root = document.createElement("div");
  root.appendChild(pageHead("Ringkasan Indonesia", `${SITE.country} · angka terbaru per tahun · ${SITE.tagline}`));

  // Pemilih tahun + pencarian indikator.
  const controls = h("div", "controls");
  const yearLab = h("label", "ctl-label", "Tahun");
  const yearSel = document.createElement("select");
  yearSel.id = "year-select";
  yearSel.className = "ctl";
  YEARS.forEach((y) => {
    const o = document.createElement("option");
    o.value = y;
    o.textContent = y;
    if (y === state.year) o.selected = true;
    yearSel.appendChild(o);
  });
  yearSel.addEventListener("change", () => onYear(yearSel.value));
  yearLab.appendChild(yearSel);
  const searchLab = h("label", "ctl-label", "Cari indikator");
  const search = document.createElement("input");
  search.id = "indicator-search";
  search.className = "ctl";
  search.type = "search";
  search.placeholder = "cth. inflasi, penduduk…";
  search.value = state.query;
  search.addEventListener("input", () => {
    state.query = search.value;
    renderIndicatorGrid(root, state);
  });
  searchLab.appendChild(search);
  controls.append(yearLab, searchLab);
  root.appendChild(controls);

  const grid = h("div", "kpi-grid");
  grid.id = "indicator-grid";
  root.appendChild(grid);
  renderIndicatorGrid(root, state);

  // Dua kolom: donat sebaran pulau + wawasan.
  const duo = h("div", "duo");
  const donutCard = h("section", "card");
  donutCard.append(h("h2", "", "Penduduk menurut pulau"), h("p", "card-sub", "Pangsa penduduk, 2024"));
  const { svg } = donutChart(ISLAND_SHARE.map((i) => ({ label: i.name, value: i.share })));
  const legend = h("ul", "legend");
  ISLAND_SHARE.forEach((item, i) => {
    const li = document.createElement("li");
    const dot = h("span", "dot");
    dot.style.background = PALETTE[i % PALETTE.length];
    li.append(dot, document.createTextNode(`${item.name} — ${item.share}% `));
    li.appendChild(srcTag(item.source, item.year));
    legend.appendChild(li);
  });
  const donutWrap = h("div", "donut-wrap");
  donutWrap.append(svg, legend);
  donutCard.appendChild(donutWrap);
  duo.appendChild(donutCard);

  const insightCard = h("section", "card");
  insightCard.append(h("h2", "", "Yang perlu diketahui"), h("p", "card-sub", "Enam hal dari angka di atas"));
  const list = h("ul", "insights");
  INSIGHTS.forEach((ins) => {
    const li = document.createElement("li");
    li.append(document.createTextNode(ins.text + " "));
    li.appendChild(srcTag(ins.source, ins.year));
    list.appendChild(li);
  });
  insightCard.appendChild(list);
  duo.appendChild(insightCard);
  root.appendChild(duo);

  const foot = h("p", "data-note", SITE.note);
  root.appendChild(foot);
  return root;
}

function renderIndicatorGrid(root, state) {
  const grid = root.querySelector("#indicator-grid");
  if (!grid) return;
  grid.innerHTML = "";
  const q = state.query.trim().toLowerCase();
  const shown = KEY_INDICATORS.filter((ind) => !q || ind.label.toLowerCase().includes(q) || ind.blurb.toLowerCase().includes(q));
  if (shown.length === 0) {
    const empty = h("p", "empty", `Tidak ada indikator bernama “${state.query}”. Coba kata lain, misalnya “inflasi”.`);
    grid.appendChild(empty);
    return;
  }
  shown.forEach((ind) => {
    const d = ind.byYear[state.year];
    const card = h("article", "kpi");
    card.append(h("h3", "kpi-label", ind.label));
    card.append(h("p", "kpi-value", formatValue(ind, state.year)));
    card.append(h("p", "kpi-blurb", ind.blurb));
    card.appendChild(srcTag(d.source, d.year));
    grid.appendChild(card);
  });
}

// ---------- Penduduk ----------
export function renderPopulation(state, onIsland) {
  const root = document.createElement("div");
  root.appendChild(pageHead("Penduduk", "Siapa tinggal di mana · 281,6 juta jiwa (BPS estimasi, 2024)"));

  const controls = h("div", "controls");
  const lab = h("label", "ctl-label", "Saring pulau");
  const sel = document.createElement("select");
  sel.id = "island-filter";
  sel.className = "ctl";
  ["Semua pulau", "Jawa", "Sumatera", "Sulawesi", "Kalimantan"].forEach((name) => {
    const o = document.createElement("option");
    o.value = name;
    o.textContent = name;
    if (name === state.island) o.selected = true;
    sel.appendChild(o);
  });
  sel.addEventListener("change", () => onIsland(sel.value));
  lab.appendChild(sel);
  controls.appendChild(lab);
  root.appendChild(controls);

  const duo = h("div", "duo");
  const rankCard = h("section", "card");
  rankCard.append(h("h2", "", "10 provinsi terpadat"), h("p", "card-sub", "Juta jiwa · BPS estimasi, 2024"));
  const filtered = state.island === "Semua pulau" ? PROVINCES : PROVINCES.filter((p) => p.island === state.island);
  rankCard.appendChild(rankBars(filtered.map((p) => ({ label: p.name, value: p.pop, valueText: `${p.pop.toLocaleString("id-ID")} jt` }))));
  const rankNote = h("p", "card-note", `Menampilkan ${filtered.length} provinsi · Sumber: BPS (estimasi), 2024`);
  rankCard.appendChild(rankNote);
  duo.appendChild(rankCard);

  const donutCard = h("section", "card");
  donutCard.append(h("h2", "", "Sebaran menurut pulau"), h("p", "card-sub", "Pangsa penduduk · BPS estimasi, 2024"));
  const { svg } = donutChart(ISLAND_SHARE.map((i) => ({ label: i.name, value: i.share })));
  const legend = h("ul", "legend");
  ISLAND_SHARE.forEach((item, i) => {
    const li = document.createElement("li");
    const dot = h("span", "dot");
    dot.style.background = PALETTE[i % PALETTE.length];
    li.append(dot, document.createTextNode(`${item.name} — ${item.share}% `));
    li.appendChild(srcTag(item.source, item.year));
    legend.appendChild(li);
  });
  const donutWrap = h("div", "donut-wrap");
  donutWrap.append(svg, legend);
  donutCard.appendChild(donutWrap);
  duo.appendChild(donutCard);
  root.appendChild(duo);

  // Tabel provinsi yang bisa diurutkan.
  const tableCard = h("section", "card");
  tableCard.append(h("h2", "", "Tabel provinsi"), h("p", "card-sub", "Klik judul kolom untuk mengurutkan · juta jiwa · BPS estimasi, 2024"));
  const table = document.createElement("table");
  table.className = "data-table";
  table.id = "province-table";
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  [["Provinsi", "name"], ["Pulau", "island"], ["Penduduk (jt)", "pop"]].forEach(([label, key]) => {
    const th = document.createElement("th");
    const btn = document.createElement("button");
    btn.className = "sort-btn";
    btn.type = "button";
    btn.dataset.key = key;
    btn.textContent = label + (state.sortKey === key ? (state.sortDir === 1 ? " ▲" : " ▼") : "");
    btn.addEventListener("click", () => {
      if (state.sortKey === key) state.sortDir *= -1;
      else { state.sortKey = key; state.sortDir = key === "pop" ? -1 : 1; }
      state.rerender();
    });
    th.appendChild(btn);
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  const rows = [...filtered].sort((a, b) => {
    const av = a[state.sortKey], bv = b[state.sortKey];
    if (typeof av === "number") return (av - bv) * state.sortDir;
    return String(av).localeCompare(String(bv), "id") * state.sortDir;
  });
  rows.forEach((p) => {
    const r = document.createElement("tr");
    [p.name, p.island, `${p.pop.toLocaleString("id-ID")} jt`].forEach((v, i) => {
      const td = document.createElement("td");
      td.textContent = v;
      if (i === 2) td.className = "num";
      r.appendChild(td);
    });
    tbody.appendChild(r);
  });
  table.appendChild(tbody);
  tableCard.appendChild(table);
  root.appendChild(tableCard);
  return root;
}

// ---------- Ekonomi ----------
export function renderEconomy(state, onChartType) {
  const root = document.createElement("div");
  root.appendChild(pageHead("Ekonomi", "Seberapa besar dan seberapa cepat ekonomi bergerak"));

  const cards = h("div", "kpi-grid cols-4");
  const gdpCard = h("article", "kpi");
  gdpCard.append(h("h3", "kpi-label", "PDB nominal"), h("p", "kpi-value", ECONOMY.gdpNominal.value), h("p", "kpi-blurb", "Produk domestik bruto"));
  gdpCard.appendChild(srcTag(ECONOMY.gdpNominal.source, ECONOMY.gdpNominal.year));
  const capCard = h("article", "kpi");
  capCard.append(h("h3", "kpi-label", "PDB per kapita"), h("p", "kpi-value", ECONOMY.gdpPerCapita.value), h("p", "kpi-blurb", "Per penduduk, per tahun"));
  capCard.appendChild(srcTag(ECONOMY.gdpPerCapita.source, ECONOMY.gdpPerCapita.year));
  const growthCard = h("article", "kpi");
  growthCard.append(h("h3", "kpi-label", "Pertumbuhan 2024"), h("p", "kpi-value", "5,03%"), h("p", "kpi-blurb", "PDB tumbuh y-on-y"));
  growthCard.appendChild(srcTag("BPS", "2024"));
  const inflCard = h("article", "kpi");
  inflCard.append(h("h3", "kpi-label", "Inflasi 2024"), h("p", "kpi-value", "1,57%"), h("p", "kpi-blurb", "Desember, y-on-y"));
  inflCard.appendChild(srcTag("BPS", "2024"));
  cards.append(gdpCard, capCard, growthCard, inflCard);
  root.appendChild(cards);

  // Grafik pertumbuhan + inflasi dengan tombol jenis grafik.
  const controls = h("div", "controls");
  const lab = h("label", "ctl-label", "Jenis grafik tren");
  const toggle = h("div", "toggle");
  ["garis", "batang"].forEach((kind) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toggle-btn" + (state.chartType === kind ? " active" : "");
    btn.dataset.kind = kind;
    btn.textContent = kind === "garis" ? "Garis" : "Batang";
    btn.addEventListener("click", () => onChartType(kind));
    toggle.appendChild(btn);
  });
  lab.appendChild(toggle);
  controls.appendChild(lab);
  root.appendChild(controls);

  const duo = h("div", "duo");
  const growthCardEl = h("section", "card");
  growthCardEl.append(h("h2", "", "Pertumbuhan ekonomi 2020–2024"), h("p", "card-sub", "Persen y-on-y · Sumber: BPS"));
  const growthItems = ECONOMY.growthTrend.map((g) => ({ label: g.year, value: g.value }));
  growthCardEl.appendChild(state.chartType === "garis" ? lineChart(growthItems) : barChart(growthItems, { color: "#312e81" }));
  growthCardEl.appendChild(srcTag("BPS", "2020–2024"));
  duo.appendChild(growthCardEl);

  const inflCardEl = h("section", "card");
  inflCardEl.append(h("h2", "", "Inflasi 2020–2024"), h("p", "card-sub", "Persen, Desember y-on-y · Sumber: BPS"));
  const inflItems = ECONOMY.inflationTrend.map((g) => ({ label: g.year, value: g.value }));
  inflCardEl.appendChild(state.chartType === "garis" ? lineChart(inflItems, { color: "#c2410c" }) : barChart(inflItems, { color: "#c2410c" }));
  inflCardEl.appendChild(srcTag("BPS", "2020–2024"));
  duo.appendChild(inflCardEl);
  root.appendChild(duo);

  // Pangsa PDB per sektor.
  const sectorCard = h("section", "card");
  sectorCard.append(h("h2", "", "PDB menurut lapangan usaha"), h("p", "card-sub", "Pangsa persen · BPS, 2024"));
  const { svg } = donutChart(ECONOMY.sectors.map((s) => ({ label: s.name, value: s.share })));
  const legend = h("ul", "legend");
  ECONOMY.sectors.forEach((s, i) => {
    const li = document.createElement("li");
    const dot = h("span", "dot");
    dot.style.background = PALETTE[i % PALETTE.length];
    li.append(dot, document.createTextNode(`${s.name} — ${s.share}% `));
    li.appendChild(srcTag(s.source, s.year));
    legend.appendChild(li);
  });
  const donutWrap = h("div", "donut-wrap");
  donutWrap.append(svg, legend);
  sectorCard.appendChild(donutWrap);
  root.appendChild(sectorCard);
  return root;
}

// ---------- Pendidikan & Kesehatan (kartu statistik) ----------
function statCards(title, sub, items) {
  const root = document.createElement("div");
  root.appendChild(pageHead(title, sub));
  const grid = h("div", "stat-grid");
  items.forEach((item) => {
    const card = h("article", "stat-card");
    card.append(h("h3", "stat-label", item.label));
    card.append(h("p", "stat-value", item.value));
    card.append(h("p", "stat-note", item.note));
    card.appendChild(srcTag(item.source, item.year));
    grid.appendChild(card);
  });
  root.appendChild(grid);
  root.appendChild(h("p", "data-note", SITE.note));
  return root;
}

export function renderEducation() {
  return statCards("Pendidikan", "Seberapa jauh warga Indonesia bersekolah dan melek huruf", EDUCATION);
}

export function renderHealth() {
  return statCards("Kesehatan", "Seberapa sehat dan seberapa panjang umur warga Indonesia", HEALTH);
}
