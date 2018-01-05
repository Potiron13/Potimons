class ViewModelInfoEnnemie {
    constructor (ennemie, index) {
        this.Nom = ennemie.name + index;
        this.Hp = ennemie.currentHp + '/' + ennemie.hp;
    }
}

function skillChoisi(skills) {
  var i, sum=0, r=Math.random();
  for (i in skills) {
    sum += skills[i].chance;
    if (r <= sum) return skills[i].skill;
  }
}
