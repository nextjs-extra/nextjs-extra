"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitAndBuildFactory = void 0;
const build_1 = require("./build");
const waitAndCall_1 = require("./waitAndCall");
function waitAndBuildFactory({ globPattern = "**/*.{global,component}.{css,scss}", cwd = process.cwd(), out = "style.scss", modules, }) {
    const fn = () => (0, build_1.build)({
        globPattern,
        cwd,
        out,
        modules,
    });
    return (0, waitAndCall_1.waitAndCallFactory)(fn);
}
exports.waitAndBuildFactory = waitAndBuildFactory;
//# sourceMappingURL=waitAndBuild.js.map