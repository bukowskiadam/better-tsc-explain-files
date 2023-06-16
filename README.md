# Better TSC `--explainFiles` output

This tool aims to trace the file load tree.

If you run

```
tsc --explainFiles
```

you get something like

```
src/file.ts
  Imported via './file' from file 'src/other-file.ts'
src/other-file.ts
  Imported via './other-file' from file 'src/main.ts'
```

It is hard to trace all root files that caused `src/file` to be loaded.

The goal is to have an output like

```
src/file.ts < src/other-file.ts < src/main.ts
```

So you can easily trace the root file

## Usage

Run `tsc --explainFiles` and pipe the output through it

```
tsc --explainFiles | npx better-tsc-explain-files
```

Optionally you can provide a file path to output only this file

```
tsc --explainFiles | npx better-tsc-explain-files "src/file.ts"
```

**It requires TypeScript compiler output in English!**
