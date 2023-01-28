"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useImports = void 0;
const parsePath = /(?<from>.*(^|\/)(?<filename>[A-Z][A-Za-z0-9_]*)\.dynamic\.(.{2,3}))$/;
const exludeNodeModules = /node_modules/;
function useImports(files) {
    let string = "";
    for (const path of files) {
        if (exludeNodeModules.test(path))
            continue;
        const parse = parsePath.exec(path);
        if (!parse?.groups?.filename)
            continue;
        string = `${string}\n  ${parse.groups.filename}: dynamic(() => import("./${path}"), { suspense: true, loading: undefined }),`;
    }
    return string;
}
exports.useImports = useImports;
//# sourceMappingURL=useImports.js.map