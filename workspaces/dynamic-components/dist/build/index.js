"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDynamicomponents = void 0;
const build_1 = require("./build");
const watcher_1 = require("./watcher");
const defaultOptions = {
    globPattern: "**/*.dynamic.{jsx,tsx,js,ts,cjs,mjs}",
    cwd: process.cwd(),
    out: "Components.jsx",
    modules: [],
};
async function buildDynamicomponents(options = defaultOptions) {
    const watch = Boolean(options.watch);
    delete options.watch;
    const buildOptions = Object.assign({}, defaultOptions, options);
    await (0, build_1.build)(buildOptions);
    if (!watch) {
        return;
    }
    (0, watcher_1.watcher)(buildOptions);
}
exports.buildDynamicomponents = buildDynamicomponents;
//# sourceMappingURL=index.js.map