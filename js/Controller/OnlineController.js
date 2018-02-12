var OnlineController = function (view, listEquipe, controllerCombat, socket) {
    this.view = view;
    this.listEquipe = listEquipe;
    this.controllerCombat = controllerCombat;
    this.userId;
    this.socket = socket;
    this.listUser;
};

OnlineController.prototype = {

    init: function(listUser, userId) {
        this.listUser = listUser;
        this.view.render(listUser, userId, this.startDuel.bind(this));
    },

    displayOnline: function() {
        $('#' + 'onlineModal').modal();
    },

    startDuel: function(user) {
        var carte = generateCarteOnline();
        var userChallenging = this.listUser.find(x=>x.id === this.userId)
        var data = {userChallenging : userChallenging, userChallenged : user, carte: carte}
        this.socket.emit('start duel', data);
        this.controllerCombat.initDuel(user, carte);
    },

}
