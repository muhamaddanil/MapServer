// Proxy tipis ke ArcGIS REST BIG (dipakai bila server BIG memblokir CORS).
//  /api/arcgis                      -> daftar layer (MapServer?f=json)
//  /api/arcgis?layer=6&where=...    -> query ke layer 6
const ROOT =
  "https://geoservices.big.go.id/gis/rest/services/PTRA/Atlas_Perkembangan_Wilayah_Administrasi/MapServer";

export default async function handler(req, res) {
  try {
    const { layer, ...rest } = req.query;
    let url;
    if (layer === undefined) {
      url = `${ROOT}?f=json`;
    } else {
      if (!/^\d{1,3}$/.test(String(layer))) {
        return res.status(400).json({ error: "layer tidak valid" });
      }
      url = `${ROOT}/${layer}/query?${new URLSearchParams(rest).toString()}`;
    }
    const upstream = await fetch(url);
    const body = await upstream.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    res.status(upstream.status).send(body);
  } catch (err) {
    res.status(502).json({ error: "Gagal menghubungi server BIG", detail: String(err) });
  }
}