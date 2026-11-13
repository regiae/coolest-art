// Origami crane artwork entry for make.fun coolest-art-01.
//
// The artwork is a single image, entry.png, shipped next to this file.
// This program places an exact copy of it at /output/entry.png (or
// $MAKEFUN_OUTPUT_DIR/entry.png when that variable is set), so the
// judge sees the same bytes every time.
//
// Before writing, it checks three things:
//   1. the source file starts with a real PNG or JPEG signature,
//   2. the source file is no bigger than the 1 MiB gate,
//   3. the copy it just wrote reads back byte for byte identical.
//
// Only the Node standard library is used. No network, no randomness.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1048576;

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);

function looksLikeImage(bytes) {
  if (bytes.length >= PNG_MAGIC.length && bytes.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC)) {
    return "png";
  }
  if (bytes.length >= JPEG_MAGIC.length && bytes.subarray(0, JPEG_MAGIC.length).equals(JPEG_MAGIC)) {
    return "jpeg";
  }
  return null;
}

function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(here, "entry.png");
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outPath = join(outDir, "entry.png");

  const bytes = readFileSync(sourcePath);

  const kind = looksLikeImage(bytes);
  if (kind === null) {
    console.error("entry.png is neither a PNG nor a JPEG (bad magic bytes)");
    process.exit(1);
  }

  if (bytes.length > MAX_BYTES) {
    console.error(`entry.png is ${bytes.length} bytes, over the 1048576 byte limit`);
    process.exit(1);
  }

  try {
    mkdirSync(outDir, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
  writeFileSync(outPath, bytes);

  // Read the copy back and demand it matches the source exactly.
  const written = readFileSync(outPath);
  if (!written.equals(bytes)) {
    console.error("readback mismatch: /output/entry.png differs from entry.png");
    process.exit(1);
  }

  console.log(`wrote ${outPath} (${kind}, ${bytes.length} bytes, verified identical)`);
}

main();
