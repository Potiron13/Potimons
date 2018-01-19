var CombatInfoEnnemiController = function (ennemies, view) {
    this.ennemies = ennemies;
    this.view = view;
};

CombatInfoEnnemiController.prototype = {
    getEnnemiInfoViewModel: function() {
        var result = [];
        for (var i = 0; i < this.ennemies.length; i++) {            
            result.push(new ViewModelInfoEnnemie(this.ennemies[i]));
        }

        return result;
    }
}
