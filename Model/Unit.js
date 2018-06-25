const Util = require('../util');

const Unit = {
    health: 100,
    rechargeTime: Util.getRandomInt(100,2000)
};

const experience = {
    experience: 0
};

const recharge = {
    recharge: rechargeTime => {
        return new Promise((resolve,reject)=> setTimeout(resolve(true), rechargeTime));
    }
};

const Soldier = () => {
    Unit.rechargeTime = Util.getRandomInt(100,2000);
    
    let soldier = Object.assign({}, Unit, experience, recharge);

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
        if(soldier.experience < 50) soldier.experience ++;
    }

    return soldier;
}

const Vehicle = (operators) => {
    let vehicle = Object.assign({}, Unit, experience, recharge, operators);
    
    vehicle.soldiers = [];

    //TODO: fill vehicle with soldiers, create productAttackCallback, move unit attack and damage calc to unit

    vehicle.damage = () => {
        if (vehicle.health <= 0) return 0;
        0.5 * (1 + vehicle.health / 100) * Math.pow(vehicle.soldiers.reduce(productAttackCallback, 1.0), 1.0 / vehicle.soldiers.length).toFixed(2);
    }

    return validVehicle(vehicle);
}

const validVehicle = vehicle => {
    if(!'operators' in vehicle) vehicle.operators = Util.getRandomInt(1,3);
    if(vehicle.operators < 1) vehicle.operators = 1; 
    if(vehicle.operators > 3) vehicle.operators = 3;
    if(vehicle.rechargeTime < 1000) vehicle.rechargeTime = 1000;
}

module.exports.Soldier = Soldier;
module.exports.Vehicle = Vehicle;