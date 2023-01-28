import { build } from "./build";
import { waitAndCallFactory } from "./waitAndCall";

export function waitAndBuildFactory({
  globPattern = "**/*.{global,component}.{css,scss}",
  cwd = process.cwd(),
  out = "style.scss",
  modules,
}) {
  const fn = () =>
    build({
      globPattern,
      cwd,
      out,
      modules,
    });

  return waitAndCallFactory(fn);
}
