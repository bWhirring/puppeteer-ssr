#!/usr/bin/env node

import * as puppeteer from "puppeteer";
import Server from "./server";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import chalk from "chalk";
import validate from "./validate";

let ssrConfigFile = process.cwd() + "/.ssrconfig.json";

const isSsrConfigExist = fs.existsSync(ssrConfigFile);

let ssrconfig = "{}";
if (isSsrConfigExist) {
  ssrconfig = fs.readFileSync(ssrConfigFile, "utf8");
}

const log = console.log;

export interface Config {
  PORT: number;
  OUTPUTDIR: string;
  INPUTDIR: string;
  routes: Array<string>;
  headless: boolean;
  HASH: boolean;
}

/**
 * params {string} PORT express服务端口, default 8888
 * params {string} OUTPUTDIR 输出目录 default dist
 * params {string} INPUTDIR 服务启动目录 default dist
 * params {array} routes 需要ssr的路由 default ['/']
 * params {boolean} headless headless mode default ture
 * params {boolean} HASH 路由模式 default hash模式
 */

let {
  PORT = 8888,
  OUTPUTDIR = "dist",
  INPUTDIR = "dist",
  routes = ["/"],
  headless = true,
  HASH = true
}: Config = JSON.parse(ssrconfig);

class Ssr {
  private index: number;
  constructor() {
    this.index = 0;
    validate({
      PORT,
      OUTPUTDIR,
      INPUTDIR,
      routes,
      headless,
      HASH
    });
  }
  async init() {
    const server = new Server(PORT, INPUTDIR);
    server.init();

    log(chalk.greenBright("初始化browser"));
    const browser = await puppeteer.launch({
      headless
    });
    if (routes.length === 0 || !routes[0]) {
      routes = ["/"];
    }
    const len = routes.length;
    routes.map((v, i) => {
      if (!v) routes.splice(i, 1);
    });
    routes.map(async (v: string) => {
      const page = await browser.newPage();
      const FRAGMENT = HASH ? "/#" : "";
      const HISTORY = v.startsWith("/") ? v : `/${v}`;
      const URL = `http://localhost:${PORT}${FRAGMENT}${HISTORY}`;
      await page.goto(URL);
      await page.waitForSelector("body");
      const content = await page.content();

      let DIR = `${process.cwd()}/${OUTPUTDIR}${HISTORY}`;
      await mkdirp(DIR, err => {
        if (err) {
          console.error(err);
        }
        const filename = v.split("/").pop() || "index";
        DIR = DIR.endsWith("/") ? DIR : DIR + "/";
        fs.writeFile(`${DIR}${filename}.html`, content, err => {
          if (err) {
            console.error(err);
          }
          this.index++;
          log(chalk.greenBright(`页面 ${DIR}${filename}.html 抓取完毕`));
          if (len === this.index) {
            log("");
            log(chalk.greenBright("🎉 所有页面抓取完毕"));
            log("");
            log(chalk.redBright("npm install -g serve"));
            log(chalk.redBright(`serve ${OUTPUTDIR}/`));
            log("");
            process.exit();
          }
        });
      });
    });
  }
}

const ssr = new Ssr();
ssr.init();
