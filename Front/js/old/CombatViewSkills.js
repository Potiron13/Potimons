var CombatViewSkills = function (listEquipe, parent, ennemieSelected) {
    this.listEquipe = listEquipe;
    this.parent = parent;
    this.ennemieSelected = ennemieSelected;
}

CombatViewSkills.prototype = {
    displayBtnSkills : function () {
        var equipeBtnRow = displayElementOnParent('div', 'equipeBtnRow', "row", "", this.parent);
        var equipe = this.listEquipe;
        var target = this.ennemieSelected;
        $.each(equipe, function(i){
            var btnRow = displayElementOnParent('div', "buttonRow" + equipe[i].id, "row", "", equipeBtnRow);
            $.each(equipe[i].skills, function( label, skill ) {
                displayButtons( 'btn' + skill.id, skill.name, (skill.type == "magie") ? "col-sm-3 btn btn-danger btnCombat" : "col-sm-3 btn btn-success btnCombat",
                function() {
                    $("#buttonRow" + equipe[i].id).hide();
                    attaque(equipe[i], target, skill);
                }, btnRow);
            });
            btnRow.hide();
        });
    },
}
