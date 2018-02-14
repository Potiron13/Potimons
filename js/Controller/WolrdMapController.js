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
    this.onlineController = new OnlineController(new OnlineView(), this.listEquipe, this.combatController);
    this.profilController = new ProfilController(new ProfilView());
};

WorldMapController.prototype = {

    init: function(listCarte, timeGame) {
        this.view.initialiserSaveMenu = this.saveMenuController;
        this.view.initialiserMainMenu = this.mainMenuController;
        this.view.initialiserPotidex = this.potidexController;
        this.view.initialiserOnline = this.onlineController;
        this.view.initialiserProfil = this.profilController;
        this.view.displayPotidex = this.potidexController.displayPotidex.bind(this);
        this.view.displayMainMenu = this.mainMenuController.displayMainMenu.bind(this);
        this.view.displaySaveMenu = this.saveMenuController.displaySaveMenu.bind(this);
        this.view.displayOnline = this.onlineController.displayOnline.bind(this);
        this.view.displayProfil = this.profilController.displayProfil.bind(this);
        this.view.render(listCarte, GetUserName());
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
            combatController.init(carte);
            combatController.online = false;
            combatController.combat();
        });
    },
}
