// StatistikNusa — perute hash dan pengelola keadaan.
// Rute: #/ (Ringkasan), #/penduduk, #/ekonomi, #/pendidikan, #/kesehatan.

import { SITE } from "./data.js";
import { renderOverview, renderPopulation, renderEconomy, renderEducation, renderHealth } from "./views.js";

const NAV = [
  { path: "#/", label: "Ringkasan", render: (s) => renderOverview(s, setYear) },
  { path: "#/penduduk", label: "Penduduk", render: (s) => renderPopulation(s, setIsland) },
  { path: "#/ekonomi", label: "Ekonomi", render: (s) => renderEconomy(s, setChartType) },
  { path: "#/pendidikan", label: "Pendidikan", render: () => renderEducation() },
  { path: "#/kesehatan", label: "Kesehatan", render: () => renderHealth() },
];

const state = {
  year: "2024",
  query: "",
  island: "Semua pulau",
  sortKey: "pop",
  sortDir: -1,
  chartType: "garis",
  rerender: () => render(),
};

function setYear(year) {
  state.year = year;
  render();
}

function setIsland(island) {
  state.island = island;
  render();
}

function setChartType(kind) {
  state.chartType = kind;
  render();
}

function currentRoute() {
  const hash = window.location.hash || "#/";
  const found = NAV.find((n) => n.path === hash);
  return found || NAV[0];
}

function render() {
  const app = document.getElementById("app");
  const route = currentRoute();
  app.innerHTML = "";
  app.appendChild(route.render(state));
  document.querySelectorAll("nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === route.path);
    if (a.getAttribute("href") === route.path) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.title = `${route.label} · ${SITE.name}`;
}

function buildNav() {
  const nav = document.getElementById("main-nav");
  NAV.forEach((n) => {
    const a = document.createElement("a");
    a.href = n.path;
    a.textContent = n.label;
    nav.appendChild(a);
  });
}

window.addEventListener("hashchange", render);
buildNav();
render();
