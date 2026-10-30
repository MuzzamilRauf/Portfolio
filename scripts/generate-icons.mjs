// Regenerates public/favicon.svg, apple-touch-icon.png, icon-512.png, and og.png
// from `site.name` and `site.role` in src/config.ts. Run with `pnpm icons`.
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const config = readFileSync(
  new URL("../src/config.ts", import.meta.url),
  "utf8",
);
const read = (key) => config.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1];
const name = read("name") ?? "Your Name";
const role = read("role") ?? "";
const initials = name
  .split(/\s+/)
  .map((w) => w[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const pub = new URL("../public/", import.meta.url);

// Same badge as Logo.astro: rounded mint frame + initials on navy. `inset` adds breathing room
// for icons that the OS crops or rounds (Apple touch icon, PWA icon).
const badge = (inset) => {
  const o = inset ? 7 : 3;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <title>${esc(name)}</title>
  <rect width="48" height="48" rx="${inset ? 0 : 10}" fill="#0a192f"/>
  <rect x="${o}" y="${o}" width="${48 - 2 * o}" height="${48 - 2 * o}" rx="8" fill="none" stroke="#64ffda" stroke-width="2.5"/>
  <text x="24" y="${inset ? 29.5 : 30.5}" text-anchor="middle" font-family="Menlo, monospace" font-size="${inset ? 14 : 17}" font-weight="700" fill="#64ffda">${initials}</text>
</svg>`;
};

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0a192f"/>
  <rect x="40" y="40" width="1120" height="550" rx="16" fill="none" stroke="#233554" stroke-width="2"/>
  <g transform="translate(100 120) scale(2.2)">
    <rect x="3" y="3" width="42" height="42" rx="10" fill="none" stroke="#64ffda" stroke-width="2.5"/>
    <text x="24" y="30.5" text-anchor="middle" font-family="Menlo, monospace" font-size="17" font-weight="700" fill="#64ffda">${initials}</text>
  </g>
  <text x="100" y="370" font-family="Helvetica, Arial, sans-serif" font-size="84" font-weight="700" fill="#e6f1ff">${esc(name)}</text>
  <text x="100" y="440" font-family="Helvetica, Arial, sans-serif" font-size="40" fill="#8892b0">${esc(role)}</text>
  <text x="100" y="530" font-family="Menlo, monospace" font-size="26" fill="#64ffda">Portfolio · Projects · Blog</text>
</svg>`;

writeFileSync(new URL("favicon.svg", pub), badge(false));
await sharp(Buffer.from(badge(true)))
  .resize(180, 180)
  .png()
  .toFile(new URL("apple-touch-icon.png", pub).pathname);
await sharp(Buffer.from(badge(true)))
  .resize(512, 512)
  .png()
  .toFile(new URL("icon-512.png", pub).pathname);
await sharp(Buffer.from(og))
  .png({ compressionLevel: 9 })
  .toFile(new URL("og.png", pub).pathname);
console.log(`Icons and og.png generated for "${name}" (${initials}).`);
