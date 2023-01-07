import VarPlugin from "./plugins/var";

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

export default class SharedState {
  plugins: Map<string, any>;
  resources: Map<string, any>;
  proxy: ProxyConstructor;
  defaultError: any;

  constructor({ plugins = [] as any[], initialState = {} } = {}) {
    this.plugins = new Map(
      plugins.map((Plugin) => [Plugin.protocol, new Plugin(this)])
    );

    if (!this.plugins.has("")) {
      this.plugins.set("", new VarPlugin());
    }

    this.resources = new Map();

    this.proxy = new Proxy(this, proxyHandler);

    Object.entries(initialState).forEach(([url, value]) => {
      this.setValue(url, value);
    });
  }

  findPlugin(url: string) {
    const pluginName = url.substring(0, url.indexOf(":"));

    const plugin = this.plugins.get(pluginName);

    if (!plugin) {
      // Try removing these exceptions after updating the dependencies
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      throw new Error(`Plugin not found`, { cause: { pluginName, url } });
    }

    return plugin;
  }

  getResource(url: string, options = {}) {
    let resource = this.resources.get(url);

    if (resource) {
      return resource;
    }

    const plugin = this.findPlugin(url);

    resource = plugin.newResource(url, options, this);

    this.resources.set(url, resource);

    return resource;
  }

  getValue(url: string, options = {}) {
    return this.getResource(url, options).value;
  }

  setValue(url: string, value, options = {}) {
    const resource = this.getResource(url, options);

    resource.setValue(value, options);
  }

  deleteResource(url: string) {
    const resource = this.getResource(url);

    resource?.delete?.();

    this.resources.delete(url);
  }

  onChange(url: string, callback, options) {
    return this.getResource(url).onChange(callback, options);
  }
}
