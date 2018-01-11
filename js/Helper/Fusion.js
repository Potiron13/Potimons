function fuseTwoMonsters() {
    var monsters = [];
    var monsterList =  monsterFusionList.filter(x=>x.level <= max(Fusion[0].level, Fusion[1].level));
    var sum = (monsterList.length + 1)*(monsterList.length/2);
    $.each(monsterList, function(index) {
        monsters.push(new MonsterFusion(monsterList[index], (monsterList.length - index)/sum))
    });
    var monsterFusionChoisi = monstreChoisi(monsters);
    var player = instancierPlayer(monsterFusionChoisi.name, entierAleatoire(monsterFusionChoisi.level, max(Fusion[0].level, Fusion[1].level) + 2), true);
    ReserveFusion.push(player);
    Reserve = ReserveFusion;
    Fusion = [];
    initialiserReserveMenu();
    initialiserFusionTwoMonstersMenu();
    initialiserFusionResultMenu(player);
    displayFusionResult();
    $('#btnFusionner').hide();
}

function monstreChoisi(monsters) {
  var i, sum=0, r=Math.random();
  for (i in monsters) {
    sum += monsters[i].chance;
    if (r <= sum) return monsters[i].monster;
  }
}
