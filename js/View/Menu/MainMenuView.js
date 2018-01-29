var MainMenuView = function () {
    this.displaySkills = null;
    this.displayDetails = null;
    this.displayReserve = null;
    this.displayItems = null;
    this.displayFusion = null;
    this.dropOnRow = null;
    this.fuseTwoMonsters = null;
    this.controller = null;
}

MainMenuView.prototype = {

    render : function (viewModels){
        var idModal = strModalMenuStats;
        var view = this;
        var colClass = 'col-sm-2';
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, 'Satistiques');
        $.each(viewModels, function(index) {
            var rowLabel = displayElementOnParent('div', 'Label' + viewModels[index].id + idModal, 'row', '', parent);
            var rowValue = displayElementOnParent('div', 'Value' + viewModels[index].id + idModal , 'row', '', parent);
            if (index == 0) {
                displayElementOnParent('div', 'nom' + 'Label', colClass, 'Nom', rowLabel);
                displayElementOnParent('div', 'niveau' + 'Label', colClass, 'Niveau', rowLabel);
                displayElementOnParent('div', 'hp' + 'Label', 'col-sm-4', 'Hp', rowLabel);
                displayElementOnParent('div', 'mana' + 'Label', 'col-sm-4', 'Mana', rowLabel);
            }
            displayElementOnParent('div', 'nom' + 'Value', colClass, viewModels[index].Nom, rowValue);
            displayElementOnParent('div', 'niveau' + 'Value', colClass, viewModels[index].Niveau, rowValue);
            displayProgressBar(viewModels[index].id + 'menuProgressBarHp', viewModels[index].CurrentHp, viewModels[index].Hp, rowValue);
            displayProgressBar(viewModels[index].id + 'menuProgressBarMana', viewModels[index].CurrentMana, viewModels[index].Mana, rowValue);
            displayButtons ('btnSkills' + viewModels[index].id, 'Competences', 'BUTTON', function () {view.displaySkills(viewModels[index].id)}, rowValue);
            displayButtons ('btnDetails' + viewModels[index].id , 'Details', 'BUTTON', function () {view.displayDetails(viewModels[index].id)}, rowValue)
        });
        displayButtons ('btnReserve', 'Reserve', 'BUTTON', function () {view.displayReserve()}, parent)
        displayButtons ('btnFusion' ,'Fusion', 'BUTTON', function () {view.displayFusion()}, parent)
        displayButtons ('btnItems' ,'Objets', 'BUTTON', function () {view.displayItems()}, parent)
    },

    renderItemMenu : function(viewModels, potionsViewModels) {
        var idModal = strModalMenuItems;
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, 'Objets');
        var colClass = 'col-sm-4';
        var view = this;
        $.each(viewModels, function(index) {
            var rowLabel = displayElementOnParent('div', 'Label' + viewModels[index].id + idModal, 'row', '', parent);
            var rowValue = displayElementOnParent('div', 'Value' + viewModels[index].id + idModal , 'row', '', parent);
            $.each(viewModels[index], function(label, value) {
                if (label != 'usableInMenu' && label != 'effectInMenu' && label != 'id' && label != 'category') {
                    if (index == 0) {
                        displayElementOnParent('div', label + 'Label', colClass, label, rowLabel);
                    }
                    displayElementOnParent('div', label + 'Value', colClass, value, rowValue);
                }
            });
            if (viewModels[index].usableInMenu) {
                displayButtons('btn' + viewModels[index].id, 'Utiliser', 'btn btn-secondary', function(){
                    if (viewModels[index].category == 'Hp') {
                        view.renderPotionMenu(viewModels[index].Objet, viewModels[index].effectInMenu, potionsViewModels, view.controller)
                    }else if (viewModels[index].category == 'Mana') {
                        view.renderPotionManaMenu(viewModels[index].Objet, viewModels[index].effectInMenu, potionsViewModels, view.controller)
                    }
                }, rowValue)
            }
        });
    },

    renderPlayerSkillMenu : function(viewModels, playerId){
        var idModal = strModalSkills + playerId;
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, 'Competences');
        var colClass = 'col-sm-2';
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
    },

    renderPlayerDetailMenu : function(viewModel) {
            var idModal = strModalDetails + viewModel.id;
            if ($('#' + idModal).length) {
                $('#' + idModal).empty();
            }
            var parent = createModal(idModal, 'Details');
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
    },

    renderReserveMenu : function(viewModelsEquipe, viewModelsReserve) {
        var modalId = strModalMenuReserve;
        if ($('#' + modalId).length) {
            $('#' + modalId).empty();
        }
        var parent = createModal(modalId, 'Stockage des potimons');
        var equipeTitleRow = displayElementOnParent('div', 'rowTitreEquipeActuel', 'row', 'Equipe Actuelle', parent);
        var equipeRow = displayElementOnParent('div', 'rowEquipeActuel', 'row', '', parent);
        var view = this;
        equipeRow.droppable({
            drop: function(event, ui) {
                var targetedElement = $(this)[0];
                var draggedElement = ui.draggable[0];
                view.dropOnRow(draggedElement, targetedElement, 'Equipe', 'Reserve', 'Reserve');
            },
            accept: function(el) {
                return this.childElementCount < 3;
            }
        });
        var separationRow = displayElementOnParent('div', 'rowReserveSeparation', 'row seperation', '', parent);
        var reserveRow = displayElementOnParent('div', 'rowReserve', 'row', '', parent);
        reserveRow.droppable({
            drop: function(event, ui) {
                var targetedElement = $(this)[0];
                var draggedElement = ui.draggable[0];
                view.dropOnRow(draggedElement, targetedElement, 'Reserve', 'Equipe', 'Reserve');
            },
            accept: function(el) {
                return equipeRow.children().length > 1;
            }
        });
        var reserveTitleRow = displayElementOnParent('div', 'rowTitreReserve', 'row', 'Reserve', parent);
        var view = this;
        $.each(viewModelsEquipe, function(index) {
            view.populateReserveCol(this.id, equipeRow, this);
        });
        $.each(viewModelsReserve, function(index) {
            view.populateReserveCol(this.id, reserveRow, this);
        });
    },

    renderFusionMenu : function(viewModelsReserve) {
        var idModal = strModalMenuFusionTwoMonster;
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, strFusion);
        var fusionRow = displayElementOnParent('div', 'rowFusion', 'row', '', parent);
        var view = this;
        fusionRow.droppable({
            drop: function(event, ui) {
                var targetedElement = $(this)[0];
                var draggedElement = ui.draggable[0];
                view.dropOnRow(draggedElement, targetedElement, 'Fusion', 'ReserveFusion', 'ReserveFusion');
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
                view.dropOnRow(draggedElement, targetedElement, 'ReserveFusion', 'Fusion', 'ReserveFusion');
            },
        });
        var reserveTitleRow = displayElementOnParent('div', 'rowReserveTitre', 'row', 'Reserve', parent);
        var btnFusionner = displayButtons( strBtnFusionner, 'Fusionner', 'btn btn-danger col-sm-4', this.fuseTwoMonsters, parent).hide();
        $.each(viewModelsReserve, function(index) {
            view.populateReserveFusionCol(viewModelsReserve[index].id, reserveRow, viewModelsReserve[index], 'col-sm-6');
        });

    },

    renderFusionResultMenu : function (viewModel) {
        var idModal = strModalMenuResultFusion;
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(strModalMenuResultFusion, strFusionResult);
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
    },

    renderPotionMenu : function(objectName, effect, viewModels, controller) {
        var idModal = strModalMenuPotions;
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, strTitreModalPotion);
        $.each(viewModels, function(index) {
            var rowLabel = displayElementOnParent('div', 'Label' + viewModels[index].id + idModal, 'row', '', parent);
            var rowValue = displayElementOnParent('div', 'Value' + viewModels[index].id + idModal , 'row', '', parent);
                if (index == 0) {
                    displayElementOnParent('div', 'nom' + 'Label', 'col-sm-2', 'Nom', rowLabel);
                    displayElementOnParent('div', 'niveau' + 'Label', 'col-sm-2', 'Niveau', rowLabel);
                    displayElementOnParent('div', 'hp' + 'Label', 'col-sm-4', 'Hp', rowLabel);
                }
            displayElementOnParent('div', 'nom' + 'Value', 'col-sm-2', viewModels[index].Nom, rowValue);
            displayElementOnParent('div', 'niveau' + 'Value', 'col-sm-2', viewModels[index].Niveau, rowValue);
            var progressBar = displayProgressBar(viewModels[index].id + 'potionProgressBar', viewModels[index].CurrentHp, viewModels[index].Hp, rowValue);
            var btnSoigner = displayButtons ('btnCible' + viewModels[index].id , 'Soigner', 'btn btn-success col-sm-2', function () {
                effect(objectName, viewModels[index].id, progressBar);
                $("#" + idModal + " :button").prop("disabled", true);
                setTimeout(function (){
                    $('#' + idModal).modal('hide');
                    controller.view.renderItemMenu(controller.getItemMenuViewModel(), controller.getPotionMenuViewModel());
                    controller.view.render(controller.getMainMenuViewModel());
                }, 1000);
            }, rowValue)
            btnSoigner.css({
                'margin-left' : '2em'
            })
            if (viewModels[index].CurrentHp <= 0 || viewModels[index].CurrentHp == viewModels[index].Hp) {
                btnSoigner.prop( "disabled", true );
            }else {
                btnSoigner.prop( "disabled", false );
            }
        });
        $('#' + idModal).modal();
    },

    renderPotionManaMenu : function(objectName, effect, viewModels, controller) {
        var idModal = strModalMenuManaPotions;
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, strTitreModalPotion);
        $.each(viewModels, function(index) {
            var rowLabel = displayElementOnParent('div', 'Label' + viewModels[index].id + idModal, 'row', '', parent);
            var rowValue = displayElementOnParent('div', 'Value' + viewModels[index].id + idModal , 'row', '', parent);
            if (index == 0) {
                displayElementOnParent('div', 'nom' + 'Label', 'col-sm-2', 'Nom', rowLabel);
                displayElementOnParent('div', 'niveau' + 'Label', 'col-sm-2', 'Niveau', rowLabel);
                displayElementOnParent('div', 'mana' + 'Label', 'col-sm-4', 'Mana', rowLabel);
            }
            displayElementOnParent('div', 'nom' + 'Value', 'col-sm-2', viewModels[index].Nom, rowValue);
            displayElementOnParent('div', 'niveau' + 'Value', 'col-sm-2', viewModels[index].Niveau, rowValue);
            var progressBar = displayProgressBar(viewModels[index].id + 'potionProgressBar', viewModels[index].CurrentMana, viewModels[index].Mana, rowValue);
            var btnSoigner = displayButtons ('btnCible' + viewModels[index].id , 'Soigner', 'btn btn-success col-sm-2', function () {
                effect(objectName, viewModels[index].id, progressBar);
                $("#" + idModal + " :button").prop("disabled", true);
                setTimeout(function (){
                    $('#' + idModal).modal('hide');
                    controller.view.renderItemMenu(controller.getItemMenuViewModel(), controller.getPotionMenuViewModel());
                    controller.view.render(controller.getMainMenuViewModel());
                }, 1000);
            }, rowValue)
            btnSoigner.css({
                'margin-left' : '2em'
            })
            if (viewModels[index].CurrentMana == viewModels[index].Mana) {
                btnSoigner.prop( "disabled", true );
            }else {
                btnSoigner.prop( "disabled", false );
            }
        });
        $('#' + idModal).modal();
    },

    populateReserveFusionCol : function(idPlayer, parentRow, playerViewModel, colClass) {
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
    },

    populateReserveCol : function (idPlayer, parentRow, playerViewModel) {
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
    },
}
