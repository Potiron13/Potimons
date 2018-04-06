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
        var rowBtn = displayElementOnParent('div', 'btnSaveRow', 'row', '', parent);
        rowBtn.css({ height: '10em' });
        btnTab = [
            displayButtons('btnSaveOui', 'Oui', 'BUTTON col-sm-6', view.sauvegarder, rowBtn),
            displayButtons('btnSaveNon', 'Non', 'BUTTON col-sm-6', function () { $('#' + idModal).modal('hide') }, rowBtn)
        ];
        $.each(btnTab, function (index) {
            this.css({ height: '100%' });
        });
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