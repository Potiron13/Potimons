class ViewModelReserve {
    constructor (player) {
        this.id = player.id;
        this.Nom = player.name;
        this.Niveau = player.level;
        this.HpMax = player.hp;
    }
}

function mapReserveViewModel(listPlayer) {
    var result = [];
    $.each(listPlayer, function(index) {
        result.push(new ViewModelReserve(listPlayer[index]))
    });

    return result;
}
