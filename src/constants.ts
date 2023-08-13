import { dirname } from "path";
import { fileURLToPath } from "url";

export const LOCAL_SRC_PATH = "./src"

export const PROJECT_SRC_PATH = dirname(fileURLToPath(import.meta.url));


