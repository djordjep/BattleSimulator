const squad = {
    army: 0,
    squad: 0,
    soldiers: [],
    vehicles: [],
    attackStrategy: 'random'
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


    return squad;
}

module.exports = Squad;