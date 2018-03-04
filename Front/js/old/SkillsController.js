var SkillsController = function (listEquipe) {
    this.listEquipe = listEquipe;
};

SkillsController.prototype = {
    displaySkillsButtons : function() {
        $.each(skills, function( index, skill ) {
            displayButtons( 'btn' + skill.id, skill.name, (skill.type == "magie") ? "col-sm-3 btn btn-danger btnCombat" : "col-sm-3 btn btn-success btnCombat",
            function() {
                $("#buttonRow" + player.id).hide();
                attaque(player, null, skill);
            }, parent);
        });
    },
}
