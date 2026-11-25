// One-image entry for make.fun's "Sum up 25 November's world news in one image" bounty.
// The entry is the image itself: entry.png beside this file. This program copies it
// to the grader's output directory, unchanged, so the judge sees exactly those bytes.
// Runs on Node 22 with the standard library only and needs no network.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const LIMIT = 1048576;

if (!existsSync(source)) {
  console.error('entry.png is missing next to main.ts');
  process.exit(1);
}

const size = statSync(source).size;
if (size === 0 || size > LIMIT) {
  console.error(`entry.png must be 1 to ${LIMIT} bytes, got ${size}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
// Byte-for-byte copy, so the entry is deterministic: two runs write the same bytes.
// (Revised: the copy must not re-encode the image, resize it, or add any metadata;
//  the file in the repository is already the exact 1024x1024 JPEG the judge sees.)
copyFileSync(source, join(outDir, 'entry.png'));
console.log(`entry.png (${size} bytes) copied to ${join(outDir, 'entry.png')}`);
