"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DC = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function expandJSX(content, Components) {
    if (typeof content === "string") {
        return content;
    }
    if (!content) {
        return null;
    }
    if (!Array.isArray(content)) {
        return expandJSX([content], Components);
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: content.map((item, i) => {
            if (item == null) {
                return null;
            }
            if (typeof item === "string") {
                return item;
            }
            return (0, jsx_runtime_1.jsx)(DC, { ...item, Components: Components }, i);
        }) }));
}
function expandCreate(content, Components) {
    if (typeof content === "string") {
        return [content];
    }
    if (!Array.isArray(content)) {
        return expandCreate([content], Components);
    }
    return content.map((item) => {
        if (item == null) {
            return null;
        }
        if (typeof item === "string") {
            return item;
        }
        return (0, react_1.createElement)(DC, { ...item, Components });
    });
}
function DC({ type, props = {}, Components, children = null }) {
    if (!type) {
        if (props) {
            console.error("Mising type");
            console.debug({
                props,
            });
        }
        return null;
    }
    const Component = Components[type];
    if (Component) {
        if (props?.content) {
            const { content, ...newProps } = props;
            return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: null, children: (0, jsx_runtime_1.jsxs)(Component, { ...newProps, children: [children, expandJSX(content, Components)] }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: null, children: (0, jsx_runtime_1.jsx)(Component, { ...props }) }));
        }
    }
    if (type.match(/^[a-z]/)) {
        if (props?.content) {
            const { content, ...newProps } = props;
            const children = expandCreate(content, Components);
            return (0, react_1.createElement)(type, newProps, ...children);
        }
        else {
            return (0, react_1.createElement)(type, props);
        }
    }
    return (0, jsx_runtime_1.jsx)("div", { "data-component-name": type });
}
exports.DC = DC;
//# sourceMappingURL=DC.js.map