#!/usr/bin/env node
const { ensureDir } = require("fs-extra");

const { generateDocumentation } = require("tsdoc-markdown");
const glob = require("glob");

async function generate(folder) {
  const files = glob.sync(`./${folder}/**/*.{ts,tsx}`);

  await ensureDir(`./docs/${folder}.md`.replace(/\/[^/]+$/, ""));
  generateDocumentation({
    inputFiles: files,
    outputFile: `./docs/${folder}.md`,
  });
}

["workspaces/async-component", "workspaces/build-tools"].forEach(generate);
