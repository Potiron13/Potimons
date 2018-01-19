var CombatViewEquipeInfo = function (parent) {
    this.parent = parent;
}

CombatViewEquipeInfo.prototype = {
    displayEquipeInfo : function (viewModelInfoPlayer) {
        var colInfoEquipe = displayElementOnParent('div', 'colInfoEquipe', 'col-sm-4 combatInfo', '', this.parent);
        var labelRow = displayElementOnParent('div', 'labelRowInfo', 'row', '', colInfoEquipe);
        $.each(viewModelInfoPlayer, function(index) {
            var infoRow = displayElementOnParent('div', viewModelInfoPlayer[index].id + 'Info' + 'Row', 'row', '', colInfoEquipe);
            $.each(viewModelInfoPlayer[index], function(label, value) {
                if (label != 'id') {
                    if (index == 0) {
                        var labelCol = displayElementOnParent('div', label + 'Info', 'col-sm-6', label, labelRow);
                    }
                    var valueCol = displayElementOnParent('div', 'value'+ label + 'Info' + viewModelInfoPlayer[index].id, 'col-sm-6', value, infoRow);
                }
            });
        });
    }
}
