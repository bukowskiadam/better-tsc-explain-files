#!/usr/bin/env node

import readline from "node:readline";
import { exit, argv } from "node:process";

const fileToTrace = argv[2];
const files = new Map();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let currentFile = null;

rl.on("line", (line) => {
  if (line.startsWith("  ")) {
    const match = line.match(/from file '(.+)'/);
    const fromFile = match?.[1];

    if (currentFile && fromFile) {
      files.get(currentFile).push(fromFile);
    }
  } else {
    currentFile = line.trim();

    if (currentFile) {
      files.set(currentFile, []);
    }
  }
});

rl.once("close", () => {
  if (fileToTrace) {
    if (!files.has(fileToTrace)) {
      console.error(
        `No such file as '${fileToTrace}' on the loaded files list!`
      );

      exit(1);
    }

    traceFile(fileToTrace);
  } else {
    for (const file of files.keys()) {
      traceFile(file);
    }
  }

  exit(0);
});

function traceFile(file, trace = [file]) {
  const loadedBy = files.get(file) ?? [];

  if (!loadedBy.length) {
    printFileTrace(trace);
  }

  for (const nextFile of loadedBy) {
    if (trace.includes(nextFile)) {
      printFileTrace([...trace, `!! circular dep to ${nextFile}`]);
    } else {
      traceFile(nextFile, [...trace, nextFile]);
    }
  }
}

function printFileTrace(trace) {
  console.log(trace.join(" < "));
}
