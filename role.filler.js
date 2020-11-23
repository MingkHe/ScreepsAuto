var roleFiller = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.filling && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.filling = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.filling && creep.store.getFreeCapacity() == 0) {
	        creep.memory.filling = true;
	        creep.say('🚧 fill');
	    }

	    if(creep.memory.filling) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });            
            if (targets.length > 0){
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // else{
            //     target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            //     if(target) {
            //         if(creep.build(target) == ERR_NOT_IN_RANGE) {
            //             creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            //         }
            //     }
            //     else{
            //         var target = creep.room.find(FIND_FLAGS)[0]
            //         creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}})
            //     }
            // }
	    }
	    else {
            var hugeStorage = creep.room.storage
            if (hugeStorage.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                if(creep.withdraw(hugeStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hugeStorage, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            
            }
        }
	}
};

module.exports = roleFiller;