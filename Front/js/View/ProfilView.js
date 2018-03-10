var ProfilView = function () {
    this.modalBody = null;
}

ProfilView.prototype = {

    render: function(userName) {
        var idModal = 'profilModal';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        this.modalBody = createModal(idModal, 'Profile');
        var userNameRow = displayElementOnParent('div', 'userNameRow', 'row', '', this.modalBody);
        var userNameLabel = displayElementOnParent('div', 'userNameLabel', 'col-sm-2', 'Pseudo', userNameRow);
        var userNameValue = displayElementOnParent('div', 'userNameValue', 'col-sm-8', userName, userNameRow);
        var timerRow = displayElementOnParent('div', 'timerRow', 'row', '', this.modalBody);
        var timerLabel = displayElementOnParent('div', 'timerLabel', 'col-sm-2', 'Temps de jeu : ', timerRow);
        var timer = displayElementOnParent('div', 'timer', 'col-sm-2', '', timerRow);
        var potiflouzRow = displayElementOnParent('div', 'potiflouzRow', 'row', '', this.modalBody);
        var potiflouzLabel = displayElementOnParent('div', 'potiflouzLabel', 'col-sm-2', 'Potiflouz : ', potiflouzRow);
        var potiflouz = displayElementOnParent('div', 'potiflouz', 'col-sm-2', GetPotiflouz() + '$', potiflouzRow);
    },

}
