import * as glob from "glob";
import { promisify } from "util";
import { outputFile } from "fs-extra";
import { useModules } from "./useModules";
import { useImports } from "./useImports";
import { resolve } from "path";

const globSync = promisify(glob);

export async function build({ globPattern, cwd, out, modules }) {
  const files = await globSync(globPattern, {
    cwd,
  });

  await outputFile(
    resolve(cwd, out),
    `\
import dynamic from "next/dynamic";
  
const Components = {${useModules(modules)}${useImports(files)}
};
  
export default Components;
`
  );
}
