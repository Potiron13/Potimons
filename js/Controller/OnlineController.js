var OnlineController = function (view, listEquipe, controllerCombat) {
    this.view = view;
    this.listEquipe = listEquipe;
    this.controllerCombat = controllerCombat;
    this.userId;
    this.listUser;
};

OnlineController.prototype = {

    init: function(listUser, userId) {
        this.listUser = listUser;
        this.view.render(listUser, userId, this.startDuel.bind(this));
        this.handleChat();
    },

    refreshDuelList: function(listUser, userId) {
        this.listUser = listUser;
        this.view.renderDuelList(listUser, userId, this.startDuel.bind(this));
    },

    displayOnline: function() {
        $('#' + 'onlineModal').modal();
    },

    startDuel: function(user) {
        var controller = this;
        var carte = generateCarteOnline();
        var userChallenging = this.listUser.find(x=>x.id === this.userId)
        var data = {userChallenging : userChallenging, userChallenged : user, carte: carte}
        var listPlayer = [];
        var socket = io();
        socket.emit('start duel', data);
        socket.on('start duel', function(data){
            controller.controllerCombat.initDuel(user, carte, data.listPlayer);
        });
    },

    handleChat: function(){
        var socket = io();
        $('#messageForm').submit(function(){
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        });
    },

}
