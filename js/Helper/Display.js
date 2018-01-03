function displayElementOnParent(elementNodeName, elementId, elementClass, elementInnerHTML, parent) {
    var element = document.createElement(elementNodeName);
    element.id = elementId;
    element.className = elementClass;
    element.innerHTML = elementInnerHTML;
    parent.append(element);

    return $('#'+element.id);
}

function displayButtons (label, btnClass, functionOnClick, parent){
    var elementButton = document.createElement("BUTTON");
    var btnLabel = document.createTextNode(label);
    elementButton.id = "btn" + label;
    elementButton.className = btnClass;
    elementButton.onclick = functionOnClick;
    elementButton.appendChild(btnLabel);
    parent.append(elementButton);

    return $('#'+elementButton.id);
}

function createModal(id, titre) {
    var modalMenu = displayElementOnParent('div', id, "modal fade", "", $('body'));
    modalMenu.attr('role', 'dialog');
    var modalMenuDialog = displayElementOnParent('div', id + 'Dialog', 'modal-dialog', '', modalMenu);
    var modalMenuContent = displayElementOnParent('div', id + 'Content', 'modal-Content', '', modalMenuDialog);
    var modalMenuHeader = displayElementOnParent('div', id + 'Header', 'modal-Header', '', modalMenuContent);
    var modalBtnCloseHeader = displayElementOnParent('BUTTON', id + 'BtnCloseHeader', 'close', '&times;', modalMenuHeader);
    modalBtnCloseHeader.attr('data-dismiss', "modal");
    var modalMenuTitle = displayElementOnParent('h4', id + 'Title', 'modal-title', titre, modalMenuHeader);
    var modalBody = displayElementOnParent('div', id + 'Body', 'modal-body', '', modalMenuContent);
    var modalFooter = displayElementOnParent('div', id + 'Footer', 'modal-footer', '', modalMenuContent);
    var modalBtnCloseFooter = displayElementOnParent('BUTTON', id + 'BtnCloseFooter', 'btn btn-default', 'Fermer', modalMenuContent);
    modalBtnCloseFooter.attr('data-dismiss', "modal");

    return modalBody;
}

function displaySaveFileViewModels(idModal, viewModels, parent, labelBtn, btnFunction) {
    var saveId = viewModels.find(x=>x.dataType == 'saveId').value
    var colEquipe = displayElementOnParent('div', 'col-equipe-' + saveId, 'col-sm-8', '', parent);
    var colData = displayElementOnParent('div', 'col-data-' + saveId, 'col-sm-4', '', parent);
    var rowLabelData;
    var rowValueData;
    $.each(viewModels, function(index) {
        if (viewModels[index].dataType == 'playerInfo') {
            var rowLabelEquipe = displayElementOnParent('div', 'Label' + 'Equipe' + saveId, 'row', '', colEquipe);
            var rowValueEquipe = displayElementOnParent('div', 'Value' + viewModels[index].id + saveId , 'row', '', colEquipe);
            if (index == 0) {
                displayElementOnParent('div', 'LabelNomPlayer' , 'col-sm-2', 'Nom', rowLabelEquipe);
                displayElementOnParent('div', 'LabelLevelPlayer', 'col-sm-2', 'Level', rowLabelEquipe);
            }
            displayElementOnParent('div', 'ValuePlayer' + viewModels[index].id + 'Nom', 'col-sm-2', viewModels[index].name, rowValueEquipe);
            displayElementOnParent('div', 'ValuePlayer' + viewModels[index].id + 'Level', 'col-sm-2', viewModels[index].level, rowValueEquipe);
        }else {
            var rowValueData = displayElementOnParent('div', 'Value' + 'Data' + saveId + viewModels[index].dataType, 'row', '', colData);
            displayElementOnParent('div', viewModels[index].dataType, 'col-sm-6', viewModels[index].value, rowValueData);
        }
    });
    displayButtons (labelBtn, 'BUTTON', btnFunction, parent);
}

function displayMenuViewModels(idModal, viewModels, parent, colClass) {
    $.each(viewModels, function(index) {
        var rowLabel = displayElementOnParent('div', 'Label' + viewModels[index].id + idModal, 'row', '', parent);
        var rowValue = displayElementOnParent('div', 'Value' + viewModels[index].id + idModal , 'row', '', parent);
        $.each(viewModels[index], function(label, value) {
            if (label != 'id') {
                if (index == 0) {
                    displayElementOnParent('div', label + 'Label', colClass, label, rowLabel);
                }
                displayElementOnParent('div', label + 'Value', colClass, value, rowValue);
            }
        });
        displayButtons ('Competences', 'BUTTON', function () {displaySkills(viewModels[index].id)}, rowValue)
        displayButtons ('Equipement', 'BUTTON', function () {displayEquipement(viewModels[index].id)}, rowValue)
    });
    displayButtons ('Reserve', 'BUTTON', function () {displayReserve()}, parent)
}

function displaySkillsViewModels(idModal, viewModels, parent, colClass) {
    $.each(viewModels, function(index) {
        var rowLabel = displayElementOnParent('div', 'Label' + viewModels[index].id + idModal, 'row', '', parent);
        var rowValue = displayElementOnParent('div', 'Value' + viewModels[index].id + idModal , 'row', '', parent);
        $.each(viewModels[index], function(label, value) {
            if (label != 'id') {
                if (index == 0) {
                    displayElementOnParent('div', label + 'Label', colClass, label, rowLabel);
                }
                displayElementOnParent('div', label + 'Value', colClass, value, rowValue);
            }
        });
    });
}

function displayEquipementViewModels(idModal, viewModels, parent, colClass) {
    $.each(viewModels, function(label, equipement) {
        var rowLabel = displayElementOnParent('div', 'row' + label + idModal, 'row', '', parent);
        var colLabel = displayElementOnParent('div', 'col' + label + idModal, 'col-sm-2', label, rowLabel);
        var colNomEquipement = displayElementOnParent('div', label + 'Label', colClass, equipement.name, rowLabel);
    });
}

function displayReserveViewModels(idModal, viewModelsEquipe, viewModelsReserve, parent) {
    var equipeRow = displayElementOnParent('div', 'rowEquipeActuel', 'row', '', parent);
    equipeRow.attr('listdata', 'Equipe');
    equipeRow.attr('ondrop', 'drop(event, this)');
    equipeRow.attr('ondragover', 'allowDrop(event, this)');
    var equipeTitleRow = displayElementOnParent('div', 'rowEquipeTitreActuel', 'row', 'Equipe Actuel', parent);
    var separationRow = displayElementOnParent('div', 'rowReserveSeparation', 'row seperation', '', parent);
    var reserveRow = displayElementOnParent('div', 'rowReserve', 'row', '', parent);
    reserveRow.attr('listdata', 'Reserve');
    reserveRow.attr('ondrop', 'drop(event, this)');
    reserveRow.attr('ondragover', 'allowDrop(event, this)');
    var reserveTitleRow = displayElementOnParent('div', 'rowReserveTitreActuel', 'row', 'Reserve', parent);
    var playerViewModel;
    for (var i = 0; i < 3; i++) {
        if (viewModelsEquipe[i]) {
            playerViewModel = viewModelsEquipe[i];
        }
        populateReserveCol(playerViewModel.id, equipeRow, playerViewModel, 'col-sm-4')
    }
    $.each(viewModelsReserve, function(index) {
        populateReserveCol(viewModelsReserve[index].id, reserveRow, viewModelsReserve[index], 'col-sm-4')
    })
}

function populateReserveCol(idPlayer, parentRow, playerViewModel, colClass) {
    var colPlayer = displayElementOnParent('div', idPlayer + 'Reserve', colClass + ' reserveCol', '', parentRow);
    colPlayer.attr('draggable', 'true');
    colPlayer.attr('ondragstart', 'drag(event)');
    var rowPlayerLabel = displayElementOnParent('div', 'row' + 'Label' + idPlayer, 'row', '', colPlayer);
    var rowPlayerValue = displayElementOnParent('div', 'row' + 'Value' + idPlayer, 'row', '', colPlayer);
    $.each(playerViewModel, function(label, value) {
        if (label != 'id') {
            var colLabelPlayer = displayElementOnParent('div', 'col' + 'Label' + label + idPlayer, colClass, label, rowPlayerLabel);
            var colValuePlayer = displayElementOnParent('div', 'col' + 'Value' + label + idPlayer, colClass, value, rowPlayerValue);
        }
    });
}

function displayReserve(){
    $('#modalMenuReserve').modal();
}

function displaySkills(id) {
    $('#modalSkills' + id).modal();
}

function displayEquipement(id) {
    $('#modalEquipement' + id).modal();
}

function displayPlayerList(listPlayer, parent) {
    $.each(listPlayer,function(index){
        var colonnePlayer = displayElementOnParent('div', "colonne" + listPlayer[index].id, 'col-sm-' + 12/listPlayer.length, '', parent);
        var colImage = displayElementOnParent('div', listPlayer[index].id, "col-sm-12 colonneIdle text-center", "", colonnePlayer);
        var playerImg = document.createElement('img');
        playerImg.src = listPlayer[index].src;
        colImage.append(playerImg);
    });
}

function displaySkillsButtons(skills, player, selectedEnnemie, listPlayer, parent) {
    $.each(skills, function( index, skill ) {
        displayButtons(skill.name, (skill.type == "magie") ? "col-sm-2 btn btn-danger" : "col-sm-2 btn btn-success",
        function() {
            $("#buttonRow" + player.id).hide();
            attaque(player, null, skill)
        }, parent);
    });
}

function displayEquipeInfo() {
    var labelRow = displayElementOnParent('div', 'labelRowInfo', 'row', '', $('#topRow'));
    $.each(Equipe, function(index) {
        var viewModelInfoPlayer = new ViewModelInfoPlayer(Equipe[index]);
        var infoRow = displayElementOnParent('div', Equipe[index].id + 'Info' + 'Row', 'row', '', $('#topRow'));
        $.each(viewModelInfoPlayer, function(label, value) {
            if (index == 0) {
                var labelCol = displayElementOnParent('div', label + 'Info', 'col-sm-2', label, labelRow);
            }
            var valueCol = displayElementOnParent('div', 'value'+ label + 'Info' + Equipe[index].id, 'col-sm-2', value, infoRow);
        })
    })
}

function displayEnnemieInfo() {
    var colInfoEnnemie = displayElementOnParent('div', 'colEnnemieInfo', 'col-sm-6', '', $('#bottomRow'));
    var labelRow = displayElementOnParent('div', 'labelRowEnnemieInfo', 'row', '', colInfoEnnemie);
    $.each(listEnnemies, function(index) {
        var viewModelInfoEnnemie = new ViewModelInfoEnnemie(listEnnemies[index], index);
        var infoRow = displayElementOnParent('div', listEnnemies[index].id + 'Info' + 'Row', 'row', '', colInfoEnnemie);
        $.each(viewModelInfoEnnemie, function(label, value) {
            if (index == 0) {
                var labelCol = displayElementOnParent('div', label + 'Info', 'col-sm-2', label, labelRow);
            }
            var valueCol = displayElementOnParent('div', 'value'+ label + 'Info' + listEnnemies[index].id, 'col-sm-2', value, infoRow);
        })
    })
}
