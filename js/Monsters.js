var monsterFusionList = [
    new MonsterFusionData(strPotitata, 1, 'aucune'),
    new MonsterFusionData(strPotipuce, 5, 'eau'),
    new MonsterFusionData(strPotizarre, 8, 'plante'),
    new MonsterFusionData(strPotimeche, 12, 'feu'),
    new MonsterFusionData(strPotidoudou, 15, 'lune'),
];

var basePotimonList = [
    //new PotimonBaseStats(id, name, hp, mana, attaque, defence, specialAttaque, specialDefence,
    //                      speed, type, evolution, evolutionLevel, experienceDonnee,futureSkills, tauxDeCapture)
    /*new BasePotimon(
        '1', strPotiron, 70, 20, 80, 50, 35, 35, 35, 1, null, null, 61,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 3)],
        180,
    ),
    new BasePotimon(
        '2', strPotitata, 30, 0, 56, 35, 25, 35, 72, 1, strPotitatac, 20, 51,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 3)],
        255,
    ),*/
    new BasePotimon(
        '3', strPotipuce, 44, 0, 48, 65, 50, 64, 43, 4, null, null, 63,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strAquaBall, 1)],
        45,
    ),
    new BasePotimon(
        '4', strPotimeche, 39, 0, 52, 43, 60, 50, 65 , 7, null, null, 62,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 1)],
        45,
    ),
    /*new BasePotimon(
        '3', strPotitatac, 55, 0, 81, 60, 50, 70, 97, strTypeNormal, null, null, 145,
        [new FutureSkill(strGriffe, 1), new FutureSkill(strFireBall, 3)],
        127,
    ),*/
];

function fetchMonsterLoot(monsterName) {
    return basePotimonList.find(x=>x.name == monsterName).loot;
}
