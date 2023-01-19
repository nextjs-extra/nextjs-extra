import * as chokidar from "chokidar";
import { waitAndBuildFactory } from "./waitAndBuild";

export function watcher({ globPattern, cwd, outStyle, outVars, variables }) {
  console.info(
    "Watching",
    globPattern,
    "to generate",
    outStyle,
    "and",
    outVars
  );

  const waitAndBuild = waitAndBuildFactory({
    globPattern,
    cwd,
    outStyle,
    outVars,
    variables,
  });

  const watcher = chokidar.watch(globPattern, {
    cwd,
    ignoreInitial: true,
    awaitWriteFinish: true,
  });
  watcher.on("add", waitAndBuild);
  watcher.on("unlink", waitAndBuild);
  watcher.on("change", waitAndBuild);
}
