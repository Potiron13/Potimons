var DeconnectionMenuController = function (view) {
    this.view = view;
};

DeconnectionMenuController.prototype = {

    init: function () {
        this.view.deconnection = this.deconnection.bind(this);
        this.view.render();
    },

    displayDeconnectionMenu: function() {
        this.view.render();
        $('#' + strDeconnectionMenu).modal();
    },

    deconnection: function() {
        DeleteSessionGuid();
        location.reload();
    }

}