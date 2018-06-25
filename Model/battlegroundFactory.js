const Unit = require('./Unit');
const Squad = require('./Squad');
const Util = require('../util');

const Army = (army, squads) => {

    let Army = Object.assign({}, army, squads);
    return Army;
}

const creator = armiesParams => {
    let armies = [];
    armiesParams.forEach(army => {
        let squads = [];
        let vehicles = [];
        for(let i=0;i<army.squads;i++){
            let soldiers = [];
            for(let j=0;j<army.units;j++){
                // create solder or vehicle
                //if(Util.getRandomBool){
                    soldiers.push(Unit.Soldier());
                //}else{
                    //vehicles.push(Unit.Vehicle());
                //}
            }
            squads.push(Squad({army: army.army}, {squad: i}, {soldiers: soldiers}, {vehicles:vehicles}, {attackStrategy: army.strategy}));
        }
        armies[army.army] = Army({army: army.army, squadNo: army.squads}, {squads: squads});
    });
    return armies;
}

module.exports.create = creator;