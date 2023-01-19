"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watcher = void 0;
const chokidar = require("chokidar");
const waitAndBuild_1 = require("./waitAndBuild");
function watcher({ globPath, cwd, outStyle, outVars, variables }) {
    console.info("Watching", globPath, "to generate", outStyle, "and", outVars);
    const waitAndBuild = (0, waitAndBuild_1.waitAndBuildFactory)({
        globPath,
        cwd,
        outStyle,
        outVars,
        variables,
    });
    const watcher = chokidar.watch(globPath, {
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