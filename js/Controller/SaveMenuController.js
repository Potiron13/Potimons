var SaveMenuController = function (view) {
    this.view = view;
};

SaveMenuController.prototype = {

    init: function() {
        this.view.sauvegarder = this.sauvegarder.bind(this);
        this.view.render(getSavesViewModels());
    },

    sauvegarder : function (saveId) {
        var gameData = [];
        $.each(Equipe, function(index) {
            gameData.push({'dataType' : 'playerInfo', 'data' : Equipe[index]});
        });
        $.each(Reserve, function(index) {
            gameData.push({'dataType' : 'reserveInfo', 'data' : Reserve[index]});
        });
        $.each(Items, function(index) {
            gameData.push({'dataType' : 'itemInfo', 'data' : Items[index]});
        });
        $.each(Cartes, function(index) {
            gameData.push({'dataType' : 'carteInfo', 'data' : Cartes[index]});
        });
        $.each(MonstresCapture, function(index) {
            gameData.push({'dataType' : 'monsterInfo', 'data' : MonstresCapture[index]});
        });
        gameData.push({'dataType' : 'timeGameInfo', 'data' : TimeGame.toString()});
        gameData.push({'dataType' : 'gameInfo', 'data' : (new Date()).toLocaleString()});
        gameData.push({'dataType' : 'saveId', 'data' : saveId});
        localStorage.setItem(saveId, JSON.stringify(gameData));
        this.view.render(getSavesViewModels());

        return saveId
    },

    displaySaveMenu : function() {
        $('#' + strModalMenuSave).modal();
        $('body').off();
    },

}
