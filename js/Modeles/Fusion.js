class MonsterFusion {
    constructor(monster, chance) {
        this.monster = monster;
        this.chance = chance;
    }
}

class MonsterFusionData {
    constructor(name, level, catClass) {
        this.name = name;
        this.level = level;
        this.catClass = catClass;
    }
}

class FusionViewModel {
    constructor(monster) {
        this.name = monster.name;
        this.level = monster.level;
        this.src = monster.src;
    }
}
