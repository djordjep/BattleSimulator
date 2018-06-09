const productAttackCallback = (acc,cur) => {
    return acc * cur.attack();
}

const productDamageCallback = (acc,cur) => {
    return acc + cur.damage();
}

const calcAttackAndDamage = armies => {
    armies.map(army => {
        army.squads.map(squad => {
            squad.attack = Math.pow(squad.soldiers.reduce(productAttackCallback, 1.0), 1.0 / squad.soldiers.length).toFixed(2);
            squad.damage = squad.soldiers.reduce(productDamageCallback, 0).toFixed(2);
            return squad;
        });
        return army;
    });
    return armies;
}

const calcVectors = allSquads => {
    let vectorsOfAttack = allSquads.reduce((vectors, squad) => {
        vectors.push([squad, pickTarget(squad, allSquads)]);
        return vectors;
    }, []);
    return vectorsOfAttack;
}

const findMinMax = (arr,prop) => {
    let min = arr[0], max = arr[0];
  
    for (let i = 1, len=arr.length; i < len; i++) {
      let v = arr[i];
      min = (v[prop] < min[prop]) ? v : min;
      max = (v[prop] > max[prop]) ? v : max;
    }
  
    return [min, max];
  }

const pickTarget = (squad, allSquads) => {
    // eliminate ally squads
    let enemySquads = allSquads.reduce((result, squadTurn) => {
        if(squad.army != squadTurn.army) result.push(squadTurn);
        return result;
    }, []);

    let maxHealth = findMinMax(enemySquads, "health")[1];
    let MaxExp = findMinMax(enemySquads, "experience")[1];
    let maxUnits = findMinMax(enemySquads, "length")[1];
    let maxDamage = findMinMax(enemySquads, "damage")[1];

    //TODO: make weakest and random attack strategy based on squad.attackStrategy
    // brake this to multiple functions
    enemySquads.map(squad => {
        // use level to determine squad strenght
        // here I am adding level to winner in each category
        squad.level = 0;
        if(squad.army === maxHealth.army && squad.squad === maxHealth.squad) squad.level++;
        if(squad.army === MaxExp.army && squad.squad === MaxExp.squad) squad.level++;
        if(squad.army === maxUnits.army && squad.squad === maxUnits.squad) squad.level++;
        if(squad.army === maxDamage.army && squad.squad === maxDamage.squad) squad.level++;
    });

    return enemySquads.reduce((winner, currentSquad) => {
        return (currentSquad.level > winner.level) ? currentSquad : winner;
    }); 
}

const squadLog = (squad, message) => {
    console.log('Army ' + squad.army + ' squad ' + squad.squad + ': ' + message);
}

const executeAttack = vectors => {
    vectors.map(vector => {
        // vector[0] is attacker
        squadLog(vector[0], 'attacks Army ' + vector[1].army + ' squad ' + vector[1].squad);
        if(vector[0].attack > vector[1].attack){
            // attack success
            squadLog(vector[0], 'attack success!');

            vector[1].takeDamage(vector[0].damage);
            squadLog(vector[0], 'deals ' + vector[0].damage + ' damage');
            squadLog(vector[1], 'is left with ' + vector[1].getHealth() + ' health');
            
            vector[0].gainExperience();
            squadLog(vector[0], 'gains exerience!');
            squadLog(vector[0], 'has ' + vector[0].getExperience() + ' experience.');
        } else{
            squadLog(vector[0], 'attack failed!');
        }
        return vector;
    });
    return vectors;
}

const extractSquads = armies => {
    return armies.reduce((result, army) => {
        result.push(...army.squads);
        return result;
      }, []);
}

const attack = armies => {
    let allSquads = extractSquads(armies);
    let vectors = calcVectors(allSquads);
    return executeAttack(vectors);
}

const updateStats = (armies, vectors) => {
    vectors.map(vector => {
        //update soldier stats, update defender,
        // we need health only everything else is calculated on each turn
        armies[vector[1].army]['squads'][vector[1].squad]['soldiers'] = vector[1].soldiers;
        // flag dead squad
        if(vector[1].getHealth() <= 0){
            armies[vector[1].army]['squads'][vector[1].squad]['destroued'] = true;
            armies[vector[1].army].squadNo--;
        }
    });
    return armies;
}

const battleEnded = armies => {
    let standingArmies = armies.reduce((standingArmies, army) => {
        if(army.squadNo > 0) standingArmies.push(army.army);
        return standingArmies;
    }, []);
    console.log('End of turn -------------------- Standing armies: ' + standingArmies.length);
    //there can be only one
    if(standingArmies.length == 1){
        console.log('=============== Army No.' + standingArmies[0] + ' won the battle! ===============');
        console.log('Press any key for battleground stats');
        return true;
    } 
    return false;
}

const battle = armies => {
    let prepTurn = calcAttackAndDamage(armies);
    let runTurn = attack(prepTurn);
    let outcome = updateStats(armies, runTurn);
    if(!battleEnded(outcome)) return battle(outcome);
    return outcome;  
}

module.exports = battle;