import { existsSync } from "fs";
import { generatePage } from "../../src/commands/create";
import { __dirname } from "../../src/constants";

test('should generate +page.server.js', () => {
    generatePage("test",{});
    expect(existsSync(__dirname + "/routes/test/+page.server.ts")).toBe(true);
}); 