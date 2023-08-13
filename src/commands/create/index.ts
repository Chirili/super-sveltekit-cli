import { Command } from "commander";
import { addPathCommand } from "./path.js";
import { addApiCommand } from "./api.js";

/**
 * Set of commands of create
 * @param {Command} ssc
 */
export const addCreateCommands = (ssc: Command) => {
  const createCommand = ssc
    .command("create")
    .description("Creates files and code for Sveltekit")
    .alias("c");
    addPathCommand(createCommand)
    addApiCommand(createCommand)
};