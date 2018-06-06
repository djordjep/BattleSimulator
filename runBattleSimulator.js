const Validator = require('./inputValidator');

const args = process.argv.slice(2);
const Battleground = Validator.validate(args);
console.log(Battleground);