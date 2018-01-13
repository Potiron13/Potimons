var monsterFusionList = [
    new MonsterFusionData(strPotitata, 1, 'aucune'),
    new MonsterFusionData(strPotipuce, 3, 'eau'),
    new MonsterFusionData(strPotimeche, 5, 'feu')
];

var monsterList = [
    //new PlayerMonsterData(name, hpLevelOne, forceLevelOne, magieLevelOne,hp, force, magie, experienceNextLevel, catClass, evolution, evolutionLevel, futureSkills, loot)
    new PlayerMonsterData(
        strPotiron, 20, 10, 10, 10, 2, 2, 5, 3,'Chat', null, null,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strCapture, 1), new FutureSkill(strFireBall, 5)],
    ),
    new PlayerMonsterData(
        strPotitata, 10, 2, 2, 3, 1, 1, 1, 2,'Normal', strPotitatac, 4,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strCharge, 3)],
        [new Loot('smallPotion', 1)]
    ),
    new PlayerMonsterData(
        strPotitatac, 20, 5, 5, 5, 2, 2, 5, 2,'Normal', null, null,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strCharge, 3), new FutureSkill(strMorsure, 5)]
    ),
    new PlayerMonsterData(
        strPotipuce, 15, 5, 5, 5, 2, 2, 5, 2,'Eau', null, null,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strAquaBall, 5)],
        [new Loot('mediumPotion', 1)]
    ),
    new PlayerMonsterData(
        strPotidoudou, 12, 5, 5, 7, 2, 2, 7, 2,'Lune', null, null,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 5), new FutureSkill(strAquaBall, 5)]
    )
];

function fetchMonsterLoot(monsterName) {
    return monsterList.find(x=>x.name == monsterName).loot;
}
