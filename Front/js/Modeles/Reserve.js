class ViewModelReserve {
    constructor (player) {
        this.id = player.id;
        this.Nom = player.name;
        this.Niveau = player.level;
    }
}

function mapReserveViewModel(listPlayer) {
    var result = [];
    $.each(listPlayer, function(index) {
        result.push(new ViewModelReserve(listPlayer[index]))
    });

    return result;
}
