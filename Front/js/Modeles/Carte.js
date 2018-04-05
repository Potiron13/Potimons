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
    {id: 16, tauxApparition: 50},
    {id: 19, tauxApparition: 50},
]

var foret = [
    {id: 10, tauxApparition: 40},
    {id: 13, tauxApparition: 55},
    {id: 25, tauxApparition: 5},
]

var arenePierre = [
    {id: 74, tauxApparition: 50},
    {id: 95, tauxApparition: 50},
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