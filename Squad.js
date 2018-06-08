const squad = {
    army: 0,
    soldiers: [],
    vehicles: [],
    attackStrategy: 'random'
}

const Squad = (army, soldiers, vehicles, attackStrategy) => {
    let squad = Object.assign({}, army, soldiers, vehicles, attackStrategy);
    return squad;
}

module.exports = Squad;