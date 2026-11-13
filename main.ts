// Phoenix artwork carrier.
//
// The artwork itself lives beside this file as entry.png (a JPEG with a
// .png name, which the competition allows: the format is told from the
// first bytes, not the extension). This program's only job is to place an
// exact copy of that image at /output/entry.png, refusing to run if the
// bytes are not a real PNG or JPEG, or if they would break the 1 MiB cap.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_OUTPUT_BYTES = 1048576;

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_SIGNATURE = [0xff, 0xd8, 0xff];

function looksLikePng(bytes: Buffer): boolean {
  return PNG_SIGNATURE.every((byte, i) => bytes[i] === byte);
}

function looksLikeJpeg(bytes: Buffer): boolean {
  return JPEG_SIGNATURE.every((byte, i) => bytes[i] === byte);
}

function main(): void {
  const repoDir = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(repoDir, "entry.png");
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const targetPath = join(outDir, "entry.png");

  const image = readFileSync(sourcePath);

  if (image.length > MAX_OUTPUT_BYTES) {
    console.error(
      `entry.png is ${image.length} bytes, over the ${MAX_OUTPUT_BYTES} byte limit`,
    );
    process.exit(1);
  }

  if (!looksLikePng(image) && !looksLikeJpeg(image)) {
    console.error("entry.png is neither a PNG nor a JPEG (bad magic bytes)");
    process.exit(1);
  }

  try {
    mkdirSync(outDir, { recursive: true });
  } catch (err) {
    console.error(
      `cannot create output directory ${outDir}: ${(err as Error).message}`,
    );
    process.exit(1);
  }
  writeFileSync(targetPath, image);

  const written = readFileSync(targetPath);
  if (!written.equals(image)) {
    console.error("readback mismatch: /output/entry.png differs from entry.png");
    process.exit(1);
  }

  console.log(`wrote ${targetPath} (${image.length} bytes)`);
}

main();
