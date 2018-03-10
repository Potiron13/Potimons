var ProfilController = function (view) {
    this.view = view;
};

ProfilController.prototype = {

    init: function() {
        this.view.render(GetUserName());
    },

    displayProfil: function() {
        this.view.render(GetUserName());      
        $('#profilModal').modal();
    },

}
