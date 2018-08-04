#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer = require("puppeteer");
var server_1 = require("./server");
var fs = require("fs");
var mkdirp = require("mkdirp");
var chalk_1 = require("chalk");
var validate_1 = require("./validate");
var ssrConfigFile = process.cwd() + "/.ssrconfig.json";
var isSsrConfigExist = fs.existsSync(ssrConfigFile);
var ssrconfig = "{}";
if (isSsrConfigExist) {
    ssrconfig = fs.readFileSync(ssrConfigFile, "utf8");
}
var log = console.log;
/**
 * params {string} PORT express服务端口, default 8888
 * params {string} OUTPUTDIR 输出目录 default dist
 * params {string} INPUTDIR 服务启动目录 default dist
 * params {array} routes 需要ssr的路由 default ['/']
 * params {boolean} headless headless mode default ture
 * params {boolean} HASH 路由模式 default hash模式
 */
var _a = JSON.parse(ssrconfig), _b = _a.PORT, PORT = _b === void 0 ? 8888 : _b, _c = _a.OUTPUTDIR, OUTPUTDIR = _c === void 0 ? "dist" : _c, _d = _a.INPUTDIR, INPUTDIR = _d === void 0 ? "dist" : _d, _e = _a.routes, routes = _e === void 0 ? ["/"] : _e, _f = _a.headless, headless = _f === void 0 ? true : _f, _g = _a.HASH, HASH = _g === void 0 ? true : _g;
var Ssr = /** @class */ (function () {
    function Ssr() {
        this.index = 0;
        validate_1.default({
            PORT: PORT,
            OUTPUTDIR: OUTPUTDIR,
            INPUTDIR: INPUTDIR,
            routes: routes,
            headless: headless,
            HASH: HASH
        });
    }
    Ssr.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var server, browser, len;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        server = new server_1.default(PORT, INPUTDIR);
                        server.init();
                        log(chalk_1.default.greenBright("初始化browser"));
                        return [4 /*yield*/, puppeteer.launch({
                                headless: headless
                            })];
                    case 1:
                        browser = _a.sent();
                        if (routes.length === 0 || !routes[0]) {
                            routes = ["/"];
                        }
                        len = routes.length;
                        routes.map(function (v, i) {
                            if (!v)
                                routes.splice(i, 1);
                        });
                        routes.map(function (v) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var page, FRAGMENT, HISTORY, URL, content, DIR;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, browser.newPage()];
                                    case 1:
                                        page = _a.sent();
                                        FRAGMENT = HASH ? "/#" : "";
                                        HISTORY = v.startsWith("/") ? v : "/" + v;
                                        URL = "http://localhost:" + PORT + FRAGMENT + HISTORY;
                                        return [4 /*yield*/, page.goto(URL)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, page.waitForSelector("body")];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, page.content()];
                                    case 4:
                                        content = _a.sent();
                                        DIR = process.cwd() + "/" + OUTPUTDIR + HISTORY;
                                        return [4 /*yield*/, mkdirp(DIR, function (err) {
                                                if (err) {
                                                    console.error(err);
                                                }
                                                var filename = v.split("/").pop() || "index";
                                                DIR = DIR.endsWith("/") ? DIR : DIR + "/";
                                                fs.writeFile("" + DIR + filename + ".html", content, function (err) {
                                                    if (err) {
                                                        console.error(err);
                                                    }
                                                    _this.index++;
                                                    log(chalk_1.default.greenBright("\u9875\u9762 " + DIR + filename + ".html \u6293\u53D6\u5B8C\u6BD5"));
                                                    if (len === _this.index) {
                                                        log("");
                                                        log(chalk_1.default.greenBright("🎉 所有页面抓取完毕"));
                                                        log("");
                                                        log(chalk_1.default.redBright("npm install -g serve"));
                                                        log(chalk_1.default.redBright("serve " + OUTPUTDIR + "/"));
                                                        log("");
                                                        process.exit();
                                                    }
                                                });
                                            })];
                                    case 5:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    return Ssr;
}());
var ssr = new Ssr();
ssr.init();
//# sourceMappingURL=index.js.map