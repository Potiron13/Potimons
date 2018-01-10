var monsterFusionList = [
    new MonsterFusionData(strPotitata, 1, 'aucune'),
    new MonsterFusionData(strPotipuce, 3, 'eau'),
    new MonsterFusionData(strPotimeche, 5, 'feu')
];

var monsterList = [
    //new PlayerMonsterData(name, hpLevelOne, forceLevelOne, magieLevelOne,hp, force, magie, experienceNextLevel, catClass, evolution, evolutionLevel, futureSkills)
    new PlayerMonsterData(strPotiron, 10, 5, 5, 5, 2, 2, 5, 3,'Chat', 'Grotiron', 15, [new FutureSkill(strGriffe, 1), new FutureSkill(strCapture, 1), new FutureSkill(strFireBall, 5)]),
    new PlayerMonsterData(strPotitata, 10, 5, 5, 5, 2, 2, 5, 2,'Chat', 'Grotiron', 15, [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 5)]),
    new PlayerMonsterData(strPotipuce, 10, 5, 5, 5, 2, 2, 5, 2,'Chat', 'Grotiron', 15, [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 5)]),
    new PlayerMonsterData(strPotidoudou, 10, 5, 5, 5, 2, 2, 5, 2,'Chat', 'Grotiron', 15, [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 5)])
];
