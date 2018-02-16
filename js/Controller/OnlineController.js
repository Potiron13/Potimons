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
        this.view.render(listUser, userId, this.duelQuery.bind(this));
        this.handleChat();
    },

    refreshDuelList: function(listUser, userId) {
        this.listUser = listUser;
        this.view.renderDuelList(listUser, userId, this.duelQuery.bind(this));
    },

    displayOnline: function() {
        $('#' + 'onlineModal').modal();
    },

    startDuel: function(userId) {
        var socket = io();
        var controller = this;
        var carte = generateCarteOnline();
        var data = {userChallengedId : this.userId, userChallengingId : userId, carte: carte}
        socket.emit('start duel', data);
    },

    synchronizeTeams: function(user){
        var socket = io();
        socket.emit('update team', {userId: this.userId, equipe: GetListEquipe(), nextUserId: user.id});
    },

    duelQuery: function(user) {
        this.view.renderDuelQueryChallenging(user);
        var socket = io();
        var userChallenging = this.listUser.find(x=>x.id === this.userId);
        var data = {userChallenging : userChallenging, userChallenged : user};
        socket.emit('duel query', data)
    },

    activateDuelBtn: function(user) {
        var controller = this;
        var btn = $('#btnDuel' + user.id);
        btn.on('click', function(){
            controller.synchronizeTeams(user);
            btn.prop('disabled', true);
        });
    },

    handleChat: function(){
        var socket = io();
        $('#messageForm').submit(function(){
            socket.emit('chat message', GetUserName() + ' : ' + $('#m').val());
            $('#m').val('');
            return false;
        });
    },

}
