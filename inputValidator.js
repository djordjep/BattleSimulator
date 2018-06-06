const battleground = {};

const makeBattleground = args => {
    let numberOfArmies = args[0];
    battleground.numberOfArmies = numberOfArmies;
    battleground.armies = [];
    let armies = [];

    for(i=0; i<numberOfArmies; i++){
        let pos = 1+(i*3);
       armies[i] = args.slice(pos, pos+3);
       battleground.armies[i] = {
            army: i,
            strategy: armies[i][0],
            squads: armies[i][1],
            units: armies[i][2]
       }; 
    }
}

const validateArmies = args => {
    if(battleground.numberOfArmies < 2) throw new Error('Wrong number of armies suplied');
} 

const validateStrategies = args => {
    let enm = ['random', 'weakest', 'strongest'];
    battleground.armies.forEach(army => {
        if( -1 === enm.indexOf(army.strategy)) throw new Error('Wrong strategy suplied');
    });   
} 

const validateSquads = args => {
    battleground.armies.forEach(army => {
        if(army.squads < 2) throw new Error('Wrong number of squads suplied');
    });  
} 

const validateUnits = args => {
    battleground.armies.forEach(army => {
        if(5 > army.units || army.units > 10) throw new Error('Wrong number of units suplied');
    });  
} 

const exportBattleground = () => {
    return battleground;
}

const Validate = args => {
    makeBattleground(args);
    validateArmies(args);
    validateStrategies(args);
    validateSquads(args);
    validateUnits(args);
    return exportBattleground();
}

module.exports.validate = Validate;