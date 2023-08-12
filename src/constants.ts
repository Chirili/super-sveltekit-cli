import { dirname } from "path";
import { fileURLToPath } from "url";

export const LOCAL_ROUTES_PATH = "./src/routes"

export const GLOBAL_PATH = process.argv[1].replace('index.js','')

export const __dirname = dirname(fileURLToPath(import.meta.url));

