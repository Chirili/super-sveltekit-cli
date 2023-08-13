import { Eta } from "eta";
import fs from "fs";
import {  LOCAL_SRC_PATH, PROJECT_SRC_PATH } from "../constants.js";

export const eta = new Eta({ views: `${PROJECT_SRC_PATH}/templates` });

/**
 * Generates a file from a template file path in the selected path
 * @param {string} templatePath The path route inside the template folder where is located the template file
 * @param {string} route The path where the file will be generated
 * @param {object} data an object with the data that contain the template
 * @param {string} fileNameExtension The name of the file generated
 */
export const generateFileFromTemplate = (
  templatePath: string,
  route: string,
  data: {[key:string]:string|boolean},
  fileNameExtension: string
) => {
  let tsConfig: boolean = fs.existsSync("tsconfig.json");;
  let fileDataString: string = "";
  
  if (!route) {
    // If the route is null will take the default routes path in sveltekit: /src/routes
    process.exit(1)
  }
  if(!route.endsWith("/")){
    route+= "/"
  }

  route = LOCAL_SRC_PATH + route
  if (!fs.existsSync(route)) {
    // Checks if folder exists
    fs.mkdirSync(route, { recursive: true });
    console.log("➕ Folders path created " + route);
  }
  data.ts = tsConfig
  fileDataString = eta.render(templatePath, data);
  if (fileNameExtension.endsWith(".js")) {
    // Checks if the project is using typescript
    
    if (tsConfig) fileNameExtension = fileNameExtension.replace(".js", ".ts");
  }

  if (!fs.existsSync(route + fileNameExtension)) {
    // Checks if file already exists
    fs.writeFileSync(route + fileNameExtension, fileDataString);
    console.log(`➕ File ${fileNameExtension} created at ${route}`);
  }
};
