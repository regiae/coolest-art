import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');
const bytes = readFileSync(source);
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const jpegMagic = Buffer.from([0xff, 0xd8, 0xff]);
const isPng = bytes.subarray(0, 8).equals(pngMagic);
const isJpeg = bytes.subarray(0, 3).equals(jpegMagic);
if (!isPng && !isJpeg) {
  console.error('entry.png is neither PNG nor JPEG');
  process.exit(1);
}
writeFileSync(target, bytes);
const back = readFileSync(target);
if (!back.equals(bytes)) {
  console.error('output bytes differ from entry.png');
  process.exit(1);
}
if (back.length > 1048576) {
  console.error('output is larger than the 1048576 byte gate limit');
  process.exit(1);
}
