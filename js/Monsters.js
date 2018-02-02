var monsterFusionList = [
    new MonsterFusionData(strPotitata, 1, 'aucune'),
    new MonsterFusionData(strPotipuce, 5, 'eau'),
    new MonsterFusionData(strPotizarre, 8, 'plante'),
    new MonsterFusionData(strPotimeche, 12, 'feu'),
    new MonsterFusionData(strPotidoudou, 15, 'lune'),
];

var monsterList = [
    //new PlayerMonsterData(name, hpLevelOne, manaLevelOne, forceLevelOne, magieLevelOne,hp, force, magie, experienceNextLevel, experienceDonnee, catClass, evolution, evolutionLevel, futureSkills, loot, description)
    new PlayerMonsterData(
        strPotiron, 20, 10, 10, 10, 10, 2, 2, 5, 10, 'Chat', null, null,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strCapture, 1), new FutureSkill(strLanceFlame, 4),
        new FutureSkill(strFireBall, 4), new FutureSkill(strBalayage, 4)],
        [],
        strDescriptionPotiron,
    ),
    new PlayerMonsterData(
        strPotitata, 10, 20, 2, 20, 3, 1, 1, 1, 4, 'Normal', strPotitatac, 8,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strCharge, 5)],
        [new Loot('smallPotion', 0.6), new Loot('smallManaPotion', 0.3)],
        strDescriptionPotitata,
    ),
    new PlayerMonsterData(
        strPotitatac, 20, 5, 5, 5, 5, 2, 2, 5, 5, 'Normal', null, null,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strCharge, 3), new FutureSkill(strMorsure, 5)],
        [new Loot('mediumPotion', 0.6), new Loot('smallManaPotion', 0.4)],
        strDescriptionPotitatac,
    ),
    new PlayerMonsterData(
        strPotipuce, 20, 15, 5, 5, 5, 3, 2, 5, 5, 'Eau', null, null,
        [new FutureSkill(strCharge, 1), new FutureSkill(strAquaBall, 5)],
        [new Loot('mediumPotion', 0.8), new Loot('smallManaPotion', 0.6)],
        '',
    ),
    new PlayerMonsterData(
        strPotizarre, 10, 10, 10, 7, 7, 2, 3, 5, 5, 'Plante', null, null,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strLanceFeuille, 5)],
        [new Loot('mediumPotion', 0.8), new Loot('smallManaPotion', 0.6)],
        '',
    ),
    new PlayerMonsterData(
        strPotimeche, 15, 5, 5, 10, 7, 4, 2, 5, 5, 'Feu', null, null,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 5)],
        [new Loot('mediumPotion', 0.8), new Loot('smallManaPotion', 0.6)],
        '',
    ),
    new PlayerMonsterData(
        strPotidoudou, 12, 20, 5, 5, 7, 2, 2, 7, 7, 'Lune', null, null,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 1), new FutureSkill(strAquaBall, 1)],
        [],
        '',
    ),
    new PlayerMonsterData(
        strKaroutSauvage, 12, 20, 5, 5, 7, 2, 2, 7, 7, 'Lune', null, null,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strPoison, 1), new FutureSkill(strLanceFeuille, 3),
         new FutureSkill(strMorsure, 5), new FutureSkill(strJetDeVenin, 7)],
         [],
        '',
    ),
];

function fetchMonsterLoot(monsterName) {
    return monsterList.find(x=>x.name == monsterName).loot;
}
