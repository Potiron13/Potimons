var WorldMapController = function (view, listEquipe, listReserve, listItem, listCarte, timeGame, listMonstresCapture) {
    this.view = view;
    this.listEquipe = listEquipe;
    this.listReserve = listReserve;
    this.listItem = listItem;
    this.listCarte = listCarte;
    this.timeGame = timeGame;
    this.listMonstresCapture = listMonstresCapture;
    this.mainMenuController = new MainMenuController(new MainMenuView(), this.listEquipe, this.listReserve, this.listItem);    
    this.combatController = new CombatController(new CombatView(), this.listEquipe, this.listReserve, this.listItem,
                            this.init.bind(this), this.listCarte, this.listMonstresCapture);
    this.potidexController = new PotidexController(new PotidexView(), this.listMonstresCapture);
    this.onlineController = new OnlineController(new OnlineView(), this.listEquipe, this.combatController);
    this.profilController = new ProfilController(new ProfilView());
    this.shopController = new ShopController(new ShopView());
};

WorldMapController.prototype = {

    init: function(listCarte, timeGame) {
        this.view.sauvegarder = this.sauvegarder;
        this.view.initialiserMainMenu = this.mainMenuController;
        this.view.initialiserPotidex = this.potidexController;
        this.view.initialiserOnline = this.onlineController;
        this.view.initialiserProfil = this.profilController;        
        this.view.initialiserShop = this.shopController;    
        this.view.displayPotidex = this.potidexController.displayPotidex.bind(this.potidexController);
        this.view.displayMainMenu = this.mainMenuController.displayMainMenu.bind(this);        
        this.view.displayOnline = this.onlineController.displayOnline.bind(this);
        this.view.displayProfil = this.profilController.displayProfil.bind(this.profilController);
        this.view.displayShop = this.shopController.displayShop.bind(this);
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
        if (controller.combatController.userId) {
            var socket = io();
            var data = {
                userLeavingDuel: controller.combatController.userId,                
            }
            socket.emit('end duel', data);
        }
    },

    mapCombatButton(carte) {
        var combatController = this.combatController;
        var controller = this;
        $('#btnLauchCombat' + carte.id).on('click', function(){
            combatController.init(carte);
            combatController.online = false;
        });
    },

    sauvegarder: function(){
        var equipe = GetListEquipe();
        var reserve = GetListReserve();
        var controller = this;
        $.get("/api/saveAndLoad/deleteEquipe", {userId : GetUserId()})
        .then(function(){
            $.get("/api/saveAndLoad/deleteSkills", {userId : GetUserId()})
            .then(function(){
                $.each(equipe, function(index) {
                    var player = this;
                    $.get("/api/saveAndLoad/saveEquipe", 
                        {   
                            potimonId : player.baseId,
                            potimonGameId : player.id,
                            potimonLevel : player.level,
                            potimonCurrentHp : player.currentHp,
                            potimonCurrentMana : player.currentMana,
                            potimonExperience : player.experience,
                            userId : GetUserId(),
                        }
                    ).then(function(a) {

                    });
                    $.each(player.skills, function(index) {
                        var skill = this;
                        $.get("/api/saveAndLoad/saveSkills", 
                            {   
                                potimonGameId : player.id,
                                skillId : skill.id,                       
                                userId : GetUserId(),                
                            }
                        ).then(function(a) {
                
                        });
                    });                
                });
                $.get("/api/saveAndLoad/deleteReserve", {userId : GetUserId()})
                .then(function(){
                    $.each(reserve, function(index){
                        var player = this;
                        $.get("/api/saveAndLoad/saveReserve", 
                            {   
                                potimonId : player.baseId,
                                potimonGameId : player.id,
                                potimonLevel : player.level,
                                potimonCurrentHp : player.currentHp,
                                potimonCurrentMana : player.currentMana,
                                potimonExperience : player.experience,
                                userId : GetUserId(),                
                            }
                        ).then(function(a) {
            
                        });
                        $.each(player.skills, function(index) {
                            var skill = this;
                            $.get("/api/saveAndLoad/saveSkills", 
                                {   
                                    potimonGameId : player.id,
                                    skillId : skill.id,                       
                                    userId : GetUserId(),                
                                }
                            ).then(function(a) {
                    
                            });
                        }); 
                    }) 
                });
            });
            
        })                          
        $.get("/api/saveAndLoad/saveGameInfo", 
            {   
                gameTime: GetTimeGame().toTimeString().split(' ')[0],
                currentCarteId: GetCurrentCarteId(),
                userId : GetUserId(),   
                potiflouz : GetPotiflouz(),       
                potimonCapture : GetMonstresCapture().join(','),
            }
        ).then(function(a) {

        });
        $.get("/api/saveAndLoad/saveItem", 
            {       
                userId : GetUserId(),
                itemsName : GetItems().map(x=>x.name).join(),
                quantities : GetItems().map(x=>x.quantity).join(),
            }
        ).then(function(a) {

        });
    },

}
