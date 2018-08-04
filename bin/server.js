#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var chalk_1 = require("chalk");
var log = console.log;
var Server = /** @class */ (function () {
    function Server(port, staticDir) {
        this.port = port;
        this.app = express();
        this.staticDir = staticDir;
    }
    Server.prototype.init = function () {
        var _a = this, port = _a.port, staticDir = _a.staticDir;
        this.app.use(express.static(staticDir));
        this.app.listen(port, function () {
            log(chalk_1.default.greenBright("server running at http://localhost:" + port + "/"));
            log("");
        });
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=server.js.map