import { existsSync, readFileSync, rmSync, rmdirSync, unlinkSync } from "fs";
import { generatePath } from '../../src/commands/create/route';
import {PROJECT_SRC_PATH} from '../../src/constants';

test('should generate +page.server.js and +page.svelte', () => {
    generatePath("test",{});
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.server.ts")).toBe(true);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.svelte")).toBe(true);
    rmSync(PROJECT_SRC_PATH + "/routes",{force: true,recursive: true})
}); 

test('should generate +page.server.js and +page.svelte +layout.svelte', () => {
    generatePath("test",{layout: true});
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.server.ts")).toBe(true);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.svelte")).toBe(true);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+layout.svelte")).toBe(true);
    rmSync(PROJECT_SRC_PATH + "/routes",{force: true,recursive: true})
}); 

test('should generate +layout.svelte only', () => {
    generatePath("test",{layoutOnly: true});
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.server.ts")).toBe(false);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.svelte")).toBe(false);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+layout.svelte")).toBe(true);
    rmSync(PROJECT_SRC_PATH + "/routes",{force: true,recursive: true})
});

test('should generate +layout.server.ts with +page | sevelte | server.ts only', () => {
    generatePath("test",{layoutServer: true});
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.server.ts")).toBe(true);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.svelte")).toBe(true);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+layout.svelte")).toBe(false);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+layout.server.ts")).toBe(true);
    rmSync(PROJECT_SRC_PATH + "/routes",{force: true,recursive: true})
});

test('should generate all files', () => {
    generatePath("test",{layout: true,layoutServer: true});
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.server.ts")).toBe(true);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.svelte")).toBe(true);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+layout.svelte")).toBe(true);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+layout.server.ts")).toBe(true);
    rmSync(PROJECT_SRC_PATH + "/routes",{force: true,recursive: true})
});

test('should generate +layout.server.ts and +layout.svelte only', () => {
    generatePath("test",{layoutOnly: true, layoutServer: true});
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.server.ts")).toBe(false);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.svelte")).toBe(false);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+layout.svelte")).toBe(true);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+layout.server.ts")).toBe(true);
    rmSync(PROJECT_SRC_PATH + "/routes",{force: true,recursive: true})
});

test('should generate +page.server.ts with an action', () => {
    const conditions = ["export const actions"]
    generatePath("test",{action: "test"});
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.server.ts")).toBe(true);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+page.svelte")).toBe(true);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+layout.svelte")).toBe(false);
    expect(existsSync(PROJECT_SRC_PATH + "/routes/test/+layout.server.ts")).toBe(false);
    const fileString = readFileSync(PROJECT_SRC_PATH + "/routes/test/+page.server.ts",{encoding: 'utf-8'});
    const valid = new RegExp(conditions.join('|')).test(fileString.toString());
    expect(valid).toBe(true);
    rmSync(PROJECT_SRC_PATH + "/routes",{force: true,recursive: true})
});