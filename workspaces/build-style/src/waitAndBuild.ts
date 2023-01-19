import { build } from "./build";
import { waitAndCallFactory } from "./waitAndCall";

export function waitAndBuildFactory({
  globPattern = "**/*.{global,component}.{css,scss}",
  cwd = process.cwd(),
  outStyle = "style.scss",
  outVars = "vars.css",
  variables = {},
}) {
  const fn = () =>
    build({
      globPattern,
      cwd,
      outStyle,
      outVars,
      variables,
    });

  return waitAndCallFactory(fn);
}
