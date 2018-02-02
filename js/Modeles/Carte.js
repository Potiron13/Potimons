class Carte {
    constructor(id, nombreMaximumEnnemie, listNomEnnemiePossible, levelMin, levelMax, name) {
        this.id = id;
        this.nombreMaximumEnnemie = nombreMaximumEnnemie;
        this.listNomEnnemiePossible = listNomEnnemiePossible;
        this.levelMin = levelMin;
        this.levelMax = levelMax;
        this.name = name;
    }
}

var AllTerrain = [
    'plaine',
    'marais',
    'foret',
    'volcan',
    'lune',
    'kaverneKarout',
];

function generateCarte (lastCarteId) {
    var allMonstersName = monsterList.map(x=>x.name);
    allMonstersName.shift();
    var randMonster1 = entierAleatoire(0, allMonstersName.length - 1);
    var randMonster2 = entierAleatoire(0, allMonstersName.length - 1);
    var randMonster3 = entierAleatoire(0, allMonstersName.length - 1);
    var randTerrain = entierAleatoire(0, AllTerrain.length - 1);
    var carteId = lastCarteId + 1;
    return new Carte(carteId, 1, [allMonstersName[randMonster1], allMonstersName[randMonster2], allMonstersName[randMonster3]],
         carteId*5 - 4, carteId*5, AllTerrain[randTerrain]);
}

/*
var AllCartes = [
    new Carte('1', 2, [strPotitata, strKaroutSauvage], 1, 4, 'plaine'),
    new Carte('2', 3, [strPotitata, strPotipuce], 4, 8, 'marais'),
    new Carte('3', 3, [strPotitata, strPotipuce, strPotizarre], 8, 12, 'foret'),
    new Carte('4', 3, [strPotitata, strPotipuce, strPotizarre, strPotimeche], 12, 15, 'volcan'),
    new Carte('5', 3, [strPotitata, strPotipuce, strPotizarre, strPotimeche, strPotidoudou, strKaroutSauvage], 15, 20, 'lune'),
]*/
