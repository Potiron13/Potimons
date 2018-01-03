class ViewModelInfoEnnemie {
    constructor (ennemie, index) {
        this.Nom = ennemie.name + index;
        this.Hp = ennemie.currentHp + '/' + ennemie.hp;
    }
}

function instancierEnnemie(nomEnnemie, i, level) {
    result = {};
    var griffe = new Skill('griffe', 'griffe', 1, 'corpsACorps', 500);
    var fireBall = new Skill('fireBall', 'fireBall', 2, 'magie', 1000, 100);
    var srcImgEnnemie = 'Images/' + nomEnnemie + '.png'
    var experienceNextLevel = level*10;
    var experience = 0;
    var hp;
    var force;
    var magie;
    var gentil = false;
    var experienceDonnee;
    var skills = [];
    switch (nomEnnemie) {
        case 'Rat':
            hp = 10 + 2*level;
            force = 2 + level;
            magie = 1 + level;
            experienceDonnee = 3 + level;
            skills = [{ 'skill' : griffe, 'chance' : 1}];
            break;
        case 'Potipuce':
            hp = 20 + level*2;
            force = 4 + level;
            magie = 6 + level*2;
            experienceDonnee = 6 + level*2;
            skills = [{ 'skill' : griffe, 'chance' : 0.7}, { 'skill' : fireBall, 'chance' : 0.3}];
            break;
        default:
        console.log('cant find in list listNomEnnemie mth instancierEnnemie');
    }
    result = new Player(nomEnnemie + guidGenerator(), nomEnnemie, level, experience, experienceNextLevel, hp, hp, force, magie, gentil, experienceDonnee, srcImgEnnemie, skills);

    return result;
}

function skillChoisi(skills) {
  var i, sum=0, r=Math.random();
  for (i in skills) {
    sum += skills[i].chance;
    if (r <= sum) return skills[i].skill;
  }
}
