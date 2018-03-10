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
        this.view.newUser = this.newUser.bind(this);
        this.view.logIn = this.logIn.bind(this);
        this.view.render(); 
        getAllElementTypeEfficacy();
    },

    newGame: function() {
        var controller = this;
        var startingPotion = cloneItem(fetchItem('smallPotion'));
        startingPotion.quantity = 5;
        var startingPotiball = cloneItem(fetchItem(strPotiball));
        startingPotiball.quantity = 5;
        this.listItem.push(startingPotion);
        this.listItem.push(startingPotiball);
        instancierInGamePotimon(7, 2, true).then(function(potimon){
            controller.listEquipe.push(potimon);
            controller.listCarte.push(AllCartes[0]);
            controller.worldMapController.init(controller.listCarte, controller.timeGame, controller.userName);
            controller.goOnline();
        });        
    },

    loadGame: function() {
        var controller = this;
        const userId = GetUserId();
        $.when(            
            $.get("/api/saveAndLoad/loadEquipe", {userId: userId}),   
            $.get("/api/saveAndLoad/loadGameInfo", {userId: userId}),
            $.get("api/saveAndLoad/loadItem", {userId: userId})       
        ).then(function(a, b, c){
            var equipeAjaxResult = a[0][0];
            var gameInfoAjaxResult = b[0][0];
            var itemAjaxResult = c[0][0];   
            if(equipeAjaxResult) {
                var potimonsId = equipeAjaxResult.potimons_id.split(',');
                var potimonsLevels = equipeAjaxResult.potimons_level.split(',');
                var potimonsCurrentHp = equipeAjaxResult.potimons_current_hp.split(',');
                var potimonsCurrentMana = equipeAjaxResult.potimons_current_mana.split(',');
                var potimonsExperience = equipeAjaxResult.potimons_experience.split(',');
                var currentCarteId = gameInfoAjaxResult.current_carte_id;
                var timeGameSplit = gameInfoAjaxResult.game_time.split(':');
                var potiflouz = gameInfoAjaxResult.potiflouz;
                var timeGameDate = new Date();
                timeGameDate.setHours(timeGameSplit[0]);
                timeGameDate.setMinutes(timeGameSplit[1]);
                timeGameDate.setSeconds(timeGameSplit[2]);
                controller.timeGame = timeGameDate;
                SetTimeGame(timeGameDate);
                SetPotiflouz(potiflouz);
                var itemsName = itemAjaxResult.items_name.split(',');
                var quantities = itemAjaxResult.quantities.split(',');
                for (let j = 0; j < itemsName.length; j++) {
                    var item = cloneItem(fetchItemByName(itemsName[j]));
                    item.quantity = quantities[j];
                    Items.push(item);
                }
                for (let index = 0; index < potimonsId.length; index++) {
                    instancierInGamePotimon(potimonsId[index], parseInt(potimonsLevels[index]), true).then(function(potimon){
                        potimon.currentHp = parseInt(potimonsCurrentHp[index]);
                        potimon.currentMana = parseInt(potimonsCurrentMana[index]);
                        potimon.experience = parseInt(potimonsExperience[index]);
                        controller.listEquipe.push(potimon);                    
                        if(index >= potimonsId.length - 1) {                        
                            for (let i = 0; i < currentCarteId + 1; i++) {   
                                controller.listCarte.push(AllCartes[i])
                                SetCurrentCarteId(currentCarteId);                 
                            }
                            controller.getListReserve(controller);
                            controller.worldMapController.init(controller.listCarte, controller.timeGame, controller.userName);
                            controller.goOnline();
                        }       
                    });
                }
            }else {
                controller.newGame();
            }
        });       
        
    },

    newUser: function(){
        var idModal = 'modalNewUser';						
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var modalBody = createModal(idModal, 'New User');			        		
        var inputList = [
                            { label : 'Pseudo', id: 'newUserPseudoId', type: 'text'},
                            { label : 'Email', id: 'newUserEmailId', type: 'email'},
                            { label : 'Password', id: 'newUserPasswordId', type: 'password'},
                        ];											
        var form = createForm('NewUserForm', inputList, modalBody);
        var btnSubmit = displayElementOnParent('button', 'btnSubmitNewUser', 'btn btn-default', 'Soumettre', modalBody);
        btnSubmit.click(function(){       
            $.get('/api/users/insertUser', {
                userName: $('#' + inputList[0].id).val(),
                email: $('#' + inputList[1].id).val(),
                password: $('#' + inputList[2].id).val(),
            })
            $('#' + idModal).modal('hide');									
        });						
        $('#' + idModal).modal();
    },

    logIn: function(){
        var controller = this;
        var idModal = 'modalLogIn';						
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var modalBody = createModal(idModal, 'Log In');			        		
        var inputList = [
                            { label : 'Pseudo', id: 'logInPseudoId', type: 'text'},                            
                            { label : 'Password', id: 'logInPasswordId', type: 'password'},
                        ];											
        var form = createForm('LogInForm', inputList, modalBody);
        var btnSubmit = displayElementOnParent('button', 'btnSubmitLogIn', 'btn btn-default', 'Soumettre', modalBody);
        btnSubmit.click(function(){       
            $.get('/api/users/selectUser', {
                userName: $('#' + inputList[0].id).val(),                
                password: $('#' + inputList[1].id).val(),
            }).then(function(a){
                if(a[0]) {
                    if(a[0].user_id) {                        
                        SetUserId(a[0].user_id);
                        SetUserName($('#' + inputList[0].id).val());
                        controller.loadGame();                  
                    }              
                }            
            })
            $('#' + idModal).modal('hide');		
        });						
        $('#' + idModal).modal();
    },

    getListReserve: function(controller){
        $.when(
            $.get("/api/saveAndLoad/loadReserve", {userId: GetUserId()})                        
        ).then(function(a){        
            var potimonsId = a[0].potimons_id.split(',');
            var potimonsLevels = a[0].potimons_level.split(',');
            var potimonsCurrentHp = a[0].potimons_current_hp.split(',');
            var potimonsCurrentMana = a[0].potimons_current_mana.split(',');
            var potimonsExperience = a[0].potimons_experience.split(',');            
            for (let index = 0; index < potimonsId.length; index++) {
                if(potimonsId[index]) {
                    instancierInGamePotimon(potimonsId[index], parseInt(potimonsLevels[index]), true).then(function(potimon){
                        potimon.currentHp = parseInt(potimonsCurrentHp[index]);
                        potimon.currentMana = parseInt(potimonsCurrentMana[index]);
                        potimon.experience = parseInt(potimonsExperience[index]);
                        controller.listReserve.push(potimon);                    
                        if(index >= potimonsId.length - 1) {                        
                            controller.worldMapController.mainMenuController.init();                        
                        }
                    });
                }                
            }
        })
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
            controller.worldMapController.combatController.attaque(data.attaqueResults, data.sourceId, data.skillId, controller.worldMapController.combatController);
        });

        socket.on('chat message', function(msg){
            $('#messageContainer').append($('<li>').text(msg));
        });

    },
}
