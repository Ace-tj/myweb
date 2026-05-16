/* Build-time Pexels photo fetcher.
 *
 *   PEXELS_KEY=xxx node scripts/fetch-pexels.cjs
 *
 * Queries Pexels for each themed category and writes
 * src/data/photos.json. The key is NEVER stored in the output —
 * only the public photo URLs and required attribution fields.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const KEY = process.env.PEXELS_KEY;
if (!KEY) {
  console.error("ERROR: PEXELS_KEY env var is required");
  process.exit(1);
}

const CATEGORIES = [
  { key: "office",                query: "modern office team meeting laptop",    count: 5,  orientation: "landscape" },
  { key: "shop_products",         query: "fashion product white background",      count: 24, orientation: "portrait" },
  { key: "restaurant_food",       query: "fine dining plated dish gourmet",       count: 24, orientation: "landscape" },
  { key: "gym_fitness",           query: "gym workout fitness training equipment", count: 24, orientation: "landscape" },
  { key: "clinic_doctors",        query: "doctor stethoscope white coat",         count: 15, orientation: "portrait" },
  { key: "clinic_patients",       query: "patient portrait healthcare smiling",   count: 20, orientation: "portrait" },
  { key: "school_kids",           query: "classroom children students learning",  count: 24, orientation: "landscape" },
  { key: "university_campus",     query: "university campus students library",    count: 15, orientation: "landscape" },
  { key: "personal_contacts",     query: "professional headshot diverse smiling", count: 30, orientation: "portrait" },
  { key: "logistics_trucks",      query: "delivery truck warehouse shipping",     count: 20, orientation: "landscape" },
  { key: "accounting_business",   query: "business finance meeting documents",    count: 15, orientation: "landscape" },
  { key: "avatars",               query: "professional headshot business portrait", count: 30, orientation: "portrait" },
  { key: "testimonial_restaurant", query: "restaurant owner chef portrait",        count: 3,  orientation: "portrait" },
  { key: "testimonial_school",     query: "school principal teacher portrait",     count: 3,  orientation: "portrait" },
  { key: "testimonial_logistics",  query: "logistics manager warehouse portrait",  count: 3,  orientation: "portrait" },
];

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { headers: { Authorization: KEY } },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 200)}`));
          }
          try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
        });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

function pick(photo) {
  return {
    id: photo.id,
    alt: photo.alt || "",
    src: photo.src.large,
    thumb: photo.src.medium,
    portrait: photo.src.portrait,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    avgColor: photo.avg_color,
  };
}

(async () => {
  const out = { generatedAt: new Date().toISOString(), categories: {} };

  for (const c of CATEGORIES) {
    const url =
      `https://api.pexels.com/v1/search` +
      `?query=${encodeURIComponent(c.query)}` +
      `&per_page=${c.count}` +
      `&orientation=${c.orientation}`;
    process.stdout.write(`  ${c.key.padEnd(28)} (${c.count}) … `);
    try {
      const data = await fetchJSON(url);
      out.categories[c.key] = (data.photos || []).map(pick);
      console.log(`OK (${out.categories[c.key].length})`);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      out.categories[c.key] = [];
    }
  }

  const dest = path.join(__dirname, "..", "src", "data", "photos.json");
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, JSON.stringify(out, null, 2));
  const total = Object.values(out.categories).reduce((s, a) => s + a.length, 0);
  console.log(`\nWrote ${total} photos to ${dest}`);
})();
