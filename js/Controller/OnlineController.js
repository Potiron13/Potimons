var OnlineController = function (view, listUser, listEquipe) {
    this.view = view;
    this.listUser = listUser;
    this.listEquipe = listEquipe;
};

OnlineController.prototype = {

    init: function() {
        this.view.render(this.listUser);
    },

    displayOnline: function() {
        $('#' + 'onlineModal').modal();
    },

}
