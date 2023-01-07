import SharedState from "./index";
export declare const ContextState: import("react").Context<SharedState>;
export declare const clientSide: Record<string, any>;
interface StateProviderParams {
    children: any;
    plugins?: any[];
    initialState?: any;
    sharedStateRef?: any;
}
export declare function SharedStateProvider({ children, plugins, initialState, sharedStateRef, }: StateProviderParams): import("react").FunctionComponentElement<import("react").ProviderProps<SharedState>>;
export declare function useSharedValue(resource: any, options?: null | Record<string, any>): any;
export declare function useSharedResource(url: string, options?: any): any;
export declare function useSharedChange(url: any, callback: any, options?: any): void;
export declare function useSharedState(): SharedState;
export {};
