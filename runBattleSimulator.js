const Validator = require('./inputValidator');
const armyFactory = require('./armyFactory');
const battle = require('./battle');

const args = process.argv.slice(2);
const Battleground = Validator.validate(args);
const Armies = armyFactory.create(Battleground.armies);
const battleOutcome = battle(Armies);

var stdin = process.openStdin();

stdin.addListener("data", () => {
    console.log(JSON.stringify(battleOutcome, null, 2));
    process.exit(0);
});