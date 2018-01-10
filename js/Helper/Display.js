function displayElementOnParent(elementNodeName, elementId, elementClass, elementInnerHTML, parent) {
    var element = document.createElement(elementNodeName);
    element.id = elementId;
    element.className = elementClass;
    element.innerHTML = elementInnerHTML;
    parent.append(element);

    return $('#'+element.id);
}

function displayButtons(id, label, btnClass, functionOnClick, parent){
    var elementButton = document.createElement("BUTTON");
    var btnLabel = document.createTextNode(label);
    elementButton.id = id;
    elementButton.className = 'vcenter ' + btnClass;
    elementButton.onclick = functionOnClick;
    elementButton.appendChild(btnLabel);
    parent.append(elementButton);

    return $('#'+elementButton.id);
}

function displayProgressBar(currentValue, valueMax, parent) {
    var hpPourcentage = Math.round((currentValue/valueMax)*100);
    var container = document.createElement('div');
    var colorClass;
    if (hpPourcentage == 100) {
        colorClass = 'progress-bar-success';
    }else if ( 66 < hpPourcentage < 100) {
        colorClass = 'progress-bar-info'
    }else if (33 < hpPourcentage < 66) {
        colorClass = 'progress-bar-warning'
    }else if (hpPourcentage < 33) {
        colorClass = 'progress-bar-danger'
    }
    container.className = 'progress ' + 'col-sm-4' + ' clearPadding vcenter';
    parent.append(container);
    var progressBar = document.createElement('div');
    progressBar.className = 'progress-bar ' + colorClass + ' clearMargin';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuenow', hpPourcentage);
    progressBar.setAttribute('aria-valuemin', 0);
    progressBar.setAttribute('aria-valuemax', 100);
    progressBar.setAttribute('style', 'width:' + hpPourcentage + '%');
    progressBar.innerHTML = currentValue + '/' + valueMax;
    container.append(progressBar);
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
    displayButtons ('btnSave' + saveId, labelBtn, 'BUTTON', btnFunction, parent);
}

function displayMenuViewModels(idModal, viewModels, parent, colClass) {
    $.each(viewModels, function(index) {
        var rowLabel = displayElementOnParent('div', 'Label' + viewModels[index].id + idModal, 'row', '', parent);
        var rowValue = displayElementOnParent('div', 'Value' + viewModels[index].id + idModal , 'row', '', parent);
            if (index == 0) {
                displayElementOnParent('div', 'nom' + 'Label', colClass, 'Nom', rowLabel);
                displayElementOnParent('div', 'niveau' + 'Label', colClass, 'Niveau', rowLabel);
                displayElementOnParent('div', 'hp' + 'Label', colClass, 'Hp', rowLabel);
            }
        displayElementOnParent('div', 'nom' + 'Value', colClass, viewModels[index].Nom, rowValue);
        displayElementOnParent('div', 'niveau' + 'Value', colClass, viewModels[index].Niveau, rowValue);
        displayProgressBar(viewModels[index].CurrentHp, viewModels[index].Hp, rowValue);
        displayButtons ( 'btnSkills' + viewModels[index].id,'Competences', 'BUTTON', function () {displaySkills(viewModels[index].id)}, rowValue);
        displayButtons ('btnDetails' + viewModels[index].id ,'Details', 'BUTTON', function () {displayDetails(viewModels[index].id)}, rowValue)
    });
    displayButtons ('btnReserve', 'Reserve', 'BUTTON', function () {displayReserve()}, parent)
    displayButtons ('btnFusion' ,'Fusion', 'BUTTON', function () {displayFusion()}, parent)
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

function displayFusionResultMonstersViewModels(idModal, viewModel, parent) {
    var rowLabel = displayElementOnParent('div', 'Label' + viewModel.id + idModal, 'row', '', parent);
    var rowValue = displayElementOnParent('div', 'Value' + viewModel.id + idModal , 'row', '', parent);
    $.each(viewModel, function(label, value) {
        if (label != 'id') {
            if (label != 'src') {
                displayElementOnParent('div', label + 'Label', 'col-sm-2', label, rowLabel);
                displayElementOnParent('div', label + 'Value', 'col-sm-2', value, rowValue);
            }else {
                var colImg = displayElementOnParent('div', label + 'Value', 'col-sm-2', '', rowValue);
                var playerImg = document.createElement('img');
                playerImg.src = value;
                colImg.append(playerImg);
            }
        }
    });
}

function displayDetailsViewModels(idModal, viewModel, parent) {
    var rowPlayerDetail = displayElementOnParent('div', 'rowPlayer' + viewModel.id + idModal, 'row', '', parent)
    var colPlayerDetail = displayElementOnParent('div', 'colPlayer' + viewModel.id + idModal, 'col-sm-6', '', rowPlayerDetail)
    $.each(viewModel, function(label, value) {
        if (label != 'id') {
            if (label != 'src') {
                var rowDetail = displayElementOnParent('div', 'Label' + viewModel.id + idModal + label, 'row', '', colPlayerDetail);
                displayElementOnParent('div', label + 'Label', 'col-sm-6', label, rowDetail);
                displayElementOnParent('div', label + 'Value', 'col-sm-6', value, rowDetail);
            }else {
                var colImg = displayElementOnParent('div', label + 'Value' + viewModel.id, 'col-sm-6', '', rowPlayerDetail);
                var playerImg = document.createElement('img');
                playerImg.src = value;
                playerImg.style = 'width : 100%';
                colImg.append(playerImg);
            }
        }
    });
}

function displayEvolutionViewModels(idModal, viewModel, parent) {
    var rowLabel = displayElementOnParent('div', 'Label' + viewModel.id + idModal, 'row', '', parent);
    var rowValue = displayElementOnParent('div', 'Value' + viewModel.id + idModal , 'row', '', parent);
    $.each(viewModel, function(label, value) {
        if (label != 'id') {
            if (label != 'src') {
                displayElementOnParent('div', label + 'Label', 'col-sm-2', label, rowLabel);
                displayElementOnParent('div', label + 'Value', 'col-sm-2', value, rowValue);
            }else {
                var colImg = displayElementOnParent('div', label + 'Value', 'col-sm-2', '', rowValue);
                var playerImg = document.createElement('img');
                playerImg.src = value;
                colImg.append(playerImg);
            }
        }
    });
}

function displayReserveViewModels(idModal, viewModelsEquipe, viewModelsReserve, parent) {
    var equipeTitleRow = displayElementOnParent('div', 'rowTitreEquipeActuel', 'row', 'Equipe Actuel', parent);
    var equipeRow = displayElementOnParent('div', 'rowEquipeActuel', 'row', '', parent);
    equipeRow.droppable({
        drop: function(event, ui) {
            var targetedElement = $(this)[0];
            var draggedElement = ui.draggable[0];
            dropOnRow(draggedElement, targetedElement, Equipe, Reserve, 'Reserve');
        },
        accept: function(el) {
            return this.childElementCount < 3;
        }
    })
    var separationRow = displayElementOnParent('div', 'rowReserveSeparation', 'row seperation', '', parent);
    var reserveRow = displayElementOnParent('div', 'rowReserve', 'row', '', parent);
    reserveRow.droppable({
        drop: function(event, ui) {
            var targetedElement = $(this)[0];
            var draggedElement = ui.draggable[0];
            dropOnRow(draggedElement, targetedElement, Reserve, Equipe, 'Reserve');
        },
        accept: function(el) {
            return equipeRow.children().length > 1;
        }
    });
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

function populateReserveCol(idPlayer, parentRow, playerViewModel) {
    var colPlayer = displayElementOnParent('div', idPlayer + 'Reserve', 'col-sm-4' + ' reserveCol', '', parentRow);
    colPlayer.draggable({
        revert: 'invalid'
    });
    var rowPlayerLabel = displayElementOnParent('div', 'row' + 'Label' + idPlayer, 'row', '', colPlayer);
    var rowPlayerValue = displayElementOnParent('div', 'row' + 'Value' + idPlayer, 'row', '', colPlayer);
    $.each(playerViewModel, function(label, value) {
        if (label != 'id') {
            var colLabelPlayer = displayElementOnParent('div', 'col' + 'Label' + label + idPlayer, 'col-sm-' + 12/(Object.keys(playerViewModel).length - 1), label, rowPlayerLabel);
            var colValuePlayer = displayElementOnParent('div', 'col' + 'Value' + label + idPlayer, 'col-sm-' + 12/(Object.keys(playerViewModel).length - 1), value, rowPlayerValue);
        }
    });
}

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

function displayFusionMonstersViewModels(idModal, viewModelsReserve, parent) {
    var fusionRow = displayElementOnParent('div', 'rowFusion', 'row', '', parent);
    fusionRow.droppable({
        drop: function(event, ui) {
            var targetedElement = $(this)[0];
            var draggedElement = ui.draggable[0];
            dropOnRow(draggedElement, targetedElement, Fusion, ReserveFusion, 'ReserveFusion');
            if (Fusion.length == 2) {
                $('#btnFusionner').show();
            }else {
                $('#btnFusionner').hide();
            }
        },
        accept: function(el) {
            return this.childElementCount < 2;
        }
    });
    var separationRow = displayElementOnParent('div', 'rowReserveSeparation', 'row seperation', '', parent);
    var reserveRow = displayElementOnParent('div', 'rowReserveFusion', 'row', '', parent);
    reserveRow.droppable({
        drop: function(event, ui) {
            var targetedElement = $(this)[0];
            var draggedElement = ui.draggable[0];
            dropOnRow(draggedElement, targetedElement, ReserveFusion, Fusion, 'ReserveFusion');
            if (Fusion.length == 2) {
                $('#btnFusionner').show();
            }else {
                $('#btnFusionner').hide();
            }
        },
    });
    var reserveTitleRow = displayElementOnParent('div', 'rowReserveTitre', 'row', 'Reserve', parent);
    var btnFusionner = displayButtons( 'btnFusionner', 'Fusionner', 'btn btn-danger col-sm-4', fuseTwoMonsters, parent).hide();
    $.each(viewModelsReserve, function(index) {
        populateReserveFusionCol(viewModelsReserve[index].id, reserveRow, viewModelsReserve[index], 'col-sm-6');
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

function displayReserve(){
    $('#modalMenuReserve').modal();
}

function displaySaveMenu() {
    $('#modalMenuSave').modal();
    document.removeEventListener('touchstart', handleStart);
    document.removeEventListener('touchend', handleEnd);
    document.removeEventListener('keydown', deplacement);
}

function displayMainMenu() {
    $('#modalMenuStats').modal();
    document.removeEventListener('touchstart', handleStart);
    document.removeEventListener('touchend', handleEnd);
    document.removeEventListener('keydown', deplacement);
}

function displayFusionResult(){
    $('#modalMenuResultFusion').modal();
}

function displayEvoltionResult(){
    $('#modalEvolution').modal();
}

function displayFusion(){
    Fusion = [];
    ReserveFusion = Reserve.slice();
    initialiserFusionTwoMonstersMenu();
    $('#modalMenuFusionTwoMonsters').modal();
}

function displaySkills(id) {
    $('#modalSkills' + id).modal();
}

function displayDetails(id) {
    $('#modalDetails' + id).modal();
}

function displayEquipement(id) {
    $('#modalEquipement' + id).modal();
}

function displayPlayerList(listPlayer, parent) {
    $.each(listPlayer,function(index){
        var colonnePlayer = displayElementOnParent('div', "colonne" + listPlayer[index].id, 'col-sm-' + 12/listPlayer.length, '', parent);
        var colonneSelector = displayElementOnParent('div', "colonneSelector" + listPlayer[index].id, 'col-sm-' + 12/listPlayer.length + ' noSelector', '', colonnePlayer);
        var colImage = displayElementOnParent('div', listPlayer[index].id, "col-sm-12 colonneIdle text-center", "", colonnePlayer);
        var playerImg = document.createElement('img');
        playerImg.src =  listPlayer[index].gentil ? listPlayer[index].srcDos : listPlayer[index].src;
        colImage.append(playerImg);
    });
}

function displaySkillsButtons(skills, player, selectedEnnemie, listPlayer, parent) {
    $.each(skills, function( index, skill ) {
        displayButtons( 'btn' + skill.id, skill.name, (skill.type == "magie") ? "col-sm-3 btn btn-danger btnCombat" : "col-sm-3 btn btn-success btnCombat",
        function() {
            $("#buttonRow" + player.id).hide();
            attaque(player, null, skill);
        }, parent);
    });
}

function displayEquipeInfo(parent) {
    var colInfoEquipe = displayElementOnParent('div', 'colInfoEquipe', 'col-sm-4 combatInfo', '', parent);
    var labelRow = displayElementOnParent('div', 'labelRowInfo', 'row', '', colInfoEquipe);
    $.each(Equipe, function(index) {
        var viewModelInfoPlayer = new ViewModelInfoPlayer(Equipe[index]);
        var infoRow = displayElementOnParent('div', Equipe[index].id + 'Info' + 'Row', 'row', '', colInfoEquipe);
        $.each(viewModelInfoPlayer, function(label, value) {
            if (index == 0) {
                var labelCol = displayElementOnParent('div', label + 'Info', 'col-sm-6', label, labelRow);
            }
            var valueCol = displayElementOnParent('div', 'value'+ label + 'Info' + Equipe[index].id, 'col-sm-6', value, infoRow);
        })
    })
}

function displayEnnemieInfo(parent) {
    var colInfoEnnemie = displayElementOnParent('div', 'colEnnemieInfo', 'col-sm-4 combatInfo', '', parent);
    var labelRow = displayElementOnParent('div', 'labelRowEnnemieInfo', 'row', '', colInfoEnnemie);
    $.each(listEnnemies, function(index) {
        var viewModelInfoEnnemie = new ViewModelInfoEnnemie(listEnnemies[index], index);
        var infoRow = displayElementOnParent('div', listEnnemies[index].id + 'Info' + 'Row', 'row', '', colInfoEnnemie);
        $.each(viewModelInfoEnnemie, function(label, value) {
            if (index == 0) {
                var labelCol = displayElementOnParent('div', label + 'Info', 'col-sm-6', label, labelRow);
            }
            var valueCol = displayElementOnParent('div', 'value'+ label + 'Info' + listEnnemies[index].id, 'col-sm-6', value, infoRow);
        })
    })
}
