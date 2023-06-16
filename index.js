#!/usr/bin/env node

import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line) => {
  console.log(line);
});

rl.once("close", () => {
  // end of input
});
