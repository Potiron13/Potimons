var StartingScreenController = function (view, listEquipe, listReserve, listItem, listCarte, timeGame, listMonstresCapture, listUser) {
    this.view = view;
    this.listEquipe = listEquipe;
    this.listItem = listItem;
    this.listReserve = listReserve;
    this.listCarte = listCarte;
    this.timeGame = timeGame;
    this.listUser = listUser;
    this.userId;
    this.listMonstresCapture = listMonstresCapture;
    this.worldMapController = new WorldMapController(new WorldMapView(), this.listEquipe, this.listReserve, this.listItem, this.listCarte, this.timeGame, this.listMonstresCapture);
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
        this.listEquipe.push(instancierPlayer(strPotiron, 3, true));
        this.listCarte.push(generateCarte(0));
        this.worldMapController.init(this.listCarte, this.timeGame, this.listMonstresCapture);
        this.goOnline();
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
             playerData.data.magie, playerData.data.gentil, playerData.data.experienceDonnee, reformatedSkills,
             playerData.data.catClass, playerData.data.evolution, playerData.data.evolutionLevel);
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
            if (this.dataType == strPlayerInfo) {
                controller.listEquipe.push(controller.instanciatePlayerFromData(this));
            }else if (this.dataType == strReserveInfo) {
                controller.listReserve.push(controller.instanciatePlayerFromData(this));
            }else if (this.dataType == strItemInfo) {
                controller.listItem.push(controller.instanciateItemFromData(this));
            }else if (this.dataType == strCarteInfo) {
                controller.listCarte.push(controller.instanciateCarteFromData(this));
            }else if (this.dataType == strMonsterInfo) {
                controller.listMonstresCapture.push(this.data);
            }else if (this.dataType == strTimeGameInfo) {
                var temp = new Date(Date.parse(this.data));
                controller.timeGame.setSeconds(temp.getSeconds());
                controller.timeGame.setMinutes(temp.getMinutes());
                controller.timeGame.setHours(temp.getHours());
            }
        });
        this.worldMapController.init(this.listCarte, this.timeGame);
        this.goOnline();
    },

    goOnline: function() {
        var socket = io();
        this.worldMapController.onlineController.socket = socket;
        this.userId = guidGenerator();
        this.worldMapController.onlineController.userId = this.userId;
        this.worldMapController.combatController.userId = this.userId;
        var controller = this;
        socket.emit('go online', new User(controller.userId, controller.userId, controller.listEquipe));
        socket.on('go online', function(user){
            if (!controller.listUser.find(x=>x.id == user.id)) {
                socket.emit('go online', new User(controller.userId, controller.userId, controller.listEquipe));
                controller.listUser.push(user);
                controller.worldMapController.onlineController.init(controller.listUser, controller.userId);
            }
        });
        socket.on('start duel', function(data){
            if (controller.userId != data.userChallenging.id) {
                controller.worldMapController.combatController.initDuel(data.userChallenging, data.carte, data.listPlayer);
            }
        });

        socket.on('action', function(data){
            if (controller.userId != data.userId) {
                // la socket ne transporte pas de fonction donc on va chercher le skill
                var skill = fetchSkill(data.skill.id);
                data.source.gentil = false;
                $.each(data.listCible, function(index){
                    this.gentil = true;
                });
                controller.worldMapController.combatController.animateAttaque(data.source, data.listCible, skill, controller.worldMapController.combatController);
            }
        })

    }
}
