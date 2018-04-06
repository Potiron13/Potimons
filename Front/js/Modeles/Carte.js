class Carte {
    constructor(id, nombreMaximumEnnemie, listEnnemiePossible, levelMin, levelMax, name, arene) {
        this.id = id;
        this.nombreMaximumEnnemie = nombreMaximumEnnemie;
        this.listEnnemiePossible = listEnnemiePossible;
        this.levelMin = levelMin;
        this.levelMax = levelMax;
        this.name = name;
        this.jouable = false;
        this.arene = arene;
    }
}

class Arene {
    constructor(id){
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
    'marais',
    strForet,
    'volcan',
    'lune',
    'kaverneKarout',
    strArenePierre
];

var plaine = [
    new Terrain(16,50),
    new Terrain(19,50),
]

var foret = [
    new Terrain(10, 40),
    new Terrain(13, 55),
    new Terrain(25, 5),
]

var kaverneKarout = [
    new Terrain(74, 25),
    new Terrain(41, 54),
    new Terrain(46, 15),
    new Terrain(35, 6),
]

var arenePierre = [
    new Arene(74),
    new Arene(74),
    new Arene(95),
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
    new Carte('1', 3, plaine, 1, 4, strPlaine, false),
    new Carte('2', 3, foret, 4, 8, strForet, false),
    new Carte('3', 2, arenePierre, 12, 14, strArenePierre, true),
]

function monstreApparu(monsters) {
    var i, sum=0, r=Math.random()*100;
    for (i in monsters) {
      sum += monsters[i].tauxApparition;      
      if (r <= sum) return monsters[i].id;
    }
}