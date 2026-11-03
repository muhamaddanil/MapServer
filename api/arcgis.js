// Proxy tipis ke ArcGIS REST BIG (dipakai bila server BIG memblokir CORS).
// Hanya meneruskan operasi "query" ke layer 6, tidak ada URL lain yang bisa diakses.
const BASE =
  "https://geoservices.big.go.id/gis/rest/services/PTRA/Atlas_Perkembangan_Wilayah_Administrasi/MapServer/6/query";

export default async function handler(req, res) {
  try {
    const qs = new URLSearchParams(req.query).toString();
    const upstream = await fetch(`${BASE}?${qs}`);
    const body = await upstream.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    res.status(upstream.status).send(body);
  } catch (err) {
    res.status(502).json({ error: "Gagal menghubungi server BIG", detail: String(err) });
  }
}
