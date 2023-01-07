"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSharedState = exports.useSharedChange = exports.useSharedResource = exports.useSharedValue = exports.SharedStateProvider = exports.clientSide = exports.ContextState = void 0;
const react_1 = require("react");
const index_1 = require("./index");
exports.ContextState = (0, react_1.createContext)(new index_1.default());
exports.clientSide = {};
function SharedStateProvider({ children, plugins = [], initialState, sharedStateRef, }) {
    const value = (0, react_1.useMemo)(() => {
        const sharedState = new index_1.default({ plugins, initialState });
        exports.clientSide.sharedState = sharedState;
        if (sharedStateRef) {
            sharedStateRef.sharedState = sharedState;
            if (typeof window === "object") {
                window.dispatchEvent(new Event("sharedStateReady"));
            }
            if (typeof parent === "object") {
                parent.postMessage("sharedStateReady", "*");
            }
        }
        return sharedState;
    }, []);
    (0, react_1.useEffect)(() => {
        if (initialState) {
            Object.entries(initialState).forEach(([key, v]) => {
                value.setValue(key, v);
            });
        }
    }, [value, initialState]);
    return (0, react_1.createElement)(exports.ContextState.Provider, { value }, children);
}
exports.SharedStateProvider = SharedStateProvider;
function useSharedValue(resource, options) {
    resource = useSharedResource(resource, options);
    const [value, set] = (0, react_1.useState)(resource.value);
    (0, react_1.useEffect)(() => {
        set(resource.value);
    }, [resource]);
    useSharedChange(resource.url, (value) => set(value), null);
    const setValue = (0, react_1.useCallback)((newValue) => resource.setValue(newValue), [resource]);
    const response = [value, setValue, resource];
    response.value = value;
    response.setValue = setValue;
    response.resource = resource;
    return response;
}
exports.useSharedValue = useSharedValue;
function useSharedResource(url, options) {
    const sharedState = (0, react_1.useContext)(exports.ContextState);
    return sharedState.getResource(url, options);
}
exports.useSharedResource = useSharedResource;
function useSharedChange(url, callback, options) {
    const sharedState = (0, react_1.useContext)(exports.ContextState);
    (0, react_1.useEffect)(() => url && sharedState.onChange(url, callback, options), [url, callback, options, sharedState]);
}
exports.useSharedChange = useSharedChange;
function useSharedState() {
    return (0, react_1.useContext)(exports.ContextState);
}
exports.useSharedState = useSharedState;
//# sourceMappingURL=react.js.map