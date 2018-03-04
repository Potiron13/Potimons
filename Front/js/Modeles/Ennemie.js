class ViewModelInfoEnnemie {
    constructor (ennemie) {
        this.id = ennemie.id
        this.Nom = ennemie.name;
        this.Hp = ennemie.hp;
        this.CurrentHp = ennemie.currentHp;
        this.Mana = ennemie.mana;
        this.CurrentMana = ennemie.currentMana;
        this.Niv = ennemie.level;
    }
}

function skillChoisi(skills) {
    var ennemieSkills = [];
    var sum = (skills.length + 1)*(skills.length/2);
    $.each(skills, function(index) {
        ennemieSkills.push(new EnnemieSkill(skills[index].id, (skills.length - index)/sum))
    });
    var i, sum=0, r=Math.random();
    for (i in ennemieSkills) {
        sum += ennemieSkills[i].chance;
        if (r <= sum) return ennemieSkills[i].skill;
    }
}
