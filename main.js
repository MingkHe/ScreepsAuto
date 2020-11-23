var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFiller = require('role.filler');
var strucTower = require('struc.tower');

module.exports.loop = function () {

    // var tower = Game.getObjectById('af98f89e53022de15508aa53');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }

    var myRoom = Game.rooms["E44S38"]
    var towers = myRoom.find(FIND_MY_STRUCTURES, {
        filter: (structure) => structure.structureType == STRUCTURE_TOWER
    });

    // strucTower.run(towers[0])
    for (var key in towers){
        strucTower.run(towers[key]);
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var numOfHarverster = 0;
    var numOfUpgrader = 0;
    var numOfBuilder = 0;
    var numOfRepairer = 0;
    var numOfFiller = 0;

    for(var name in Game.creeps) {
       var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            numOfHarverster += 1;
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            numOfUpgrader += 1;
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            numOfBuilder += 1;
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            numOfRepairer += 1;
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'filler') {
            numOfFiller += 1;
            roleFiller.run(creep);
        }
    }

    if (numOfHarverster < 4) {
        let name = "harvester" + Game.time;
        Game.spawns['TownHall'].spawnCreep(
            [WORK, WORK, WORK, CARRY,CARRY, CARRY, MOVE,MOVE, MOVE],
            name,
            {memory: {role: "harvester", status: "harvest"}}
        ); 
    }
    if (numOfHarverster == 4) {
        if (numOfUpgrader < 2) {
            let name = "upgrader" + Game.time;
            Game.spawns['TownHall'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                name,
                {memory: {role: "upgrader", status: "upgrader"}}
            );
        }
        if (numOfBuilder < 2) {
            let name = "builder" + Game.time;
            Game.spawns['TownHall'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                name,
                {memory: {role: "builder", status: "builder"}}
            ); 
        }
        if (numOfFiller < 1 && myRoom.storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            let name = "filler" + Game.time;
            Game.spawns['TownHall'].spawnCreep(
                [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                name,
                {memory: {role: "filler", status: "filler"}}
            );         
        }
        
    }

    
}