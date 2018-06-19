const Util = require('../util');

const Unit = {
    health: 100,
    recharge: Util.getRandomInt(100,2000)
};

const experience = {
    experience: 0
};

const Soldier = () => {
    Unit.recharge = Util.getRandomInt(100,2000);
    
    let soldier = Object.assign({}, Unit, experience);

    soldier.attack = () => {
        if (soldier.health <= 0) return 0;
        return 0.5 * (1 + soldier.health/100) * Util.getRandomInt(30 + soldier.experience, 100)/100;
    }

    soldier.damage = () => {
        if (soldier.health <= 0) return 0;
        return 0.05 + soldier.experience / 100;
    }

    soldier.takeDamage = damage => {
        soldier.health = soldier.health - damage;
    }

    soldier.gainExperience = () => {
        soldier.experience ++;
    }

    return soldier;
}

const Vehicle = (operators) => {
    let vehicle = Object.assign({}, Unit, experience, operators);
    return validVehicle(vehicle);
}

const validVehicle = vehicle => {
    if(!'operators' in vehicle) vehicle.operators = Util.getRandomInt(1,3);
    if(vehicle.operators < 1) vehicle.operators = 1; 
    if(vehicle.operators > 3) vehicle.operators = 3;
    if(vehicle.recharge < 1000) vehicle.recharge = 1000;
}

module.exports.Soldier = Soldier;
module.exports.Vehicle = Vehicle;