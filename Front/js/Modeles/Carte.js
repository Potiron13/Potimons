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
    var allPotimonName = basePotimonList.map(x=>x.name);
    allPotimonName.shift();
    var randMonster1 = entierAleatoire(0, allPotimonName.length - 1);
    var randMonster2 = entierAleatoire(0, allPotimonName.length - 1);
    var randMonster3 = entierAleatoire(0, allPotimonName.length - 1);
    var randTerrain = entierAleatoire(0, AllTerrain.length - 1);
    //var randNombreMonster = entierAleatoire(1, 3);
    var carteId = lastCarteId + 1;
    return new Carte(carteId, 3, [allPotimonName[randMonster1], allPotimonName[randMonster2], allPotimonName[randMonster3]],
         carteId*5 - 4, carteId*5, AllTerrain[randTerrain]);
}

function generateCarteOnline(){
    var randTerrain = entierAleatoire(0, AllTerrain.length - 1);
    return new Carte(guidGenerator(), null, null, null, null, AllTerrain[randTerrain]);
}

/*
var AllCartes = [
    new Carte('1', 2, [strPotitata, strKaroutSauvage], 1, 4, 'plaine'),
    new Carte('2', 3, [strPotitata, strPotipuce], 4, 8, 'marais'),
    new Carte('3', 3, [strPotitata, strPotipuce, strPotizarre], 8, 12, 'foret'),
    new Carte('4', 3, [strPotitata, strPotipuce, strPotizarre, strPotimeche], 12, 15, 'volcan'),
    new Carte('5', 3, [strPotitata, strPotipuce, strPotizarre, strPotimeche, strPotidoudou, strKaroutSauvage], 15, 20, 'lune'),
]*/
