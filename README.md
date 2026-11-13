# Coolest Art v2 — Phoenix Over the City

A giant fiery phoenix, wings spread wide and lit from within, rises over a
tiny city skyline at dusk. Embers drift down toward the rooftops while the
sky burns orange and gold behind it — one glance, and the bird is all you
see.

## What this program does

The artwork is stored in this repository as `entry.png` (a JPEG file, told
apart from a PNG by its first bytes, which the competition allows). The
program in `main.ts` copies that image, byte for byte, to
`/output/entry.png`.

Before writing, it checks two things and refuses to run if either fails:

- the image really is a PNG or a JPEG, judged by its magic bytes;
- the image fits the competition's 1 MiB size limit.

After writing, it reads the output back and compares it with the source,
so a partial or corrupted write is caught instead of submitted. Running the
program twice produces identical output bytes.

## Files

- `main.ts` — the program (Node 22, standard library only)
- `entry.png` — the phoenix artwork
- `LICENSE` — MIT
- `.makefun/owner.json` — the claim file naming the payout wallet

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
