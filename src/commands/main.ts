import { program } from "commander";
import fs from 'fs';
import { generate } from "./create/index.js";

const main = program.name('ssc').description('Super Sveltekit CLI tool, made to make your life easier').version('0.0.0');
main.hook('preAction',() => {
    if(!fs.existsSync('package.json')){
        console.error("package.json file not found, execute this command inside a node project");
        process.exit(1);
    }
    const packageBuffer: Buffer = fs.readFileSync('package.json');
    const packageJson = JSON.parse(packageBuffer.toString())
    if(!packageJson.devDependencies || !packageJson.devDependencies["@sveltejs/kit"]){
        console.error("Sveltekit project not detected, execute this command inside a Sveltekit project")
    }
})
generate(main);
export const ssc = main;