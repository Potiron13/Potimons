/*
function populateReserveFusionCol(idPlayer, parentRow, playerViewModel, colClass) {
    var colPlayer = displayElementOnParent('div', idPlayer + 'ReserveFusion', colClass + ' reserveCol', '', parentRow);
    colPlayer.draggable({
        revert: 'invalid'
    });
    var rowPlayerLabel = displayElementOnParent('div', 'rowFusion' + 'Label' + idPlayer, 'row', '', colPlayer);
    var rowPlayerValue = displayElementOnParent('div', 'rowFusion' + 'Value' + idPlayer, 'row', '', colPlayer);
    $.each(playerViewModel, function(label, value) {
        if (label != 'id') {
            var colLabelPlayer = displayElementOnParent('div', 'colFusion' + 'Label' + label + idPlayer, 'col-sm-' + 12/(Object.keys(playerViewModel).length - 1), label, rowPlayerLabel);
            var colValuePlayer = displayElementOnParent('div', 'colFusion' + 'Value' + label + idPlayer, 'col-sm-' + 12/(Object.keys(playerViewModel).length - 1), value, rowPlayerValue);
        }
    });
}

function displayFusionMonstersViewModelsHTML5(idModal, viewModelsReserve, parent) {
    var fusionRow = displayElementOnParent('div', 'rowFusion', 'row', '', parent);
    fusionRow.attr('listdata', 'Fusion');
    fusionRow.attr('ondrop', 'dropFusion(event, this)');
    fusionRow.attr('ondragover', 'allowDropFusion(event, this)');
    var fusionTitleRow = displayElementOnParent('div', 'rowFusionTitre', 'row', 'Monstres a fusionner', parent);
    var separationRow = displayElementOnParent('div', 'rowReserveSeparation', 'row seperation', '', parent);
    var reserveRow = displayElementOnParent('div', 'rowReserveFusion', 'row', '', parent);
    reserveRow.attr('listdata', 'Reserve');
    reserveRow.attr('ondrop', 'dropFusion(event, this)');
    reserveRow.attr('ondragover', 'allowDropFusion(event, this)');
    var reserveTitleRow = displayElementOnParent('div', 'rowReserveTitre', 'row', 'Reserve', parent);
    var btnFusionner = displayButtons('btnFusionner', 'Fusionner', 'btn btn-danger col-sm-4', fuseTwoMonsters, parent).hide();
    $.each(viewModelsReserve, function(index) {
        populateReserveFusionCol(viewModelsReserve[index].id, reserveRow, viewModelsReserve[index], 'col-sm-4');
    })
}

function populateReserveColHTML5(idPlayer, parentRow, playerViewModel, colClass) {
    var colPlayer = displayElementOnParent('div', idPlayer + 'Reserve', colClass + ' reserveCol', '', parentRow);
    colPlayer.attr('draggable', 'true');
    colPlayer.attr('ondragstart', 'dragReserve(event)');
    var rowPlayerLabel = displayElementOnParent('div', 'row' + 'Label' + idPlayer, 'row', '', colPlayer);
    var rowPlayerValue = displayElementOnParent('div', 'row' + 'Value' + idPlayer, 'row', '', colPlayer);
    $.each(playerViewModel, function(label, value) {
        if (label != 'id') {
            var colLabelPlayer = displayElementOnParent('div', 'col' + 'Label' + label + idPlayer, colClass, label, rowPlayerLabel);
            var colValuePlayer = displayElementOnParent('div', 'col' + 'Value' + label + idPlayer, colClass, value, rowPlayerValue);
        }
    });
}

function populateReserveFusionColHTML5(idPlayer, parentRow, playerViewModel, colClass) {
    var colPlayer = displayElementOnParent('div', idPlayer + 'ReserveFusion', colClass + ' reserveCol', '', parentRow);
    colPlayer.attr('draggable', 'true');
    colPlayer.attr('ondragstart', 'dragFusion(event)');
    var rowPlayerLabel = displayElementOnParent('div', 'rowFusion' + 'Label' + idPlayer, 'row', '', colPlayer);
    var rowPlayerValue = displayElementOnParent('div', 'rowFusion' + 'Value' + idPlayer, 'row', '', colPlayer);
    $.each(playerViewModel, function(label, value) {
        if (label != 'id') {
            var colLabelPlayer = displayElementOnParent('div', 'colFusion' + 'Label' + label + idPlayer, colClass, label, rowPlayerLabel);
            var colValuePlayer = displayElementOnParent('div', 'colFusion' + 'Value' + label + idPlayer, colClass, value, rowPlayerValue);
        }
    });
}

function displayReserveViewModelsHTML5(idModal, viewModelsEquipe, viewModelsReserve, parent) {
    var equipeRow = displayElementOnParent('div', 'rowEquipeActuel', 'row', '', parent);
    equipeRow.attr('listdata', 'Equipe');
    equipeRow.attr('ondrop', 'dropReserve(event, this)');
    equipeRow.attr('ondragover', 'allowDropReserve(event, this)');
    var equipeTitleRow = displayElementOnParent('div', 'rowTitreEquipeActuel', 'row', 'Equipe Actuel', parent);
    var separationRow = displayElementOnParent('div', 'rowReserveSeparation', 'row seperation', '', parent);
    var reserveRow = displayElementOnParent('div', 'rowReserve', 'row', '', parent);
    reserveRow.attr('listdata', 'Reserve');
    reserveRow.attr('ondrop', 'dropReserve(event, this)');
    reserveRow.attr('ondragover', 'allowDropReserve(event, this)');
    var reserveTitleRow = displayElementOnParent('div', 'rowTitreReserve', 'row', 'Reserve', parent);
    var playerViewModel;
    for (var i = 0; i < 3; i++) {
        if (viewModelsEquipe[i]) {
            playerViewModel = viewModelsEquipe[i];
            populateReserveCol(playerViewModel.id, equipeRow, playerViewModel);
        }
    }
    $.each(viewModelsReserve, function(index) {
        populateReserveCol(viewModelsReserve[index].id, reserveRow, viewModelsReserve[index]);
    })
}

function displayEquipement(id) {
    $('#modalEquipement' + id).modal();
}
*/
