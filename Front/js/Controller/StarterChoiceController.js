var StarterChoiceController = function (view) {
    this.view = view;
    this.mainMenuController = new MainMenuController(new MainMenuView(), null, null, null);  
};

StarterChoiceController.prototype = {
    init: function(newGameInit) {
        var starters = [];
        var requests = [];
        var controller = this;
        var mainMenuController = this.mainMenuController;
        var startersData = [
            {id : 1, level : 2},
            {id : 4, level : 2},
            {id : 7, level : 2},
        ];
        for (let i = 0; i < startersData.length; i++) {
            requests.push(getPotimonById(startersData[i].id));                                   
        }        
        $.when.apply($, requests).done(function () {                    
            $.each(arguments, function (i, data) {
                var inGamePotimon = {};
                var basePotimon = mapBasePotimon(data);                
                inGamePotimon = new Potimon(basePotimon, startersData[i].level, 0, 0, 0, false, [], null);        
                inGamePotimon.currentHp = inGamePotimon.hp;
                inGamePotimon.currentMana = inGamePotimon.mana;
                inGamePotimon.gentil = true;
                inGamePotimon.id = guidGenerator();    
                setSkillsByLevel(inGamePotimon, basePotimon);
                starters.push(inGamePotimon);
            });
            controller.view.render(starters, controller.mainMenuController, newGameInit);
            $.each(starters, function(index) {
                mainMenuController.view.renderPlayerSkillMenu(mainMenuController.getSkillMenuViewModel(this), this.id);
                mainMenuController.view.renderPlayerDetailMenu(mainMenuController.getDetailMenuViewModel(this));
            });
        });        
    },
}
