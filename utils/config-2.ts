import * as fs from 'node:fs';
import * as path from 'node:path';


export function getConfig(configFile: string, caseId: string) {
    const env = process.env.ENV || 'dev';
    const raw = fs.readFileSync(path.resolve(`src/data/${configFile}-${env}.json`), 'utf-8');
    const testDataJSON = JSON.parse(raw);
    console.log(testDataJSON); // object JavaScript) 
    return testDataJSON[caseId];
}