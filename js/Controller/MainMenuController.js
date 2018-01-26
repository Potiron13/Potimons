var MainMenuController = function (view, listEquipe, listReserve, listItem) {
    this.view = view;
    this.listEquipe = listEquipe;
    this.listReserve = listReserve;
    this.listFusion = [];
    this.listItem = listItem;
};

MainMenuController.prototype = {

    init: function() {
        var controllerMainMenu = this;
        this.view.controller = this;
        this.view.displaySkills = this.displaySkills;
        this.view.displayDetails = this.displayDetails;
        this.view.displayReserve = this.displayReserve;
        this.view.displayItems = this.displayItems;
        this.view.displayFusion = this.displayFusion.bind(this);
        this.view.dropOnRow = this.dropOnRow.bind(this);
        this.view.fuseTwoMonsters = this.fuseTwoMonsters.bind(this);
        this.view.render(this.getMainMenuViewModel());
        this.view.renderItemMenu(this.getItemMenuViewModel(), this.getPotionMenuViewModel());
        this.view.renderFusionMenu(this.getReserveViewModel(this.listReserve));
        $.each(this.listEquipe, function(index) {
            controllerMainMenu.view.renderPlayerSkillMenu(controllerMainMenu.getSkillMenuViewModel(this), this.id);
            controllerMainMenu.view.renderPlayerDetailMenu(controllerMainMenu.getDetailMenuViewModel(this));
        });
        this.view.renderReserveMenu(this.getReserveViewModel(this.listEquipe), this.getReserveViewModel(this.listReserve));
    },

    getMainMenuViewModel: function() {
        var result = [];
        $.each(this.listEquipe, function(index) {
            result.push(new MainMenuViewModel(this))
        });

        return result;
    },

    getItemMenuViewModel: function() {
        var result = [];
        $.each(this.listItem, function(index) {
            result.push(new ViewModelItem(this))
        });

        return result;
    },

    getSkillMenuViewModel : function(player) {
        var result = [];
        $.each(player.skills, function(index) {
            result.push(new ViewModelSkill(this))
        });

        return result;
    },

    getDetailMenuViewModel : function(player) {
        return new ViewModelDetails(player);
    },

    getReserveViewModel : function(listPlayer){
        var result = [];
        $.each(listPlayer, function(index) {
            result.push(new ViewModelReserve(this))
        });

        return result;
    },

    getFusionResultViewModel : function (player) {
        return new FusionViewModel(player);
    },

    getPotionMenuViewModel : function() {
        var result = [];
        $.each(this.listEquipe, function(index) {
            result.push(new MainMenuViewModel(this))
        });

        return result;
    },

    displayMainMenu: function() {
        $('#' + strModalMenuStats).modal();
    },

    displayItems: function() {
        $('#' + strModalMenuItems).modal();
    },

    displaySkills : function (id) {
        $('#modalSkills' + id).modal();
    },

    displayDetails: function (id) {
        $('#modalDetails' + id).modal();
    },

    displayFusion : function(){
        this.listFusion = [];
        var controller = this;
        this.view.renderFusionMenu(this.getReserveViewModel(this.listReserve));
        $('#' + strModalMenuFusionTwoMonster).modal();
        $('#' + strModalMenuFusionTwoMonster).on('hidden.bs.modal', function () {
            Array.prototype.push.apply(controller.listReserve, controller.listFusion)
            controller.listFusion = [];
        });
    },

    displayReserve : function(){
        $('#modalMenuReserve').modal();
    },

    displayFusionResult: function(){
        $('#' + strModalMenuResultFusion).modal();
    },

    dropOnRow : function(draggedElement, targetedElement, targetList, mainList, playerIdSufix) {
        var listSource;
        if (targetList == 'Equipe') {
            targetList = this.listEquipe;
            mainList = this.listReserve;
        }else if (targetList == 'Reserve') {
            targetList = this.listReserve;
            mainList = this.listEquipe;
        }else if (targetList == 'Fusion') {
            targetList = this.listFusion;
            mainList = this.listReserve;
        }else {
            targetList = this.listReserve;
            mainList = this.listFusion;
        }
        var playerId = draggedElement.id.replace(playerIdSufix, '');
        draggedElement.style = '';
        targetedElement.appendChild(draggedElement);
        if (mainList.find(x=>x.id == playerId)) {
            listSource = mainList;
        }else {
            listSource = targetList;
        }
        targetList.push(listSource.find(x=>x.id == playerId));
        if (listSource.length) {
            remove(listSource, listSource.find(x=>x.id == playerId));
        }
        if (this.listFusion.length == 2) {
            $('#btnFusionner').show();
        }else {
            $('#btnFusionner').hide();
        }
        this.view.render(this.getMainMenuViewModel());
        var controllerMainMenu = this;
        $.each(this.listEquipe, function(index) {
            controllerMainMenu.view.renderPlayerSkillMenu(controllerMainMenu.getSkillMenuViewModel(this), this.id);
            controllerMainMenu.view.renderPlayerDetailMenu(controllerMainMenu.getDetailMenuViewModel(this));
        });
    },

    fuseTwoMonsters: function() {
        var monsters = [];
        var monsterList =  monsterFusionList.filter(x=>x.level <= max(this.listFusion[0].level, this.listFusion[1].level));
        var sum = (monsterList.length + 1)*(monsterList.length/2);
        $.each(monsterList, function(index) {
            monsters.push(new MonsterFusion(monsterList[index], (monsterList.length - index)/sum))
        });
        var monsterFusionChoisi = this.monstreChoisi(monsters);
        var player = instancierPlayer(monsterFusionChoisi.name, entierAleatoire(monsterFusionChoisi.level, max(this.listFusion[0].level, this.listFusion[1].level) + 2), true);
        this.listReserve.push(player);
        this.listFusion = [];
        this.view.renderReserveMenu(this.getReserveViewModel(this.listEquipe), this.getReserveViewModel(this.listReserve));
        this.view.renderFusionMenu(this.getReserveViewModel(this.listReserve));
        this.view.renderFusionResultMenu(this.getFusionResultViewModel(player));

        this.displayFusionResult();
        $('#' + strBtnFusionner).hide();
    },

    monstreChoisi : function(monsters) {
      var i, sum=0, r=Math.random();
      for (i in monsters) {
        sum += monsters[i].chance;
        if (r <= sum) return monsters[i].monster;
      }
  },

}
