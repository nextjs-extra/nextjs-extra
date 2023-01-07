export default class SharedState {
    plugins: Map<string, any>;
    resources: Map<string, any>;
    proxy: ProxyConstructor;
    defaultError: any;
    constructor({ plugins, initialState }?: {
        plugins?: any[] | undefined;
        initialState?: {} | undefined;
    });
    findPlugin(url: string): any;
    getResource(url: string, options?: {}): any;
    getValue(url: string, options?: {}): any;
    setValue(url: string, value: any, options?: {}): void;
    deleteResource(url: string): void;
    onChange(url: string, callback: any, options: any): any;
}
