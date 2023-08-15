import { Command } from "commander";
import { addRouteCommand } from "./route.js";
import { addApiCommand } from "./api.js";

/**
 * Set of commands of create
 * @param {Command} ssc
 */
export const addCreateCommands = (ssc: Command) => {
  const createCommand = ssc
    .command("create")
    .description("Creates files and code for Sveltekit")
    .addHelpCommand('route|r [options] [name|path]','Creates a new Sveltekit route o path with files inside of it')
    .alias("c")
    addRouteCommand(createCommand)
    addApiCommand(createCommand)
  };