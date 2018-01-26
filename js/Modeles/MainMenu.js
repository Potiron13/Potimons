class MainMenuViewModel {
    constructor(player) {
        this.id = player.id
        this.Nom = player.name;
        this.Niveau = player.level;
        this.Hp = player.hp;
        this.CurrentHp = player.currentHp;
        this.Mana = player.mana;
        this.CurrentMana = player.currentMana;
    }
}
