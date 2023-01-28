import * as chokidar from "chokidar";
import { waitAndBuildFactory } from "./waitAndBuild";

export function watcher({ globPattern, cwd, out, modules }) {
  console.info("Watching", globPattern, "to generate", out, "and", modules);

  const waitAndBuild = waitAndBuildFactory({
    globPattern,
    cwd,
    out,
    modules,
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
