const Unit = require('./Unit');
const Squad = require('./Squad');

const Army = (squads) => {

    let Army = Object.assign({}, squads);
    return Army;
}

const creator = armiesParams => {
    let armies = [];
    armiesParams.forEach(army => {
        let squads = [];
        for(let i=0;i<army.squads;i++){
            let soldiers = [];
            for(let j=0;j<army.units;j++){
                soldiers.push(Unit.Soldier());
            }
            squads.push(Squad({army: army.army}, {soldiers: soldiers}, {vehicles: []}, {attackStrategy: army.strategy}));
        }
        armies[army.army] = Army({squads: squads, army: army.army});
    });
    return armies;
}

module.exports.create = creator;