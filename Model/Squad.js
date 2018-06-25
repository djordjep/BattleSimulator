const squad = {
    army: 0,
    squad: 0,
    soldiers: [],
    vehicles: [],
    attackStrategy: 'random'
}

const productAttackCallback = (acc,cur) => {
    return acc * cur.attack();
}

const sumDamageCallback = (acc,cur) => {
    return acc + cur.damage();
}

const Squad = (armyId, squadId, soldiers, vehicles, attackStrategy) => {
    let squad = Object.assign({}, armyId, squadId, soldiers, vehicles, attackStrategy);

    squad.getHealth = () => {
        return squad.soldiers.reduce((total, soldier) => {
           return total + soldier.health;
            
        }, 0.0).toFixed(2);
    }

    squad.getExperience = () => {
        return squad.soldiers.reduce((total, soldier) => {
            return total + soldier.experience;
             
         }, 0.0).toFixed(2);
    }

    squad.takeDamage = damage => {
        squad.soldiers.map(soldier => {
            soldier.takeDamage(damage/squad.soldiers.length);
        });
    }

    squad.gainExperience = () => {
        squad.soldiers.map(soldier => {
            soldier.gainExperience();
        });
    }

    squad.recharge = () => {
        return squad.soldiers.map(soldier => {
            return soldier.recharge(soldier.rechargeTime);
        });
    }

    squad.attack = () => {
        return Math.pow(squad.soldiers.reduce(productAttackCallback, 1.0), 1.0 / squad.soldiers.length).toFixed(2);
    }
    
    squad.damage = () => {
        return squad.soldiers.reduce(sumDamageCallback, 0).toFixed(2);
    }


    return squad;
}

module.exports = Squad;