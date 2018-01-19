var CombatViewEnnemieInfo = function (parent) {
    this.parent = parent;
}

CombatViewEnnemieInfo.prototype = {
    displayEnnemieInfo : function (viewModelInfoEnnemie) {
        var colInfoEnnemie = displayElementOnParent('div', 'colEnnemieInfo', 'col-sm-4 combatInfo', '', this.parent);
        var labelRow = displayElementOnParent('div', 'labelRowEnnemieInfo', 'row', '', colInfoEnnemie);
        $.each(viewModelInfoEnnemie, function(index) {
            var infoRow = displayElementOnParent('div', viewModelInfoEnnemie[index].id + 'Info' + 'Row', 'row', '', colInfoEnnemie);
            $.each(viewModelInfoEnnemie[index], function(label, value) {
                if (label != 'id') {
                    if (index == 0) {
                        var labelCol = displayElementOnParent('div', label + 'Info', 'col-sm-6', label, labelRow);
                    }
                    var valueCol = displayElementOnParent('div', 'value'+ label + 'Info' + viewModelInfoEnnemie[index].id, 'col-sm-6', value, infoRow);
                }
            })
        })
    }
}
