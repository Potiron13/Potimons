var SaveMenuView = function () {
    this.sauvegarder = null;
}

SaveMenuView.prototype = {

    render: function () {
        var idModal = strSaveMenu;
        var view = this;
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, 'Sauvegarder');
        var rowBtn = displayElementOnParent('div', 'btnSaveRow', 'row rowBigBtn', '', parent);        
        displayButtons('btnSaveOui', 'Oui', 'col-sm-6', view.sauvegarder, rowBtn);
        displayButtons('btnSaveNon', 'Non', 'col-sm-6', function () { $('#' + idModal).modal('hide') }, rowBtn);
    },

    displaySaveComplete: function () {
        var saveRow = $('#btnSaveRow');
        saveRow.empty();
        displayElementOnParent('div', 'saveCompleteCol', 'col-sm-12', 'Sauvegarde réussie !', saveRow);
    },

    displaySaving: function () {
        var saveRow = $('#btnSaveRow');
        saveRow.empty();
        displayElementOnParent('div', 'saveCompleteCol', 'col-sm-12', 'Sauvegarde en cours...', saveRow);
    },

}