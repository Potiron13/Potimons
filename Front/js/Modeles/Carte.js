class Carte {
    constructor(id, nombreMaximumEnnemie, listIdEnnemiePossible, levelMin, levelMax, name) {
        this.id = id;
        this.nombreMaximumEnnemie = nombreMaximumEnnemie;
        this.listIdEnnemiePossible = listIdEnnemiePossible;
        this.levelMin = levelMin;
        this.levelMax = levelMax;
        this.name = name;
        this.jouable = false;
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

var plaine = [
    16,
    19,    
]

var foret = [
    10,
    13,
    25    
]

function generateCarte (lastCarteId, allPotimonId) {    
    var randMonster1 = entierAleatoire(0, allPotimonId.length - 1);
    var randMonster2 = entierAleatoire(0, allPotimonId.length - 1);
    var randMonster3 = entierAleatoire(0, allPotimonId.length - 1);
    var randTerrain = entierAleatoire(0, AllTerrain.length - 1);    
    var carteId = lastCarteId + 1;
    return new Carte(carteId, 3, [allPotimonId[randMonster1], allPotimonId[randMonster2], allPotimonId[randMonster3]],
         carteId*5 - 4, carteId*5, AllTerrain[randTerrain]);
}

function generateCarteOnline(){
    var randTerrain = entierAleatoire(0, AllTerrain.length - 1);
    return new Carte(guidGenerator(), null, null, null, null, AllTerrain[randTerrain]);
}

var AllCartes = [
    new Carte('1', 3, plaine, 1, 4, 'plaine'),
    new Carte('2', 3, foret, 4, 8, 'foret'),
]
