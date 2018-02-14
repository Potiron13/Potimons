var ProfilView = function () {
    this.modalBody = null;
}

ProfilView.prototype = {

    render: function(userName, editerUserName) {
        var idModal = 'profilModal';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        this.modalBody = createModal(idModal, 'Profile');
        var userNameRow = displayElementOnParent('div', 'userNameRow', 'row', '', this.modalBody);
        var userNameLabel = displayElementOnParent('div', 'userNameLabel', 'col-sm-2', 'Pseudo', userNameRow);
        var userNameValue = displayElementOnParent('div', 'userNameValue', 'col-sm-8', userName, userNameRow);
    },

}
