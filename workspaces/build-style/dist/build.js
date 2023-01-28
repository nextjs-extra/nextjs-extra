"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const promises_1 = require("fs/promises");
const glob = require("glob");
const path_1 = require("path");
const util_1 = require("util");
const fs_extra_1 = require("fs-extra");
const globSync = (0, util_1.promisify)(glob);
const getNameRegex = /(?<name>[^/]+)\.component\.s?css$/;
async function build({ globPattern, cwd, outStyle, outVars, variables, }) {
    const files = await globSync(globPattern, {
        cwd,
    });
    let scss = "";
    const vars = new Set();
    for (const file of files) {
        const content = await (0, promises_1.readFile)((0, path_1.resolve)(cwd, file), "utf-8");
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
        }
        else {
            varsFile += `  /* --${varName}: ;  /* undefined */\n`;
        }
    }
    for (const varName in variablesCopy) {
        varsFile += `  --${varName}: ${variables[varName]}; /* unused */\n`;
    }
    varsFile += "}";
    await (0, fs_extra_1.outputFile)((0, path_1.resolve)(cwd, outVars), varsFile);
    await (0, fs_extra_1.outputFile)((0, path_1.resolve)(cwd, outStyle), scss);
}
exports.build = build;
//# sourceMappingURL=build.js.map