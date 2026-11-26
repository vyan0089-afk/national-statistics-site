// StatistikNusa — dataset statistik nasional Indonesia.
// Setiap angka membawa sumber dan tahunnya. Angka yang tidak pasti
// ditandai "estimasi" pada label sumbernya, sesuai yang tampil di situs.
// Sumber: Badan Pusat Statistik (BPS), Bank Dunia, Kemenkes, SSGI.

export const SITE = {
  name: "StatistikNusa",
  tagline: "Angka Indonesia, satu tempat",
  country: "Indonesia",
  note: "Semua angka di situs ini disertai sumber dan tahun. Angka bertanda estimasi adalah perkiraan resmi yang dibulatkan.",
};

export const SOURCES = {
  bps: "BPS",
  bpsEst: "BPS (estimasi)",
  worldBank: "Bank Dunia",
  kemenkes: "Kemenkes",
  ssgi: "SSGI (Kemenkes)",
};

// Indikator utama per tahun (untuk pemilih tahun di Dasbor).
// value: angka; unit; label; source; year.
export const YEARS = ["2022", "2023", "2024"];

export const KEY_INDICATORS = [
  {
    id: "penduduk",
    label: "Penduduk",
    format: "jt",
    byYear: {
      2022: { value: 275.8, source: SOURCES.bpsEst, year: "2022" },
      2023: { value: 278.7, source: SOURCES.bpsEst, year: "2023" },
      2024: { value: 281.6, source: SOURCES.bpsEst, year: "2024" },
    },
    blurb: "Jiwa, pertengahan tahun",
  },
  {
    id: "pdb",
    label: "Pertumbuhan ekonomi",
    format: "pct",
    byYear: {
      2022: { value: 5.31, source: SOURCES.bps, year: "2022" },
      2023: { value: 5.05, source: SOURCES.bps, year: "2023" },
      2024: { value: 5.03, source: SOURCES.bps, year: "2024" },
    },
    blurb: "PDB tumbuh y-on-y",
  },
  {
    id: "inflasi",
    label: "Inflasi",
    format: "pct",
    byYear: {
      2022: { value: 5.51, source: SOURCES.bps, year: "2022" },
      2023: { value: 2.61, source: SOURCES.bps, year: "2023" },
      2024: { value: 1.57, source: SOURCES.bps, year: "2024" },
    },
    blurb: "Desember, y-on-y",
  },
  {
    id: "pengangguran",
    label: "Pengangguran",
    format: "pct",
    byYear: {
      2022: { value: 5.86, source: SOURCES.bps, year: "2022" },
      2023: { value: 5.32, source: SOURCES.bps, year: "2023" },
      2024: { value: 4.91, source: SOURCES.bps, year: "2024" },
    },
    blurb: "TPT, Agustus",
  },
  {
    id: "kemiskinan",
    label: "Kemiskinan",
    format: "pct",
    byYear: {
      2022: { value: 9.57, source: SOURCES.bps, year: "2022" },
      2023: { value: 9.36, source: SOURCES.bps, year: "2023" },
      2024: { value: 8.57, source: SOURCES.bps, year: "2024" },
    },
    blurb: "Penduduk miskin, September",
  },
  {
    id: "harapan-hidup",
    label: "Harapan hidup",
    format: "tahun",
    byYear: {
      2022: { value: 73.3, source: SOURCES.bpsEst, year: "2022" },
      2023: { value: 73.8, source: SOURCES.bpsEst, year: "2023" },
      2024: { value: 74.1, source: SOURCES.bpsEst, year: "2024" },
    },
    blurb: "Umur harapan hidup saat lahir",
  },
];

// Penduduk per provinsi, 2024 (juta jiwa, BPS estimasi).
export const PROVINCES = [
  { name: "Jawa Barat", pop: 49.9, island: "Jawa", source: SOURCES.bpsEst, year: "2024" },
  { name: "Jawa Timur", pop: 41.8, island: "Jawa", source: SOURCES.bpsEst, year: "2024" },
  { name: "Jawa Tengah", pop: 38.3, island: "Jawa", source: SOURCES.bpsEst, year: "2024" },
  { name: "Sumatera Utara", pop: 16.1, island: "Sumatera", source: SOURCES.bpsEst, year: "2024" },
  { name: "Banten", pop: 12.7, island: "Jawa", source: SOURCES.bpsEst, year: "2024" },
  { name: "DKI Jakarta", pop: 10.6, island: "Jawa", source: SOURCES.bpsEst, year: "2024" },
  { name: "Sulawesi Selatan", pop: 9.5, island: "Sulawesi", source: SOURCES.bpsEst, year: "2024" },
  { name: "Lampung", pop: 9.4, island: "Sumatera", source: SOURCES.bpsEst, year: "2024" },
  { name: "Sumatera Selatan", pop: 9.0, island: "Sumatera", source: SOURCES.bpsEst, year: "2024" },
  { name: "Riau", pop: 6.9, island: "Sumatera", source: SOURCES.bpsEst, year: "2024" },
];

// Sebaran penduduk per pulau, 2024 (persen, BPS estimasi).
export const ISLAND_SHARE = [
  { name: "Jawa", share: 56, source: SOURCES.bpsEst, year: "2024" },
  { name: "Sumatera", share: 22, source: SOURCES.bpsEst, year: "2024" },
  { name: "Sulawesi", share: 7, source: SOURCES.bpsEst, year: "2024" },
  { name: "Kalimantan", share: 6, source: SOURCES.bpsEst, year: "2024" },
  { name: "Bali & Nusa Tenggara", share: 5, source: SOURCES.bpsEst, year: "2024" },
  { name: "Maluku & Papua", share: 4, source: SOURCES.bpsEst, year: "2024" },
];

// Ekonomi.
export const ECONOMY = {
  gdpNominal: { value: "Rp 22.139 triliun", source: SOURCES.bps, year: "2024" },
  gdpPerCapita: { value: "US$ 4.960", source: SOURCES.worldBank, year: "2024" },
  growthTrend: [
    { year: "2020", value: -2.07, source: SOURCES.bps, year: "2020" },
    { year: "2021", value: 3.7, source: SOURCES.bps, year: "2021" },
    { year: "2022", value: 5.31, source: SOURCES.bps, year: "2022" },
    { year: "2023", value: 5.05, source: SOURCES.bps, year: "2023" },
    { year: "2024", value: 5.03, source: SOURCES.bps, year: "2024" },
  ],
  inflationTrend: [
    { year: "2020", value: 1.68, source: SOURCES.bps, year: "2020" },
    { year: "2021", value: 1.87, source: SOURCES.bps, year: "2021" },
    { year: "2022", value: 5.51, source: SOURCES.bps, year: "2022" },
    { year: "2023", value: 2.61, source: SOURCES.bps, year: "2023" },
    { year: "2024", value: 1.57, source: SOURCES.bps, year: "2024" },
  ],
  // Pangsa PDB menurut lapangan usaha, 2024 (persen, BPS).
  sectors: [
    { name: "Industri pengolahan", share: 18.7, source: SOURCES.bps, year: "2024" },
    { name: "Perdagangan", share: 13.0, source: SOURCES.bps, year: "2024" },
    { name: "Pertanian", share: 12.5, source: SOURCES.bps, year: "2024" },
    { name: "Konstruksi", share: 9.7, source: SOURCES.bps, year: "2024" },
    { name: "Pertambangan", share: 7.3, source: SOURCES.bps, year: "2024" },
    { name: "Transportasi & pergudangan", share: 4.7, source: SOURCES.bps, year: "2024" },
    { name: "Lainnya", share: 34.1, source: SOURCES.bps, year: "2024" },
  ],
};

// Pendidikan.
export const EDUCATION = [
  { label: "Melek huruf usia 15+", value: "96,5%", source: SOURCES.bps, year: "2024", note: "Penduduk yang dapat membaca dan menulis" },
  { label: "Rata-rata lama sekolah", value: "9,1 tahun", source: SOURCES.bps, year: "2024", note: "Penduduk usia 25 tahun ke atas" },
  { label: "Harapan lama sekolah", value: "13,2 tahun", source: SOURCES.bps, year: "2024", note: "Anak usia 7 tahun ke atas" },
  { label: "Partisipasi sekolah SD", value: "99,2%", source: SOURCES.bps, year: "2023", note: "Angka partisipasi murni, usia 7–12 tahun" },
  { label: "Partisipasi sekolah SMP", value: "95,9%", source: SOURCES.bps, year: "2023", note: "Angka partisipasi murni, usia 13–15 tahun" },
  { label: "Partisipasi sekolah SMA", value: "71,6%", source: SOURCES.bps, year: "2023", note: "Angka partisipasi murni, usia 16–18 tahun" },
];

// Kesehatan.
export const HEALTH = [
  { label: "Harapan hidup", value: "74,1 tahun", source: SOURCES.bpsEst, year: "2024", note: "Umur harapan hidup saat lahir" },
  { label: "Kematian bayi", value: "16,8", source: SOURCES.bpsEst, year: "2023", note: "Per 1.000 kelahiran hidup (estimasi)" },
  { label: "Balita stunting", value: "21,5%", source: SOURCES.ssgi, year: "2023", note: "Survei Status Gizi Indonesia" },
  { label: "Kematian ibu", value: "173", source: SOURCES.kemenkes, year: "2023", note: "Per 100.000 kelahiran hidup (estimasi)" },
  { label: "Akses air minum layak", value: "92,6%", source: SOURCES.bps, year: "2024", note: "Rumah tangga" },
  { label: "Sanitasi layak", value: "83,4%", source: SOURCES.bps, year: "2024", note: "Rumah tangga" },
];

// Wawasan singkat berbahasa awam (setiap klaim merujuk angka di atas).
export const INSIGHTS = [
  { text: "Jawa Barat tetap provinsi terpadat: 49,9 juta jiwa, hampir seperlima penduduk Indonesia.", source: SOURCES.bpsEst, year: "2024" },
  { text: "Lebih dari separuh penduduk tinggal di Jawa (56%), padahal luasnya hanya sekitar 7% wilayah Indonesia.", source: SOURCES.bpsEst, year: "2024" },
  { text: "Inflasi melandai ke 1,57% pada 2024, terendah dalam lima tahun terakhir, setelah 5,51% pada 2022.", source: SOURCES.bps, year: "2024" },
  { text: "Ekonomi tumbuh 5,03% pada 2024; industri pengolahan penyumbang terbesar PDB (18,7%).", source: SOURCES.bps, year: "2024" },
  { text: "Pengangguran turun ke 4,91% pada Agustus 2024, dan kemiskinan ke 8,57% pada September 2024.", source: SOURCES.bps, year: "2024" },
  { text: "Satu dari lima balita masih stunting (21,5%) — tantangan kesehatan terbesar setelah gizi.", source: SOURCES.ssgi, year: "2023" },
];

export function formatValue(indicator, year) {
  const d = indicator.byYear[year];
  if (indicator.format === "jt") return `${d.value.toLocaleString("id-ID")} jt`;
  if (indicator.format === "pct") return `${d.value.toLocaleString("id-ID")}%`;
  if (indicator.format === "tahun") return `${d.value.toLocaleString("id-ID")} thn`;
  return String(d.value);
}
