import { readFile } from "fs/promises";
import * as glob from "glob";
import { resolve } from "path";
import { promisify } from "util";
import { outputFile } from "fs-extra";

const globSync = promisify(glob);

const getNameRegex = /(?<name>[^/]+)\.component\.s?css$/;

export async function build({
  globPattern,
  cwd,
  outStyle,
  outVars,
  variables,
}) {
  const files = await globSync(globPattern, {
    cwd,
  });

  let scss = "";
  const vars = new Set<string>();

  for (const file of files) {
    console.log("file", file);

    const content = await readFile(resolve(cwd, file), "utf-8");

    const name = getNameRegex.exec(file)?.groups?.name;

    scss += `/* start file: ${file} */\n`;

    if (name) {
      scss += `${name} {\n`;
    }
    scss += content;
    if (name) {
      scss += `}\n`;
    }
    scss += `/* end file: ${file} */\n\n`;

    const matches = content.matchAll(/var\(--(?<var>[^,)]+)/g);

    for (const match of matches) {
      if (match.groups?.var) {
        vars.add(match.groups.var);
      }
    }
  }

  let varsFile = ":root {\n";
  const varsArray = Array.from(vars);
  varsArray.sort();

  const variablesCopy = { ...variables };

  for (const varName of varsArray) {
    if (variables[varName]) {
      varsFile += `  --${varName}: ${variables[varName]};\n`;
      delete variablesCopy[varName];
    } else {
      varsFile += `  /* --${varName}: ;  /* undefined */\n`;
    }
  }
  for (const varName in variablesCopy) {
    varsFile += `  --${varName}: ${variables[varName]}; /* unused */\n`;
  }
  varsFile += "}";

  await outputFile(resolve(cwd, outVars), varsFile);
  await outputFile(resolve(cwd, outStyle), scss);
}
