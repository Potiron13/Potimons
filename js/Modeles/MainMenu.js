class MainMenuViewModel {
    constructor(player) {
        this.id = player.id
        this.Nom = player.name;
        this.Niveau = player.level;
        this.Hp = player.hp;
        this.CurrentHp = player.currentHp;
    }
}

function mapMainMenuViewModel (Equipe) {
    var result = [];
    $.each(Equipe, function(index) {
        result.push(new MainMenuViewModel(Equipe[index]))
    });

    return result;
}
