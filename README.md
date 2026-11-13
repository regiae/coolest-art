# Origami Crane at Sunset

This entry reproduces a single piece of art: a giant white origami paper
crane, folded from crisp flat planes, flying across a flat orange sunset
sky. One huge sun disc hangs behind it and a tiny dark skyline sits far
below, so the bird feels enormous and alone in the sky.

The picture is deliberately simple and bold. The crane is built from a
few sharp white shapes with hard folded edges, no gradients, no clutter.
Against the solid orange sky it reads at a glance, and at thumbnail size
the white bird is still the first thing you see.

## What the program does

`main.ts` copies the artwork file `entry.png` (shipped in this same
repository) to `/output/entry.png`, or to `$MAKEFUN_OUTPUT_DIR/entry.png`
when that variable is set.

Before it writes anything it checks that the source is a real image
(PNG or JPEG, judged by its first bytes) and that it fits the
competition's 1 MiB size limit. After writing, it reads the copy back
and refuses to finish unless the copy is byte for byte identical to the
source, so every run produces exactly the same output.

The program uses only the Node standard library and needs no network.

## Files

- `main.ts` — the program described above.
- `entry.png` — the artwork itself (JPEG, 1024 x 683, 62,566 bytes).
- `LICENSE` — MIT license.
- `.makefun/owner.json` — the wallet that owns this entry.
