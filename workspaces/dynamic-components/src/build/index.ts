import { build } from "./build";
import { watcher } from "./watcher";

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

export async function buildDynamicomponents(
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
