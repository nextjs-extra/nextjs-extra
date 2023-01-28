"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModules = void 0;
function getName(path) {
    return path.replace(/[/.@]/g, "ー");
}
function isAModule(driver) {
    try {
        require.resolve(driver);
        return true;
    }
    catch (e) {
        return false;
    }
}
function useModules(modules) {
    let string = "";
    for (const path of modules) {
        if (!isAModule(path)) {
            continue;
        }
        string = `${string}\n  ${getName(path)}: dynamic(() => import("${path}"), { suspense: true, loading: undefined }),`;
    }
    return string;
}
exports.useModules = useModules;
//# sourceMappingURL=useModules.js.map