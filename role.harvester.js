var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(!creep.memory.harvest && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvest = true;
            creep.say('🔄 harvest');
	    }
	    if(creep.memory.harvest && creep.store.getFreeCapacity() == 0) {
	        creep.memory.harvest = false;
	        creep.say('🚧 trans');
	    }

	    if(creep.memory.harvest) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                                structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                var hugeStorage = creep.room.storage
                if (hugeStorage.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                    if(creep.transfer(hugeStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hugeStorage, {visualizePathStyle: {stroke: '#ffffff'}});
                    }                    
                }
            }
        }
	}
};

module.exports = roleHarvester;