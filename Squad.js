const squad = {
    army: 0,
    squad: 0,
    soldiers: [],
    vehicles: [],
    attackStrategy: 'random'
}

const Squad = (armyId, squadId, soldiers, vehicles, attackStrategy) => {
    let squad = Object.assign({}, armyId, squadId, soldiers, vehicles, attackStrategy);
    return squad;
}

module.exports = Squad;