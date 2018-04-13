var DeconnectionMenuView = function () {
    this.deconnection = null;
}

DeconnectionMenuView.prototype = {

    render: function () {
        var idModal = strDeconnectionMenu;
        var view = this;
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, 'Deconnection');
        var rowBtn = displayElementOnParent('div', 'btnDeconnectionRow', 'row rowBigBtn', '', parent);        
        displayButtons('btnDeconnectionOui', 'Oui', 'col-sm-6', view.deconnection, rowBtn);
        displayButtons('btnDeconnectionNon', 'Non', 'col-sm-6', function () { $('#' + idModal).modal('hide') }, rowBtn);
    },

}