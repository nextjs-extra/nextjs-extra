import { build } from "./build";
import { watcher } from "./watcher";

type BuildStyleOptions = {
  globPattern?: string;
  cwd?: string;
  outStyle?: string;
  outVars?: string;
  watch?: boolean;
  variables?: Record<string, string>;
};

type BuildOptions = {
  globPattern: string;
  cwd: string;
  outStyle: string;
  outVars: string;
  variables: Record<string, string>;
};

const defaultOptions: BuildStyleOptions = {
  globPattern: "**/*.{global,component}.{css,scss}",
  cwd: process.cwd(),
  outStyle: "style.scss",
  outVars: "vars.css",
  variables: {},
};

export async function buildStyle(options: BuildStyleOptions = defaultOptions) {
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
