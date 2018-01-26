var WorldMapController = function (view, listEquipe, listReserve, listItem, listCarte) {
    this.view = view;
    this.listEquipe = listEquipe;
    this.listReserve = listReserve;
    this.listItem = listItem;
    this.listCarte = listCarte;
    this.mainMenuController = new MainMenuController(new MainMenuView(), this.listEquipe, this.listReserve, this.listItem);
    this.saveMenuController = new SaveMenuController(new SaveMenuView());
    this.combatController = new CombatController(new CombatView(), this.listEquipe, this.listReserve, this.listItem, this.init.bind(this), this.listCarte);
    this.deplacementSouris_timeout;
    this.compteur;
};

WorldMapController.prototype = {

    init: function(listCarte) {
        this.view.initialiserSaveMenu = this.saveMenuController;
        this.view.initialiserMainMenu = this.mainMenuController;
        this.view.displayMainMenu = this.mainMenuController.displayMainMenu.bind(this);
        this.view.displaySaveMenu = this.saveMenuController.displaySaveMenu.bind(this);
        this.view.render(listCarte);
        var controller = this;
        $.each(listCarte, function() {
            controller.mapCombatButton(this);
        });
    },

    mapCombatButton(carte) {
        var combatController = this.combatController;
        var controller = this;
        $('#btnLauchCombat' + carte.id).on('click', function(){
            $.each($('body').children(), function(index, child){
                child.remove();
            });
            combatController.init(carte);
            combatController.combat();
        });
        $('#btnLauchCombat' + carte.id).show();

    },
}
