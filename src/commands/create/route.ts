import inquirer from "inquirer";
import { generateFileFromTemplate } from "../../lib/helper.js";
import { Command } from "commander";

export const addRouteCommand = (ssc: Command) => {
  ssc
    .command("route")
    .description("Genereates a SvelteKit route with basic files")
    .alias("r")
    .option("-l, --layout", "Creates the route with a +layout.svelte")
    .option(
      "-lo,--layout-only",
      "Creates the route only with a layout combine it with -ls to create the server file"
    )
    .option(
      "-ls,--layout-server",
      "Creates the route with +layout.server.js|.ts"
    )
    .option('-a, --action [action]',"Adds an action to the route, if no name provided default will be used as fallback","default")
    .argument("[name]")
    .action(async (name, options) => {
      console.log(options);
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
      "/route/page.svelte.eta",
      name,
      { name, ...flags },
      "+page.svelte"
    );
    generateFileFromTemplate(
      "/route/page.server.eta",
      name,
      { name, ...flags },
      "+page.server.js"
    );
  }

  if (flags.layout || flags.layoutOnly) {
    generateFileFromTemplate(
      "/route/layout.svelte.eta",
      name,
      { name, ...flags },
      "+layout.svelte"
    );
  }
  if (flags.layoutServer) {
    generateFileFromTemplate(
      "/route/layout.server.eta",
      name,
      { name, ...flags },
      "+layout.server.js"
    );
  }
  return true;
};
export type CreateCommandFlags = {
  layoutServer?: boolean;
  layout?: boolean;
  layoutOnly?: boolean;
  action?: boolean|string;
};
export default generatePath;
