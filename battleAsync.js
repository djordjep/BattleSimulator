// make array of squads

// map trough each sqad
// async maybe race between squads (first squad that has no enemy left ends the game)
// find enemy based on strategy if no enemy standing resolve
// calculate attack and damage for both attacker and defender
// compare
// if success take damage, add experience...
// if fail skip
// repeat

let Armies = [];
const battleStats = [];

const extractSquads = armies => {
    return armies.reduce((result, army) => {
        result.push(...army.squads);
        return result;
      }, []);
}

// Victory or death
const victoryOrDeath = async (squad) => { 
    const ready = await Promise.all(squad.recharge()).then(ready => { squadLog(squad, " recharged and ready for attack!");});
    const enemy = await findEnemyOrClaim(squad);
    const outcome = await strike(enemy);

    if(outcome === true){
        return battleStats;
    }else{
        return await victoryOrDeath(outcome, null); // RECURSE  
    } 
}

// must return array of promisses
const attack = squads => {
    return squads.map(async squad => {
        const squadAttack = await victoryOrDeath(squad);
        return squadAttack;  
    });
}

const findEnemyOrClaim = async squad => {
      
    const enemy = await pickTarget(squad, battleStats);
    // resolve with bool if winner or
    if(!enemy) return true;

    // resolve with oponent squads pair 
    return [squad, enemy];   
}

const strike = async vector => {

    // vector[0] is winner
    if(vector === true) return true;
    
    // vector[0] is attacker
    squadLog(vector[0], 'attacks Army ' + vector[1].army + ' squad ' + vector[1].squad);
    if(vector[0].attack() > vector[1].attack()){
        // attack success
        squadLog(vector[0], 'attack success!');

        vector[1].takeDamage(vector[0].damage());
        squadLog(vector[0], 'deals ' + vector[0].damage() + ' damage');
        squadLog(vector[1], 'is left with ' + vector[1].getHealth() + ' health');
        
        vector[0].gainExperience();
        squadLog(vector[0], 'gains exerience!');
        squadLog(vector[0], 'has ' + vector[0].getExperience() + ' experience.');

        // update battle model
        updateStats(vector);
    } else{
        squadLog(vector[0], 'attack failed!');
    }
    // return attacker for recursion
    return vector[0];
}

const updateStats = (vector) => {
    battleStats.map(squad => {
        // update experience for attacker
        if((squad.army === vector[0].army) && (squad.squad === vector[0].squad)) squad.soldiers = vector[0].soldiers;
        // update health for defender
        if((squad.army === vector[1].army) && (squad.squad === vector[1].squad)) squad.soldiers = vector[1].soldiers;
        return squad;
    });
}

const updateArmy = (armies, vectors) => {
    vectors.map(vector => {
        //update soldier stats, update defender,
        // we need health only everything else is calculated on each turn
        armies[vector[1].army]['squads'][vector[1].squad]['soldiers'] = vector[1].soldiers;
        // flag dead squad
        if(vector[1].getHealth() <= 0){
            armies[vector[1].army]['squads'][vector[1].squad]['destroyed'] = true;
            armies[vector[1].army].squadNo--;
        }
    });
    return armies;
}

const pickTarget = async (squad, allSquads) => {
    // eliminate ally squads or destroyed
    let enemySquads = allSquads.reduce((result, squadTurn) => {
        if((squad.army != squadTurn.army) && (squadTurn.getHealth() > 0)) result.push(squadTurn);
        return result;
    }, []);

    // no enemy left
    if(enemySquads.length <= 0) return false;

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

const findMinMax = (arr,prop) => {
    let min = arr[0], max = arr[0];
  
    for (let i = 1, len=arr.length; i < len; i++) {
      let v = arr[i];
      min = (v[prop] < min[prop]) ? v : min;
      max = (v[prop] > max[prop]) ? v : max;
    }
  
    return [min, max];
  }

const battleRun = squads => {
    let attackAll = attack(squads); 
    // all squads attack asynchronously first squad with no enemy takes a win
   Promise.race(attackAll)
      .then( results => {
        console.log(JSON.stringify(results, null, 2));
        process.exit(0); 
      })
      .catch(function(err) {
          // x|
        console.log("race error:", err);
      });
}

const squadLog = (squad, message) => {
    console.log('Army ' + squad.army + ' squad ' + squad.squad + ': ' + message);
}

const battle = armies => {
    let squads = extractSquads(armies);
    // initialize battle state, do I need lock on this?
    battleStats.push(...squads);
    //Armies = armies;

    return battleRun(squads);
}

module.exports = battle;