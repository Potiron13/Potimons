var WorldMapController = function (view, listEquipe, listReserve, listItem, listCarte, timeGame, listMonstresCapture) {
    this.view = view;
    this.listEquipe = listEquipe;
    this.listReserve = listReserve;
    this.listItem = listItem;
    this.listCarte = listCarte;
    this.timeGame = timeGame;
    this.listMonstresCapture = listMonstresCapture;
    this.mainMenuController = new MainMenuController(new MainMenuView(), this.listEquipe, this.listReserve, this.listItem);
    this.saveMenuController = new SaveMenuController(new SaveMenuView());
    this.combatController = new CombatController(new CombatView(), this.listEquipe, this.listReserve, this.listItem,
                            this.init.bind(this), this.listCarte, this.listMonstresCapture);
    this.potidexController = new PotidexController(new PotidexView(), this.listMonstresCapture);
};

WorldMapController.prototype = {

    init: function(listCarte, timeGame) {
        this.view.initialiserSaveMenu = this.saveMenuController;
        this.view.initialiserMainMenu = this.mainMenuController;
        this.view.initialiserPotidex = this.potidexController;
        this.view.displayPotidex = this.potidexController.displayPotidex.bind(this);
        this.view.displayMainMenu = this.mainMenuController.displayMainMenu.bind(this);
        this.view.displaySaveMenu = this.saveMenuController.displaySaveMenu.bind(this);
        this.view.render(listCarte);
        var controller = this;
        $.each(listCarte, function() {
            controller.mapCombatButton(this);
        });
        var controller = this;
        if (timeGame) {
            controller.view.renderTimeGame(timeGame);
            setInterval(function(){
                timeGame.setSeconds(timeGame.getSeconds() + 1);
                controller.view.renderTimeGame(timeGame);
            }, 1000)
        }
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
    },
}
