import { Config } from "./index";
import chalk from "chalk";
const log = console.log;

export default function validate({
  PORT,
  OUTPUTDIR,
  INPUTDIR,
  routes,
  headless,
  HASH
}: Config) {
  if (PORT < 0 || !Number.isInteger(PORT)) {
    log("");
    log(chalk.bgRedBright("PORT必须为正整数"));
    process.exit;
  }
  if (!Array.isArray(routes)) {
    log("");
    log(chalk.bgRedBright("routes必须是一个数组"));
    process.exit();
  }
  if (!typeof headless) {
    log("");
    log(chalk.bgRedBright("headless 必须是一个Boolean值"));
    process.exit();
  }
  if (!typeof HASH) {
    log("");
    log(chalk.bgRedBright("HASH 必须是一个Boolean值"));
    process.exit();
  }
}
