class Carte {
    constructor(id, nombreEnnemie, listEnnemiePossible, levelMin, levelMax, name, arene) {
        this.id = id;
        this.nombreEnnemie = nombreEnnemie;
        this.listEnnemiePossible = listEnnemiePossible;
        this.levelMin = levelMin;
        this.levelMax = levelMax;
        this.name = name;
        this.jouable = false;
        this.arene = arene;
    }
}

class Arene {
    constructor(id) {
        this.id = id;
    }
}

class Terrain extends Arene {
    constructor(id, tauxApparition) {
        super(id);
        this.tauxApparition = tauxApparition;
    }
}

var AllTerrain = [
    strPlaine,
    strMarais,
    strForet,
    'volcan',
    'lune',
    strKaverneKarout,
    strArenePierre
];

var marais = [
    new Terrain(129, 100),
]

var plaine = [
    new Terrain(16, 50),
    new Terrain(19, 50),
]

var plaine2 = [
    new Terrain(16, 20),
    new Terrain(19, 20),
    new Terrain(21, 20),
    new Terrain(23, 20),
    new Terrain(32, 20),
]

var plaine3 = [
    new Terrain(27, 20),
    new Terrain(56, 20),
    new Terrain(21, 20),
    new Terrain(23, 20),
    new Terrain(29, 20),
]


var foret = [
    new Terrain(10, 40),
    new Terrain(13, 55),
    new Terrain(25, 5),
]

var kaverneKarout = [
    new Terrain(74, 25),
    new Terrain(41, 54),
    new Terrain(46, 21),
    // new Terrain(35, 6),
]

var arenePierre = [
    new Arene(74),
    new Arene(74),
    new Arene(95),
]

var boss = [
    new Arene(3),
    new Arene(6),
    new Arene(9),
]

function generateCarte(lastCarteId, allPotimonId) {
    var randMonster1 = entierAleatoire(0, allPotimonId.length - 1);
    var randMonster2 = entierAleatoire(0, allPotimonId.length - 1);
    var randMonster3 = entierAleatoire(0, allPotimonId.length - 1);
    var randTerrain = entierAleatoire(0, AllTerrain.length - 1);
    var carteId = lastCarteId + 1;
    return new Carte(carteId, 3, [allPotimonId[randMonster1], allPotimonId[randMonster2], allPotimonId[randMonster3]],
        carteId * 5 - 4, carteId * 5, AllTerrain[randTerrain]);
}

function generateCarteOnline() {
    var randTerrain = entierAleatoire(0, AllTerrain.length - 1);
    return new Carte(guidGenerator(), null, null, null, null, AllTerrain[randTerrain]);
}

var AllCartes = [
    new Carte(0, 1, plaine, 1, 2, strPlaine, false),
    new Carte(1, 3, plaine, 2, 4, strPlaine, false),
    new Carte(2, 3, foret, 4, 6, strForet, false),
    new Carte(3, 3, foret, 6, 8, strForet, false),
    new Carte(4, 3, foret, 8, 10, strForet, false),
    new Carte(5, 3, arenePierre, 12, 14, strArenePierre, true),
    new Carte(6, 3, kaverneKarout, 10, 12, strKaverneKarout, false),
    new Carte(7, 3, kaverneKarout, 12, 14, strKaverneKarout, false),
    new Carte(8, 3, plaine2, 14, 16, strPlaine, false),
    new Carte(9, 3, plaine2, 16, 18, strPlaine, false),
    new Carte(10, 1, marais, 5, 5, strMarais, false),
    new Carte(11, 3, plaine3, 18, 20, strPlaine, false),
    new Carte(12, 3, plaine3, 20, 25, strPlaine, false),
    new Carte(13, 3, foret, 25, 30, strForet, false),
    new Carte(14, 3, foret, 30, 35, strForet, false),
    new Carte(15, 3, foret, 35, 40, strForet, false),
    new Carte(16, 3, kaverneKarout, 40, 45, strKaverneKarout, false),
    new Carte(17, 3, kaverneKarout, 45, 50, strMarais, false),
    new Carte(18, 1, boss, 70, 70, strMarais, true),
]

function monstreApparu(monsters) {
    var i, sum = 0, r = Math.random() * 100;
    for (i in monsters) {
        sum += monsters[i].tauxApparition;
        if (r <= sum) return monsters[i].id;
    }
}