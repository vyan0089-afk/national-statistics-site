# StatistikNusa

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/vyan0089-afk/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/vyan0089-afk/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

Statistik nasional Indonesia, satu tempat: lima halaman (Ringkasan, Penduduk, Ekonomi,
Pendidikan, Kesehatan) atas angka-angka Indonesia — setiap angka dilabeli sumber dan
tahunnya (BPS, Bank Dunia, Kemenkes, SSGI).

Dibangun untuk bounty make.fun
[best-national-statistics-site-20261126-0539](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## Menjalankan

```sh
node serve.ts
```

Lalu buka http://localhost:8080.

## Isi

- `app/` — situs statis (HTML + CSS + vanilla JS, tanpa framework, tanpa request eksternal)
- `screenshots/` — 4 tangkapan layar situs yang sedang berjalan (1-overview.png adalah cover)
- `main.ts` — entrypoint: menyalin `app/` dan `screenshots/` ke `/output` dan menulis `dossier.json`
