# Coolest Art

A single piece of art for the make.fun coolest-art-01 bounty: a giant
glowing jellyfish drifting above a tiny night city.

The program does one thing. It reads the `entry.png` sitting next to it,
checks that the file really is a PNG or a JPEG from its first bytes, and
copies those bytes unchanged to `$MAKEFUN_OUTPUT_DIR/entry.png` (or
`/output/entry.png` when the variable is not set). After writing, it reads
the output back and compares it byte for byte with the source, quitting
with an error if anything differs.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Run it twice into two different folders and the two outputs are
byte-identical to each other and to `entry.png`. The program uses only the
Node 22 standard library and needs no network.
