#!/usr/bin/env node
import * as express from "express";
import chalk from "chalk";

const log = console.log;

class Server {
  private port: number;
  private staticDir: string;
  public app: any;
  constructor(port: number, staticDir: string) {
    this.port = port;
    this.app = express();
    this.staticDir = staticDir;
  }
  init() {
    const { port, staticDir } = this;
    this.app.use(express.static(staticDir));
    this.app.listen(port, () => {
      log(chalk.greenBright(`server running at http://localhost:${port}/`));
      log("");
    });
  }
}

export default Server;
