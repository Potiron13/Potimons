var SaveMenuView = function () {
    this.sauvegarder = null;
}

SaveMenuView.prototype = {

    render : function (listSaveViewModels) {
        var modalId = strModalMenuSave;
        if ($('#' + modalId).length) {
            $('#' + modalId).empty();
        }
        var modalBody = createModal(modalId, strSauvegarder);
        var view = this;
        $.each(listSaveViewModels, function(index) {
            var saveViewModel = listSaveViewModels[index];
            var saveId = saveViewModel.find(x=>x.dataType == 'saveId').value;
            var saveRow = displayElementOnParent('div', saveId, 'row saveRow', '', modalBody);
            var parent = saveRow;
            var colEquipe = displayElementOnParent('div', 'col-equipe-' + saveId, 'col-sm-8', '', parent);
            var colData = displayElementOnParent('div', 'col-data-' + saveId, 'col-sm-4', '', parent);
            var rowLabelData;
            var rowValueData;
            $.each(saveViewModel, function(index) {
                if (saveViewModel[index].dataType == strPlayerInfo) {
                    var rowLabelEquipe = displayElementOnParent('div', 'Label' + 'Equipe' + saveId, 'row', '', colEquipe);
                    var rowValueEquipe = displayElementOnParent('div', 'Value' + saveViewModel[index].id + saveId , 'row', '', colEquipe);
                    if (index == 0) {
                        displayElementOnParent('div', 'LabelNomPlayer' , 'col-sm-6', 'Nom', rowLabelEquipe);
                        displayElementOnParent('div', 'LabelLevelPlayer', 'col-sm-6', 'Level', rowLabelEquipe);
                    }
                    displayElementOnParent('div', 'ValuePlayer' + saveViewModel[index].id + 'Nom', 'col-sm-6', saveViewModel[index].name, rowValueEquipe);
                    displayElementOnParent('div', 'ValuePlayer' + saveViewModel[index].id + 'Level', 'col-sm-6', saveViewModel[index].level, rowValueEquipe);
                }else {
                    var rowValueData = displayElementOnParent('div', 'Value' + 'Data' + saveId + saveViewModel[index].dataType, 'row', '', colData);
                    displayElementOnParent('div', saveViewModel[index].dataType, 'col-sm-6', saveViewModel[index].value, rowValueData);
                }
            });
            displayButtons ('btnSave' + saveId, strSauvegarder, 'BUTTON', function() {view.sauvegarder(saveRow.attr('id'))}, parent);
        });
        displayButtons ('btnNouveau', 'Nouveau', 'BUTTON', function() {
            view.sauvegarder(localStorage.length + 1);
        }, modalBody);

        return modalBody;
    },
}
