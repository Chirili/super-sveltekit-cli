import { program } from "commander";
import fs from 'fs';
import { addCreateCommands } from "./create/index.js";

const main = program.name('ssc').description('Super Sveltekit CLI tool, made to make your life easier').version('0.0.0');

// Checks if the command is run in a node project and inside of a sveltekit project
main.hook('preAction',() => {
    if(!fs.existsSync('package.json')){
        console.error("package.json file not found, execute this command inside a node project");
        process.exit(1);
    }
    const packageBuffer: Buffer = fs.readFileSync('package.json');
    const packageJson = JSON.parse(packageBuffer.toString())
    if(!packageJson.devDependencies || !packageJson.devDependencies["@sveltejs/kit"]){
        console.error("Sveltekit project not detected, execute this command inside a Sveltekit project")
        process.exit(1);
    }
})

addCreateCommands(main);

export const ssc = main;