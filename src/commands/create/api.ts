import { Command } from "commander";
import inquirer from "inquirer";
import { generateFileFromTemplate } from "../../lib/helper.js";

const API_FOLDER = "/api"


export const addApiCommand = (ssc: Command) => {
  ssc
    .command("api")
    .description("Creates api endpoints inside the api folder")
    .alias("a")
    .option("-c, --crud", "Creates a server file with all crud actions")
    .option("-g, --get", "Creates the server file with GET action")
    .option("-p, --post", "Creates the server file with POST action")
    .option("-pu, --put", "Creates the server file with a PUT action")
    .option("-pa, --patch", "Creates the server file with a PATCH action")
    .option("-d, --delete", "Creates the server file with a DELETE action")
    .argument("[name]")
    .action(async (name: string, flags: ApiCommandFlags) => {
      if (name) {
        generateApiPath(name, flags);
      }
      if (!name) {
        await inquirer
          .prompt([
            {
              name: "name",
              type: "input",
              message: "What name will you use for the path?",
              validate: (input) => {
                return input.length > 0
                  ? true
                  : "The name must contain at least 1 character";
              },
            },
          ])
          .then((args) => {
            generateApiPath(args.name, flags);
          });
      }
    });
};

export const generateApiPath = (name: string, flags: ApiCommandFlags) => {
  name = `${API_FOLDER}/${name}`
  generateFileFromTemplate(
    "/api/server.eta",
    name,
    { name, ...flags },
    "+server.js"
  );
};
export type ApiCommandFlags = {
  crud?: boolean;
  get?: boolean;
  put?: boolean;
  patch?: boolean;
  delete?: boolean;
  post? : boolean
};
