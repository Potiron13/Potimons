var CombatViewSelector = function () {
}

CombatViewSelector.prototype = {
    deplacerSelectorEnnemie : function (ennemie) {
        $('#colonneSelector' + ennemie.id).attr('class', 'col-sm-12 selector')

        return ennemie;
    },


}
