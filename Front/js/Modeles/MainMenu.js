class MainMenuViewModel {
    constructor (potimon) {
        this.id = potimon.id;
        this.Nom = potimon.name;
        this.Niveau = potimon.level;
        this.Hp = potimon.hp;
        this.CurrentHp = potimon.currentHp;
        this.Mana = potimon.mana;
        this.CurrentMana = potimon.currentMana;
    }
}
