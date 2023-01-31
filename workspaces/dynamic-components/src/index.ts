import { build } from "./build/build";
import { watcher } from "./build/watcher";

type BuildStyleOptions = {
  globPattern?: string;
  cwd?: string;
  out?: string;
  modules?: Array<string>;
  watch?: boolean;
};

type BuildOptions = {
  globPattern: string;
  cwd: string;
  out: string;
  modules: Array<string>;
};

const defaultOptions: BuildStyleOptions = {
  globPattern: "**/*.dynamic.{jsx,tsx,js,ts,cjs,mjs}",
  cwd: process.cwd(),
  out: "Components.jsx",
  modules: [],
};

export async function buildDynamiComponents(
  options: BuildStyleOptions = defaultOptions
) {
  const watch = Boolean(options.watch);
  delete options.watch;

  const buildOptions = Object.assign(
    {},
    defaultOptions,
    options
  ) as BuildOptions;

  await build(buildOptions);
  if (!watch) {
    return;
  }
  watcher(buildOptions);
}
