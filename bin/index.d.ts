export interface Config {
    PORT: number;
    OUTPUTDIR: string;
    INPUTDIR: string;
    routes: Array<string>;
    headless: boolean;
    HASH: boolean;
}
