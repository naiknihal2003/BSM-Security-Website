/**
 * Content check: what is still waiting on BSM.
 *
 *   npm run check:content
 *
 * Nothing on this site invents BSM's clients, figures or photographs. Anything
 * unverified is either a [BRACKETED PLACEHOLDER] in the content files or an
 * empty media entry, and both render in a visibly unfinished state. This lists
 * them, so going live is a decision rather than an oversight.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOTS = ["lib", "app", "components"];
const BRACKETED = /\[[A-Z][A-Z0-9 ,/&().'-]{2,}\]/g;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if ([".ts", ".tsx"].includes(extname(entry.name))) yield path;
  }
}

const placeholders = [];
for (const root of ROOTS) {
  for await (const file of walk(root)) {
    const lines = (await readFile(file, "utf8")).split("\n");
    lines.forEach((line, i) => {
      for (const hit of line.match(BRACKETED) ?? []) {
        placeholders.push({ file, line: i + 1, hit });
      }
    });
  }
}

const media = await readFile("lib/media/photos.ts", "utf8");
const emptyShots = [...media.matchAll(/(\w+):\s*\{\s*\n\s*src:\s*""/g)].map((m) => m[1]);

const logos = await readFile("lib/media/client-logos.ts", "utf8");
const emptyLogos = [...logos.matchAll(/"?([\w-]+)"?:\s*""/g)].map((m) => m[1]);

console.log(`\nPlaceholders in content: ${placeholders.length}`);
for (const p of placeholders) console.log(`  ${p.file}:${p.line}  ${p.hit}`);

console.log(`\nPhotographs not supplied: ${emptyShots.length}`);
for (const s of emptyShots) console.log(`  media.${s}`);

console.log(`\nClient logos not supplied: ${emptyLogos.length}`);
for (const l of emptyLogos) console.log(`  ${l}`);

console.log("");
