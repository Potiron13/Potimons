var WorldMapController = function (view, listReserve, listItem, listCarte, timeGame, listMonstresCapture, Deconnection) {
    this.view = view;    
    this.listReserve = listReserve;
    this.listItem = listItem;
    this.listCarte = listCarte;
    this.timeGame = timeGame;
    this.listMonstresCapture = listMonstresCapture;
    this.mainMenuController = new MainMenuController(new MainMenuView(), this.listReserve, this.listItem);
    this.combatController = new CombatController(new CombatView(), this.listReserve, this.listItem,
        this.init.bind(this), this.listCarte, this.listMonstresCapture);
    this.potidexController = new PotidexController(new PotidexView(), this.listMonstresCapture);
    this.onlineController = new OnlineController(new OnlineView(), this.combatController);
    this.profilController = new ProfilController(new ProfilView());
    this.shopController = new ShopController(new ShopView());
    this.saveMenuController = new SaveMenuController(new SaveMenuView());    
    this.deconnectionMenuController = new DeconnectionMenuController(new DeconnectionMenuView());
};

WorldMapController.prototype = {

    init: function (listCarte, timeGame) {        
        this.view.initialiserMainMenu = this.mainMenuController;
        this.view.initialiserPotidex = this.potidexController;
        this.view.initialiserOnline = this.onlineController;
        this.view.initialiserProfil = this.profilController;
        this.view.initialiserShop = this.shopController;
        this.view.initialiserSaveMenu = this.saveMenuController;
        this.view.initialiserDeconnectionMenu = this.deconnectionMenuController.init.bind(this.deconnectionMenuController);
        this.view.displayPotidex = this.potidexController.displayPotidex.bind(this.potidexController);
        this.view.displayMainMenu = this.mainMenuController.displayMainMenu.bind(this);
        this.view.displayOnline = this.onlineController.displayOnline.bind(this);
        this.view.displayProfil = this.profilController.displayProfil.bind(this.profilController);
        this.view.displayShop = this.shopController.displayShop.bind(this);
        this.view.displaySaveMenu = this.saveMenuController.displaySaveMenu.bind(this.saveMenuController);        
        this.view.displayDeconnectionMenu = this.deconnectionMenuController.displayDeconnectionMenu.bind(this.deconnectionMenuController);        
        this.handleArene(listCarte);
        this.view.render(listCarte);
        var controller = this;
        $.each(listCarte, function () {
            controller.mapCombatButton(this);
        });
        var controller = this;
        if (timeGame) {
            controller.view.renderTimeGame(timeGame);
            setInterval(function () {
                timeGame.setSeconds(timeGame.getSeconds() + 1);
                controller.view.renderTimeGame(timeGame);
            }, 1000)
        }
        if (controller.combatController.userId) {
            var socket = io();
            var data = {
                userLeavingDuel: controller.combatController.userId,
            }
            socket.emit('end duel', data);
        }
    },

    handleArene: function(listCarte) {
        for (let index = 0; index < listCarte.length; index++) {
            var carte = listCarte[index];
            if (index < listCarte.length -1) {                            
                if (carte.arene === true) {
                    remove(listCarte, carte);
                }
            }
        }
    },

    mapCombatButton: function(carte) {
        var combatController = this.combatController;
        var controller = this;
        $('#btnLauchCombat' + carte.id).on('click', function () {
            combatController.init(carte);
            combatController.online = false;
        });
    },    

}
