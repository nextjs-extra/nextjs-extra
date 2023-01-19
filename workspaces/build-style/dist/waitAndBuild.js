"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitAndBuildFactory = void 0;
const build_1 = require("./build");
const waitAndCall_1 = require("./waitAndCall");
function waitAndBuildFactory({ globPath = "**/*.{global,component}.{css,scss}", cwd = process.cwd(), outStyle = "style.scss", outVars = "vars.css", variables = {}, }) {
    const fn = () => (0, build_1.build)({
        globPath,
        cwd,
        outStyle,
        outVars,
        variables,
    });
    return (0, waitAndCall_1.waitAndCallFactory)(fn);
}
exports.waitAndBuildFactory = waitAndBuildFactory;
//# sourceMappingURL=waitAndBuild.js.map