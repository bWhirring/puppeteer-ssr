"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var log = console.log;
function validate(_a) {
    var PORT = _a.PORT, OUTPUTDIR = _a.OUTPUTDIR, INPUTDIR = _a.INPUTDIR, routes = _a.routes, headless = _a.headless, HASH = _a.HASH;
    if (PORT < 0 || !Number.isInteger(PORT)) {
        log("");
        log(chalk_1.default.bgRedBright("PORT必须为正整数"));
        process.exit;
    }
    if (!Array.isArray(routes)) {
        log("");
        log(chalk_1.default.bgRedBright("routes必须是一个数组"));
        process.exit();
    }
    if (!typeof headless) {
        log("");
        log(chalk_1.default.bgRedBright("headless 必须是一个Boolean值"));
        process.exit();
    }
    if (!typeof HASH) {
        log("");
        log(chalk_1.default.bgRedBright("HASH 必须是一个Boolean值"));
        process.exit();
    }
}
exports.default = validate;
//# sourceMappingURL=validate.js.map