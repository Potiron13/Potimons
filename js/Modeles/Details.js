class ViewModelDetails {
    constructor (player) {
        this.id = player.id;
        this.Nom = player.name;
        this.Niveau = player.level;
        this.Hp = player.hp;
        this.curHp = player.currentHp;
        this.curMana = player.currentMana;
        this.Mana = player.mana;
        this.Force = player.force;
        this.Magie = player.magie;
        this.Exp = player.experience;
        this.ExpNext = player.experienceNextLevel;
        this.catClass = player.catClass;
        this.src = player.src;
    }
}
