// Tells Bing, Copilot, Yandex and other IndexNow engines that pages changed.
// Run after a deploy: npm run indexnow -- https://your-domain
const KEY = "a024a6f8878d3065c1f97e1b7db1f620"; // also served at /a024a6f8878d3065c1f97e1b7db1f620.txt to prove you own the site

const site = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
if (!site) {
  console.error("Usage: npm run indexnow -- https://your-domain");
  process.exit(1);
}

const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key: KEY, keyLocation: `${site}/${KEY}.txt`, urlList }),
});
console.log(`Submitted ${urlList.length} URLs: ${res.status} ${res.statusText}`);
