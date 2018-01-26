var StartingScreenController = function (view, listEquipe, listReserve, listItem, listCarte) {
    this.view = view;
    this.listEquipe = listEquipe;
    this.listItem = listItem;
    this.listReserve = listReserve;
    this.listCarte = listCarte;
    this.worldMapController = new WorldMapController(new WorldMapView(), this.listEquipe, this.listReserve, this.listItem, this.listCarte);
};

StartingScreenController.prototype = {

    init: function() {
        this.view.newGame = this.newGame.bind(this);
        this.view.openLoadMenu = this.openLoadMenu.bind(this);
        this.view.loadGame = this.loadGame.bind(this);
        this.view.render(getSavesViewModels());
    },

    newGame: function() {
        var startingPotion = cloneItem(fetchItem('smallPotion'));
        startingPotion.quantity = 5;
        this.listItem.push(startingPotion);
        this.listEquipe.push(instancierPlayer(strPotiron, 1, true));
        this.listCarte.push(AllCartes[0]);
        this.worldMapController.init(this.listCarte);
    },

    openLoadMenu: function() {
        $('#loadGameModal').modal();
    },

    instanciatePlayerFromData: function(playerData) {
        var ids = [];
        $.each(playerData.data.skills, function(index){
            ids.push(playerData.data.skills[index].id)
        });
        var reformatedSkills = fetchSkills(ids);
        return new Player(playerData.data.id, playerData.data.name, playerData.data.level, playerData.data.experience,
             playerData.data.experienceNextLevel, playerData.data.currentHp, playerData.data.hp, playerData.data.currentMana, playerData.data.mana, playerData.data.force,
             playerData.data.magie, playerData.data.gentil, playerData.data.experienceDonnee, playerData.data.src,
             reformatedSkills, playerData.data.catClass, playerData.data.evolution, playerData.data.evolutionLevel);
    },

    instanciateItemFromData: function(itemData) {
        return new Item(itemData.data.id, itemData.data.name, itemData.data.usableInMenu, itemData.data.usableInCombat,
            itemData.data.quantity, fetchItemByName(itemData.data.name).effectInMenu, fetchItemByName(itemData.data.name).effectInCombat, itemData.data.category, itemData.data.amount);
    },

    instanciateCarteFromData: function(carteData) {
        return new Carte(carteData.data.id, carteData.data.nombreMaximumEnnemie, carteData.data.listNomEnnemiePossible, carteData.data.levelMin, carteData.data.levelMax, carteData.data.name);
    },

    loadGame: function(gameId) {
        var data = loadDataFromLocalStorage(gameId);
        var controller = this;        
        $.each(data, function(i){
            if (data[i].dataType == strPlayerInfo) {
                controller.listEquipe.push(controller.instanciatePlayerFromData(data[i]));
            }else if (data[i].dataType == strReserveInfo) {
                controller.listReserve.push(controller.instanciatePlayerFromData(data[i]));
            }else if (data[i].dataType == strItemInfo) {
                controller.listItem.push(controller.instanciateItemFromData(data[i]));
            }else if (data[i].dataType == strCarteInfo) {
                controller.listCarte.push(controller.instanciateCarteFromData(data[i]));
            }
        });
        this.worldMapController.init(this.listCarte);
    },

}
