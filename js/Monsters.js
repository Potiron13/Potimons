var monsterFusionList = [
    new MonsterFusionData(strPotitata, 1, 'aucune'),
    new MonsterFusionData(strPotipuce, 5, 'eau'),
    new MonsterFusionData(strPotizarre, 8, 'plante'),
    new MonsterFusionData(strPotimeche, 12, 'feu'),
    new MonsterFusionData(strPotidoudou, 15, 'lune'),
];

var basePotimonList = [
    //new PotimonBaseStats(id, name, hp, mana, attaque, defence, specialAttaque, specialDefence,
    //                      speed, type, evolution, evolutionLevel, experienceDonnee,futureSkills)
    new BasePotimon(
        '1', strPotiron, 70, 20, 80, 50, 35, 35, 35, strTypeNormal, null, null, 61,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strCapture, 1), new FutureSkill(strFireBall, 3)]
    ),
    new BasePotimon(
        '2', strPotitata, 30, 0, 56, 35, 25, 35, 72, strTypeNormal, strPotitatac, 20, 51,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 3)]
    ),
    new BasePotimon(
        '3', strPotitatac, 55, 0, 81, 60, 50, 70, 97, strTypeNormal, null, null, 145,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 3)]
    ),
];

function fetchMonsterLoot(monsterName) {
    return basePotimonList.find(x=>x.name == monsterName).loot;
}
