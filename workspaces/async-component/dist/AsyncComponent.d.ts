export interface ComponentPromise extends Promise<any> {
    resolve: (value?: any) => void;
    props: Record<string, any>;
    area: string;
    Component: React.ComponentType<any>;
    key: number | string;
}
export declare const __test__: {
    children: Set<ComponentPromise>;
    overrideKeys: Map<string, ComponentPromise>;
    areas: Map<string, () => void>;
};
export declare function asyncit(Component: any, props?: Record<string, any>, area?: string): ComponentPromise;
export declare function AsyncComponents({ area }: {
    area?: string | undefined;
}): JSX.Element;
