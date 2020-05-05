import {writeFileSync} from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();
const environment = path.join(__dirname + '/environment.ts');
const environmentProd = path.join(__dirname + '/environment.prod.ts');

// `environment.ts` file structure
const envConfigFile = `export const environment = {
   PORT: '${process.env.PORT || 80}',
   API_BASE: 'http://localhost',
   production: false
};
`;

// `environment.prod.ts` file structure
const envConfigProdFile = `export const environment = {
   PORT: '${process.env.PORT || 80}',
   API_BASE: 'http://localhost',
   production: true
};
`;

// Debug
console.log('The file `environment.ts` will be written with the following content: \n');
console.log(envConfigFile);
writeFileSync(environment, envConfigFile);
console.log(`Angular environment.ts file generated correctly at ${environment} \n`);


// Prod
console.log('The file `environment.prod.ts` will be written with the following content: \n');
console.log(envConfigProdFile);
writeFileSync(environmentProd, envConfigProdFile);
console.log(`Angular environment.prod.ts file generated correctly at ${environmentProd} \n`);
process.exit(0);
