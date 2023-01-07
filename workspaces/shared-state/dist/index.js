"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const var_1 = require("./plugins/var");
const proxyHandler = {
    get(target, url) {
        return target.getValue(url);
    },
    deleteProperty(target, url) {
        target.deleteResource(url);
        return true;
    },
    set(target, url, value) {
        target.setValue(url, value);
        return true;
    },
};
class SharedState {
    constructor({ plugins = [], initialState = {} } = {}) {
        this.plugins = new Map(plugins.map((Plugin) => [Plugin.protocol, new Plugin(this)]));
        if (!this.plugins.has("")) {
            this.plugins.set("", new var_1.default());
        }
        this.resources = new Map();
        this.proxy = new Proxy(this, proxyHandler);
        Object.entries(initialState).forEach(([url, value]) => {
            this.setValue(url, value);
        });
    }
    findPlugin(url) {
        const pluginName = url.substring(0, url.indexOf(":"));
        const plugin = this.plugins.get(pluginName);
        if (!plugin) {
            throw new Error(`Plugin not found`, { cause: { pluginName, url } });
        }
        return plugin;
    }
    getResource(url, options = {}) {
        let resource = this.resources.get(url);
        if (resource) {
            return resource;
        }
        const plugin = this.findPlugin(url);
        resource = plugin.newResource(url, options, this);
        this.resources.set(url, resource);
        return resource;
    }
    getValue(url, options = {}) {
        return this.getResource(url, options).value;
    }
    setValue(url, value, options = {}) {
        const resource = this.getResource(url, options);
        resource.setValue(value, options);
    }
    deleteResource(url) {
        const resource = this.getResource(url);
        resource?.delete?.();
        this.resources.delete(url);
    }
    onChange(url, callback, options) {
        return this.getResource(url).onChange(callback, options);
    }
}
exports.default = SharedState;
//# sourceMappingURL=index.js.map