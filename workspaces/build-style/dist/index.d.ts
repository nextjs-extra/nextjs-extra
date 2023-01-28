type BuildStyleOptions = {
    globPattern?: string;
    cwd?: string;
    outStyle?: string;
    outVars?: string;
    watch?: boolean;
    variables?: Record<string, string>;
};
export declare function buildStyle(options?: BuildStyleOptions): Promise<void>;
export {};
