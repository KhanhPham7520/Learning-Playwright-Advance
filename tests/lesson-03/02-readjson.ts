import * as fs from 'node:fs';
import * as path from 'node:path';



// Cách 1: fs.readFileSync + JSON.parse
const raw = fs.readFileSync(path.resolve('src/data/00-data.json'), 'utf-8');
const pages = JSON.parse(raw);

console.log(pages); // object JavaScript