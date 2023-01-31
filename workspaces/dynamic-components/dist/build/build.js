"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const glob = require("glob");
const util_1 = require("util");
const fs_extra_1 = require("fs-extra");
const useModules_1 = require("./useModules");
const useImports_1 = require("./useImports");
const path_1 = require("path");
const globSync = (0, util_1.promisify)(glob);
async function build({ globPattern, cwd, out, modules }) {
    const files = await globSync(globPattern, {
        cwd,
    });
    await (0, fs_extra_1.outputFile)((0, path_1.resolve)(cwd, out), `\
import dynamic from "next/dynamic";
import { DC } from "@nextjs-extra/dynamic-components/DC";

export const Components = {${(0, useModules_1.useModules)(modules)}${(0, useImports_1.useImports)(files)}
};

export function DComponent({ type, props, children = null }) {
  return <DC type={type} Components={Components} props={props}>{children}</DC>;
}
`);
}
exports.build = build;
//# sourceMappingURL=build.js.map