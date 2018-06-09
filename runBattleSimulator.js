const Validator = require('./inputValidator');
const armyFactory = require('./Model/armyFactory');
const battleEngine = require('./battle');

const args = process.argv.slice(2);
const Battleground = Validator.validate(args);
const Armies = armyFactory.create(Battleground.armies);
const battleOutcome = battleEngine(Armies);

var stdin = process.openStdin();

stdin.addListener("data", () => {
    console.log(JSON.stringify(battleOutcome, null, 2));
    process.exit(0);
});