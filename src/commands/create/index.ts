import { Command } from "commander";
import inquirer from 'inquirer';
import { generateFileFromTemplate } from "../../lib/helper.js";
/**
 *
 * @param {Command} ssc
 */
export const generate = (ssc: Command) => {
  const generateCommand = ssc
    .command("create")
    .description("Creates a set of boilerplates for SvelteKit")
    .alias("c");

  generateCommand
    .command("path")
    .description("Generates boilerplate for SvelteKit action")
    .alias("p")
    .option(
      "-l, --layout",
      "Creates the path with a +layout.svelte"
    )
    .option("-lo,--layout-only","Creates a path only with a layout combine it with -ls to create the server file")
    .option("-ls,--layout-server","Creates the path with +layout.server.js|.ts")
    .argument("[name]")
    .action(async (name, options) => {
      if (name) {
        generatePage(name,options);
        return;
      }

      await inquirer
        .prompt([
          {
            name: "name",
            type: "input",
            message: "What name will you use for the action?",
            validate: (input) => {
              return input.length > 0
                ? true
                : "The name should contain at leas 1 character";
            },
          },
        ])
        .then((args) => {
          generatePage(args.name,options);
        });
    });
};


/**
 * Generates a new function from template
 * @param {string} name
 */
export const generatePage = (name: string,flags: CreateCommandFlags) => {
  name = name.trim()
  if(name.endsWith('/')){
    name.slice(0,-1)
  }
  if(!flags.layoutOnly && !flags.layoutServer){
    generateFileFromTemplate("/path/page.svelte.eta",name,{name},"+page.svelte")
    generateFileFromTemplate("/path/page.server.eta",name,{name},"+page.server.js")
  }
  
  if(flags.layout || flags.layoutOnly){
    generateFileFromTemplate("/path/layout.svelte.eta",name,{name},"+layout.svelte");
    
  }
  if(flags.layoutServer){
    generateFileFromTemplate("/path/layout.server.eta",name,{name},"+layout.server.js")
  }
  return true;
};
export type CreateCommandFlags = {
  layoutServer?: boolean
  layout?: boolean
  layoutOnly?: boolean
}
export default generatePage;