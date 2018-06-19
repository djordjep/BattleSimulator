const battleground = {};

const makeBattleground = args => {
    if(args.length < 7) throw new Error('Please specify params: number of armies, army1 strategy, army1 number of squads, army1 number of units, army2 strategy...');
    
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

const validateArmies = () => {
    if(battleground.numberOfArmies < 2) throw new Error('Wrong number of armies suplied');
} 

const validateStrategies = () => {
    let enm = ['random', 'weakest', 'strongest'];
    battleground.armies.forEach(army => {
        if( -1 === enm.indexOf(army.strategy)) throw new Error('Wrong strategy suplied');
    });   
} 

const validateSquads = () => {
    battleground.armies.forEach(army => {
        if(army.squads < 2) throw new Error('Wrong number of squads suplied');
    });  
} 

const validateUnits = () => {
    battleground.armies.forEach(army => {
        if(5 > army.units || army.units > 10) throw new Error('Wrong number of units suplied');
    });  
} 

const exportBattleground = () => {
    return battleground;
}

const Validate = args => {
    makeBattleground(args);
    validateArmies();
    validateStrategies();
    validateSquads();
    validateUnits();
    return exportBattleground();
}

module.exports.validate = Validate;