"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitAndCallFactory = void 0;
function waitAndCallFactory(fn) {
    let updating;
    return function waitAndCall() {
        if (updating) {
            updating = updating.then(() => {
                updating = fn();
                return updating;
            });
            return updating;
        }
        updating = fn();
        return updating;
    };
}
exports.waitAndCallFactory = waitAndCallFactory;
//# sourceMappingURL=waitAndCall.js.map