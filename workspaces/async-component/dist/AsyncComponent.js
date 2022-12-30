"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncComponents = exports.asyncit = exports.__test__ = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const children = new Set();
const overrideKeys = new Map();
const areas = new Map();
exports.__test__ = {
    children,
    overrideKeys,
    areas,
};
let i = 0;
function asyncit(Component, props = {}, area = "") {
    let resolve;
    const promise = new Promise((res) => {
        resolve = res;
    });
    if (props.uniqueKey && overrideKeys.has(props.uniqueKey)) {
        return overrideKeys.get(props.uniqueKey);
    }
    function promiseResolver(value) {
        resolve(value);
        resolve = () => {
            console.warn("You can't call resolve on a resolved promise.");
        };
    }
    promise.resolve = promiseResolver;
    promise.props = props;
    promise.area = area;
    promise.Component = Component;
    promise.key = props.uniqueKey ?? i++;
    if (props.uniqueKey) {
        overrideKeys.set(props.uniqueKey, promise);
    }
    children.add(promise);
    promise.finally(() => {
        children.delete(promise);
        if (props.uniqueKey) {
            overrideKeys.delete(props.uniqueKey);
        }
        areas.get(area)?.();
    });
    areas.get(area)?.();
    return promise;
}
exports.asyncit = asyncit;
function AsyncComponents({ area = "" }) {
    const [, forceUpdate] = (0, react_1.useReducer)((x) => x + 1, 0);
    areas.set(area, forceUpdate);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Array.from(children).map((promise) => area === promise.area && ((0, jsx_runtime_1.jsx)(promise.Component, { ...promise.props, resolve: promise.resolve }, promise.key))) }));
}
exports.AsyncComponents = AsyncComponents;
//# sourceMappingURL=AsyncComponent.js.map