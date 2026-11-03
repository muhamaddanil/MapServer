# Atlas Batas Provinsi Indonesia 1945–1976

Peta web statis (Leaflet) yang membaca layer ArcGIS REST BIG:
`.../Atlas_Perkembangan_Wilayah_Administrasi/MapServer/6`

## Deploy ke Vercel
1. Upload folder ini ke GitHub (atau jalankan `npx vercel` di folder ini).
2. Di vercel.com pilih **Add New → Project**, impor repo, lalu **Deploy**. Tanpa build command.

## Jalan lokal
`npx vercel dev` (agar proxy `/api/arcgis` ikut berjalan).

## Catatan
- Halaman mencoba memanggil server BIG langsung. Jika diblokir CORS, otomatis beralih ke proxy `api/arcgis.js`.
- Layer ini bertipe garis (polyline) dengan satu atribut: `BTS_ADMIN` (contoh: "Batas Provinsi Tahun 1976"), jadi tidak ada nama provinsi per garis.
