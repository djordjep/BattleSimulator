const Validator = require('./inputValidator');
const battlegroundFactory = require('./Model/battlegroundFactory');
const battleEngine = require('./battleAsync');

const args = process.argv.slice(2);
const BattleInput = Validator.validate(args);
const Battleground = battlegroundFactory.create(BattleInput.armies);
const battleOutcome = battleEngine(Battleground);

var stdin = process.openStdin();

stdin.addListener("data", () => {
    console.log(JSON.stringify(battleOutcome, null, 2));
    process.exit(0);
});