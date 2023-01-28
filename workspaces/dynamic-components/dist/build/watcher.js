"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watcher = void 0;
const chokidar = require("chokidar");
const waitAndBuild_1 = require("./waitAndBuild");
function watcher({ globPattern, cwd, out, modules }) {
    console.info("Watching", globPattern, "to generate", out, "and", modules);
    const waitAndBuild = (0, waitAndBuild_1.waitAndBuildFactory)({
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
exports.watcher = watcher;
//# sourceMappingURL=watcher.js.map