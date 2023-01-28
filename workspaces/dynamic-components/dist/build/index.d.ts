type BuildStyleOptions = {
    globPattern?: string;
    cwd?: string;
    out?: string;
    modules?: Array<string>;
    watch?: boolean;
};
export declare function buildDynamicomponents(options?: BuildStyleOptions): Promise<void>;
export {};
