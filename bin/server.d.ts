declare class Server {
    private port;
    private staticDir;
    app: any;
    constructor(port: number, staticDir: string);
    init(): void;
}
export default Server;
