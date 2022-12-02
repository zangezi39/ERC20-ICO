const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const icotokenPath = path.resolve(__dirname, 'contracts', 'Icotoken.sol');
const source = fs.readFileSync(icotokenPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
