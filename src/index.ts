#!/usr/bin/env node

import { ssc } from "./commands/main.js";

export const execute = () => {
    ssc.parse(process.argv);
}

execute();