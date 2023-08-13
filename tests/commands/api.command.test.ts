import { existsSync, readFileSync, readSync, rmSync } from 'fs';
import { generateApiPath } from '../../src/commands/create/api';
import { PROJECT_SRC_PATH } from '../../src/constants';



test('should generate +server.ts', () => {
    generateApiPath("test",{});
    expect(existsSync(PROJECT_SRC_PATH + "/api/test/+server.ts")).toBe(true);
    rmSync(PROJECT_SRC_PATH + "/api",{force: true,recursive: true})
}); 


test('should generate +server.ts with all crud operations inside', () => {
    const conditions = ["export function POST","export function GET","export function PATCH","export function PUT","export function DELETE"]
    generateApiPath("test",{crud: true});
    expect(existsSync(PROJECT_SRC_PATH + "/api/test/+server.ts")).toBe(true);
    const fileString = readFileSync(PROJECT_SRC_PATH + "/api/test/+server.ts",{encoding: 'utf-8'});
    const valid = new RegExp(conditions.join('|')).test(fileString.toString());
    expect(valid).toBe(true);
}); 

test('should generate +server.ts with GET operation inside of it', () => {
    const conditions = ["export function GET"]
    generateApiPath("test",{get: true});
    expect(existsSync(PROJECT_SRC_PATH + "/api/test/+server.ts")).toBe(true);
    const fileString = readFileSync(PROJECT_SRC_PATH + "/api/test/+server.ts",{encoding: 'utf-8'});
    const valid = new RegExp(conditions.join('|')).test(fileString.toString());
    expect(valid).toBe(true);
}); 

test('should generate +server.ts with POST operation inside of it', () => {
    const conditions = ["export function POST"]
    generateApiPath("test",{post: true});
    expect(existsSync(PROJECT_SRC_PATH + "/api/test/+server.ts")).toBe(true);
    const fileString = readFileSync(PROJECT_SRC_PATH + "/api/test/+server.ts",{encoding: 'utf-8'});
    const valid = new RegExp(conditions.join('|')).test(fileString.toString());
    expect(valid).toBe(true);
}); 

test('should generate +server.ts with PUT operation inside of it', () => {
    const conditions = ["export function PUT"]
    generateApiPath("test",{put: true});
    expect(existsSync(PROJECT_SRC_PATH + "/api/test/+server.ts")).toBe(true);
    const fileString = readFileSync(PROJECT_SRC_PATH + "/api/test/+server.ts",{encoding: 'utf-8'});
    const valid = new RegExp(conditions.join('|')).test(fileString.toString());
    expect(valid).toBe(true);
}); 

test('should generate +server.ts with PATCH operation inside of it', () => {
    const conditions = ["export function PATCH"]
    generateApiPath("test",{patch: true});
    expect(existsSync(PROJECT_SRC_PATH + "/api/test/+server.ts")).toBe(true);
    const fileString = readFileSync(PROJECT_SRC_PATH + "/api/test/+server.ts",{encoding: 'utf-8'});
    const valid = new RegExp(conditions.join('|')).test(fileString.toString());
    expect(valid).toBe(true);
}); 


test('should generate +server.ts with DELETE operation inside of it', () => {
    const conditions = ["export function DELETE"]
    generateApiPath("test",{delete: true});
    expect(existsSync(PROJECT_SRC_PATH + "/api/test/+server.ts")).toBe(true);
    const fileString = readFileSync(PROJECT_SRC_PATH + "/api/test/+server.ts",{encoding: 'utf-8'});
    const valid = new RegExp(conditions.join('|')).test(fileString.toString());
    expect(valid).toBe(true);
}); 