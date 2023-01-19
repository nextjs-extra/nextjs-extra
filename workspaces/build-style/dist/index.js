"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStyle = void 0;
const build_1 = require("./build");
const watcher_1 = require("./watcher");
const defaultOptions = {
    globPath: "**/*.{global,component}.{css,scss}",
    cwd: process.cwd(),
    outStyle: "style.scss",
    outVars: "vars.css",
    variables: {},
};
async function buildStyle(options = defaultOptions) {
    const watch = Boolean(options.watch);
    delete options.watch;
    const buildOptions = Object.assign({}, defaultOptions, options);
    await (0, build_1.build)(buildOptions);
    if (!watch) {
        return;
    }
    (0, watcher_1.watcher)(buildOptions);
}
exports.buildStyle = buildStyle;
//# sourceMappingURL=index.js.map