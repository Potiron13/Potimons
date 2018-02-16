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
        if (!this.promptUserName()) {
            return;
        }
        var startingPotion = cloneItem(fetchItem('smallPotion'));
        startingPotion.quantity = 5;
        this.listItem.push(startingPotion);
        this.listEquipe.push(instancierPlayer(strPotiron, 3, true));
        this.listCarte.push(generateCarte(0));
        this.worldMapController.init(this.listCarte, this.timeGame, this.userName);
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
            }else if (this.dataType == strUserNameInfo) {
                SetUserName(this.data);
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
        socket.emit('go online', new User(controller.userId, GetUserName(), GetListEquipe()));
        socket.on('all users', function(allUsers){
                controller.worldMapController.listUser = allUsers;
                controller.worldMapController.onlineController.refreshDuelList(controller.worldMapController.listUser, controller.userId);
        });

        socket.on('duel query', function(data){
            controller.worldMapController.onlineController.view.renderDuelQueryChallenged(data.userChallenging);
            controller.worldMapController.onlineController.activateDuelBtn(data.userChallenging);
        });

        socket.on('update query', function(data){
            socket.emit('update team', {userId : controller.userId, equipe : GetListEquipe(), previousUserId : data})
        });

        socket.on('update complete', function(data){
            controller.worldMapController.onlineController.startDuel(data);
        });

        socket.on('start duel', function(data){
            var opponent = [data.userChallengingId, data.userChallengedId].find(x=>x.id != controller.userId);
            controller.worldMapController.combatController.initDuel(opponent, data.carte, data.listPlayer, data.room);
        });

        socket.on('action', function(data){
            console.log(data.attaqueResults);
            controller.worldMapController.combatController.attaque(data.attaqueResults, data.sourceId, data.skillId, controller.worldMapController.combatController);
        });

        socket.on('chat message', function(msg){
            $('#messageForm').append($('<li>').text(msg));
        });

    },


    promptUserName: function() {
        var userName = prompt("Please enter your potiname", "Potiron le vaillant");
        if (userName) {
            SetUserName(userName);
            return true;
        }

        return false;
    },
}
