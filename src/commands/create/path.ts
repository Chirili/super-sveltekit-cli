import inquirer from "inquirer";
import { generateFileFromTemplate } from "../../lib/helper.js";
import { Command } from "commander";

export const addPathCommand = (ssc: Command) => {
  ssc
    .command("path")
    .description("Genereates a SvelteKit path with basic files")
    .alias("p")
    .option("-l, --layout", "Creates the path with a +layout.svelte")
    .option(
      "-lo,--layout-only",
      "Creates the path only with a layout combine it with -ls to create the server file"
    )
    .option(
      "-ls,--layout-server",
      "Creates the path with +layout.server.js|.ts"
    )
    .argument("[name]")
    .action(async (name, options) => {
      if (name) {
        generatePath(name, options);
        return;
      }

      await inquirer
        .prompt([
          {
            name: "name",
            type: "input",
            message: "What name will you use for the path of the server files?",
            validate: (input) => {
              return input.length > 0
                ? true
                : "The name must contain at least 1 character";
            },
          },
        ])
        .then((args) => {
          generatePath(args.name, options);
        });
    });
};

/**
 * Generates a new path from template file
 * @param {string} name
 */
export const generatePath = (name: string, flags: CreateCommandFlags) => {
  name = name.trim();
  if (name.endsWith("/")) {
    name.slice(0, -1);
  }
  name = "/routes/" + name
  if (!flags.layoutOnly) {
    generateFileFromTemplate(
      "/path/page.svelte.eta",
      name,
      { name },
      "+page.svelte"
    );
    generateFileFromTemplate(
      "/path/page.server.eta",
      name,
      { name },
      "+page.server.js"
    );
  }

  if (flags.layout || flags.layoutOnly) {
    generateFileFromTemplate(
      "/path/layout.svelte.eta",
      name,
      { name },
      "+layout.svelte"
    );
  }
  if (flags.layoutServer) {
    generateFileFromTemplate(
      "/path/layout.server.eta",
      name,
      { name },
      "+layout.server.js"
    );
  }
  return true;
};
export type CreateCommandFlags = {
  layoutServer?: boolean;
  layout?: boolean;
  layoutOnly?: boolean;
};
export default generatePath;
