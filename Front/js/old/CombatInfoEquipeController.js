var CombatInfoEquipeController = function (players, view) {
    this.players = players;
    this.view = view;
};

CombatInfoEquipeController.prototype = {
    getEquipeInfoViewModel: function() {
        var result = [];
        for (var i = 0; i < this.players.length; i++) {
            result.push(new ViewModelInfoPlayer(this.players[i]));
        }

        return result;
    }
}
