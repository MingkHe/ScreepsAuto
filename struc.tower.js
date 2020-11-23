var strucTower = {

    /** @param {tower} tower **/
    run: function(tower) {
        
        var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            tower.attack(hostiles[0])
        }
        
        if (hostiles.length == 0) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
            
        }

	}
};

module.exports = strucTower;