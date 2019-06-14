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

var plaine4 = [
    new Terrain(32, 20),
    new Terrain(30, 20),
    new Terrain(17, 20),
    new Terrain(20, 20),
    new Terrain(24, 20),
]

var plaine5 = [
    new Terrain(31, 25),
    new Terrain(34, 25),
    new Terrain(95, 25),
    new Terrain(57, 25),
]

var foret = [
    new Terrain(10, 40),
    new Terrain(13, 55),
    new Terrain(25, 5),
]

var foret2 = [
    new Terrain(11, 25),
    new Terrain(12, 25),
    new Terrain(14, 25),
    new Terrain(15, 25),
]

var marais2 = [
    new Terrain(20, 25),
    new Terrain(24, 25),
    new Terrain(28, 25),
    new Terrain(47, 25),
]

var marais3 = [
    new Terrain(20, 20),
    new Terrain(22, 20),
    new Terrain(24, 20),
    new Terrain(28, 20),
    new Terrain(42, 20),
]

var kaverneKarout = [
    new Terrain(74, 25),
    new Terrain(41, 54),
    new Terrain(46, 21),
]

var kaverneKarout2 = [
    new Terrain(18, 20),
    new Terrain(28, 20),
    new Terrain(42, 20),
    new Terrain(47, 20),
    new Terrain(57, 20),
]

var kaverneKarout3 = [
    new Terrain(24, 25),
    new Terrain(42, 54),
    new Terrain(47, 21),
]

var arenePierre = [
    new Arene(74),
    new Arene(74),
    new Arene(95),
]

var areneEau = [
    new Arene(8),
    new Arene(8),
    new Arene(8),
]

var areneFeu = [
    new Arene(5),
    new Arene(5),
    new Arene(5),
]

var arenePlante = [
    new Arene(2),
    new Arene(2),
    new Arene(2),
]

var areneInsect = [
    new Arene(15),
    new Arene(12),
    new Arene(15),
]

var arenePoison = [
    new Arene(24),
    new Arene(42),
    new Arene(24),
]

var areneVol = [
    new Arene(22),
    new Arene(18),
    new Arene(20),
]

var areneSol = [
    new Arene(31),
    new Arene(34),
    new Arene(28),
]

var boss1 = [
    new Arene(3),
    new Arene(6),
    new Arene(9),
]

var boss2 = [
    new Arene(130),
    new Arene(130),
    new Arene(130),
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
    new Carte(8, 3, areneEau, 15, 16, strKaverneKarout, true),
    new Carte(9, 3, plaine2, 14, 16, strPlaine, false),
    new Carte(10, 3, plaine2, 16, 18, strPlaine, false),
    new Carte(11, 3, areneFeu, 20, 22, strPlaine, true),
    new Carte(12, 1, marais, 5, 5, strMarais, false),
    new Carte(13, 1, arenePlante, 20, 22, strMarais, true),
    new Carte(14, 3, plaine3, 18, 20, strPlaine, false),
    new Carte(15, 3, plaine4, 20, 25, strPlaine, false),
    new Carte(16, 3, areneInsect, 25, 30, strPlaine, true),
    new Carte(17, 3, foret2, 25, 30, strForet, false),
    new Carte(18, 3, areneVol, 35, 40, strForet, true),
    new Carte(19, 3, marais2, 30, 35, strMarais, false),
    new Carte(20, 3, marais3, 35, 40, strMarais, false),
    new Carte(21, 3, arenePoison, 40, 45, strMarais, true),
    new Carte(22, 3, kaverneKarout2, 40, 45, strKaverneKarout, false),
    new Carte(23, 3, kaverneKarout3, 45, 50, strKaverneKarout, false),
    new Carte(24, 3, areneSol, 50, 55, strKaverneKarout, true),
    new Carte(25, 3, plaine5, 50, 55, strPlaine, false),
    new Carte(26, 3, boss1, 70, 75, strMarais, true),
    new Carte(27, 1, boss2, 100, 110, strPlaine, true),
]

function monstreApparu(monsters) {
    var i, sum = 0, r = Math.random() * 100;
    for (i in monsters) {
        sum += monsters[i].tauxApparition;
        if (r <= sum) return monsters[i].id;
    }
}