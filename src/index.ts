#!/usr/bin/env node

import { ssc } from "./commands/main.js";

export const execute = (args: NodeJS.Process["argv"]) => {
    ssc.parse(args);
}

execute(process.argv);