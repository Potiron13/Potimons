var StartingScreenView = function () {
    this.loadGame = null;
    this.newGame = null;
    this.openLoadMenu = null;
};

StartingScreenView.prototype = {

    render: function(listLoadViewModel) {
            document.body.style.backgroundImage =  strPathStartingScreen;
            var newGameContainer = displayElementOnParent('div', strNewGameContainer, 'container container-table', '', $('body'));
            var startingGameRow = displayElementOnParent('div', strNewGameRow, 'vertical-center-row', '', newGameContainer);
            var modalBody = createModal(strLoadGameModal, strContinue);
            var loadId;
            var view = this;
            $.each(listLoadViewModel, function(index) {
                var load = listLoadViewModel[index];
                loadId = load.find( x => x.dataType == strSaveId).value;
                var loadRow = displayElementOnParent('div', loadId, 'row saveRow', '', modalBody);
                var saveId = load.find(x=>x.dataType == strSaveId).value;
                var parent = loadRow;
                var colEquipe = displayElementOnParent('div', 'col-equipe-' + saveId, 'col-sm-8', '', parent);
                var colData = displayElementOnParent('div', 'col-data-' + saveId, 'col-sm-4', '', parent);
                var rowLabelData;
                var rowValueData;
                $.each(load, function(index) {
                    if (load[index].dataType == strPlayerInfo) {
                        var rowLabelEquipe = displayElementOnParent('div', 'Label' + 'Equipe' + saveId, 'row', '', colEquipe);
                        var rowValueEquipe = displayElementOnParent('div', 'Value' + load[index].id + saveId , 'row', '', colEquipe);
                        if (index == 0) {
                            displayElementOnParent('div', 'LabelNomPlayer' , 'col-sm-6', 'Nom', rowLabelEquipe);
                            displayElementOnParent('div', 'LabelLevelPlayer', 'col-sm-6', 'Level', rowLabelEquipe);
                        }
                        displayElementOnParent('div', 'ValuePlayer' + load[index].id + 'Nom', 'col-sm-6', load[index].name, rowValueEquipe);
                        displayElementOnParent('div', 'ValuePlayer' + load[index].id + 'Level', 'col-sm-6', load[index].level, rowValueEquipe);
                    }else {
                        var rowValueData = displayElementOnParent('div', 'Value' + 'Data' + saveId + load[index].dataType, 'row', '', colData);
                        displayElementOnParent('div', load[index].dataType, 'col-sm-6', load[index].value, rowValueData);
                    }
                });
                displayButtons ('btnSave' + saveId, strBtnCharger, 'BUTTON', function() {view.loadGame(loadRow.attr('id'))}, parent);
            });
            loadId = listLoadViewModel.length + 1;
            displayButtons ('btnNewGame', 'NEWGAME', 'btn col-sm-4 col-sm-offset-4', this.newGame, startingGameRow);
            displayButtons ('btnContinue', 'Continue', 'btn col-sm-4 col-sm-offset-4', this.openLoadMenu, startingGameRow)
    },
}
