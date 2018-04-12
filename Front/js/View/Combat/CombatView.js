var CombatView = function () {

}

CombatView.prototype = {

    render: function (viewModelInfoEnnemie, viewModelInfoEquipe, listEnnemies, listEquipe, listPlayer, listItem, mapName, online, arene) {
        document.body.style.backgroundImage = "url(Images/Maps/" + mapName + ".png)";
        document.body.style.height = '100%';        
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";        
        var container = displayElementOnParent('div', 'containerCombat', 'container-fluid', '', $('body'))
        var topRow = displayElementOnParent('div', "topRow", "row", "", container);        
        var mainRow = displayElementOnParent('div', "mainRow", "row", "", container);        
        var bottomRow = displayElementOnParent('div', "bottomRow", "row", "", container);
        var containerTopRow = displayElementOnParent('div', 'containerTopRow', 'container-fluid', '', topRow);
        var containerMainRow = displayElementOnParent('div', 'containerTopRow', 'container-fluid', '', mainRow);        
        var containerBottomRow = displayElementOnParent('div', 'containerTopRow', 'container-fluid', '', bottomRow);
        this.displayFuturActions(listPlayer, containerTopRow);
        var ennemieContainer = displayElementOnParent('div', 'ennemieContainer', 'row', '', containerTopRow);
        this.displayEnnemieInfo(viewModelInfoEnnemie, 'col-sm-4', ennemieContainer);
        var colonneEnnemies = displayElementOnParent('div', "colonneEnnemies", "col-sm-8 colonneEnnemies", "", ennemieContainer);
        var rowEnnemies = displayElementOnParent('div', "rowEnnemies", "row", "", colonneEnnemies);
        this.displayPlayerList(listEnnemies, rowEnnemies);
        var equipeContainer = displayElementOnParent('div', 'equipeContainer', 'row', '', containerMainRow);
        var equipeCol = displayElementOnParent('div', 'equipeCol', 'col-sm-8', '', equipeContainer);
        this.displayPlayerList(listEquipe, equipeCol);
        this.displayEquipeInfo(viewModelInfoEquipe, equipeContainer);
        this.displaySkillsNavBar(listEquipe, listItem, online, arene, containerBottomRow);
    },

    displayTargetCursor: function () {
        document.body.style.cursor = 'crosshair';
    },

    displayAutoCursor: function () {
        document.body.style.cursor = 'auto';
    },

    deplacerSelector: function (elementEnnemie) {
        $('#colonneSelector' + elementEnnemie.id.replace('colonne', '')).attr('class', 'col-sm-12 selector');
    },

    removeSelector: function (elementEnnemie) {
        $('#colonneSelector' + elementEnnemie.id.replace('colonne', '')).attr('class', 'col-sm-12 noSelector');
    },

    removeAllSelector: function () {
        $.each($('.selector'), function (index) {
            this.className = 'col-sm-12 noSelector';
        });
    },

    hideSkillNavBar: function (playerId) {
        $('#' + playerId + 'SkillsNavBarRow').hide();
    },

    showSkillNavBar: function (playerId) {
        $('#' + playerId + 'SkillsNavBarRow').show();
    },

    displayEnnemieInfo: function (viewModelInfoEnnemie, className, parent) {            
        var colInfoEnnemie = displayElementOnParent('div', 'colEnnemieInfo', className + ' combatInfoEnnemie', '', parent);
        var labelRow = displayElementOnParent('div', 'labelRowEnnemieInfo', 'row', '', colInfoEnnemie);
        $.each(viewModelInfoEnnemie, function (index) {
            var viewModel = viewModelInfoEnnemie[index];
            var infoRow = displayElementOnParent('div', viewModel.id + 'Info' + 'Row', 'row', '', colInfoEnnemie);
            if (index == 0) {
                var labelNomCol = displayElementOnParent('div', viewModel.id + 'labelNomCol', 'col-sm-4', 'Nom', labelRow);
                var labelHpManaCol = displayElementOnParent('div', viewModel.id + 'labelHpManaColInfo', 'col-sm-4', 'Hp/Mana', labelRow);
                var labelLevelCol = displayElementOnParent('div', viewModel.id + 'labelLevelColInfo', 'col-sm-4', 'Niv', labelRow);                
            }
            var valueNomCol = displayElementOnParent('div', viewModel.id + 'valueNomCol' + viewModel.id, 'col-sm-4', viewModel.Nom, infoRow);
            var valueHpManaCol = displayElementOnParent('div', viewModel.id + 'valueHpManaCol' + viewModel.id, 'col-sm-4', '', infoRow);
            var hpContainerRow = displayElementOnParent('div', viewModel.id + 'hpContainerRow', 'row', '', valueHpManaCol);
            var manaContainerRow = displayElementOnParent('div', viewModel.id + 'manaContainerRow', 'row', '', valueHpManaCol);
            displayProgressBar(viewModel.id + strProgressBar + strCombat + 'Hp', viewModel.CurrentHp, viewModel.Hp, 'col-sm-12 clearMargin', hpContainerRow);
            displayProgressBar(viewModel.id + strProgressBar + strCombat + 'Mana', viewModel.CurrentMana, viewModel.Mana, 'col-sm-12', manaContainerRow);
            displayElementOnParent('div', viewModel.id + 'valueLevelCol', 'col-sm-4', viewModel.Niv, infoRow);            
        });
    },

    displayEquipeInfo: function (viewModelsInfoPlayer, parent) {
        var colInfoEquipe = displayElementOnParent('div', 'colInfoEquipe', 'col-sm-4 combatInfoEquipe', '', parent);
        var labelRow = displayElementOnParent('div', 'labelRowInfo', 'row', '', colInfoEquipe);
        $.each(viewModelsInfoPlayer, function (index) {
            var viewModel = viewModelsInfoPlayer[index];
            var infoRow = displayElementOnParent('div', viewModel.id + 'Info' + 'Row', 'row', '', colInfoEquipe);
            if (index == 0) {
                var labelNomCol = displayElementOnParent('div', viewModel.id + 'labelNomCol', 'col-sm-4', 'Nom', labelRow);
                var labelHpManaCol = displayElementOnParent('div', viewModel.id + 'labelHpManaCol' + viewModel.id, 'col-sm-4', 'Hp/Mana', labelRow);
                var labelLevelCol = displayElementOnParent('div', viewModel.id + 'labelLevelColInfo', 'col-sm-4', 'Niv', labelRow);                
            }
            var valueNomCol = displayElementOnParent('div', viewModel.id + 'valueNomCol' + viewModel.id, 'col-sm-4', viewModel.Nom, infoRow);
            var valueHpManaCol = displayElementOnParent('div', viewModel.id + 'valueHpManaCol' + viewModel.id, 'col-sm-4', '', infoRow);
            var hpContainerRow = displayElementOnParent('div', viewModel.id + 'hpContainerRow', 'row', '', valueHpManaCol);
            var manaContainerRow = displayElementOnParent('div', viewModel.id + 'manaContainerRow', 'row', '', valueHpManaCol);
            displayProgressBar(viewModel.id + strProgressBar + strCombat + 'Hp', viewModel.CurrentHp, viewModel.Hp, 'col-sm-12 clearMargin', hpContainerRow);
            displayProgressBar(viewModel.id + strProgressBar + strCombat + 'Mana', viewModel.CurrentMana, viewModel.Mana, 'col-sm-12', manaContainerRow);
            displayElementOnParent('div', viewModel.id + 'valueLevelCol', 'col-sm-4', viewModel.Niv, infoRow);            
        });
        colInfoEquipe.css({
            top: $('#equipeCol').height() - colInfoEquipe.height() + 'px'
        });
    },

    getProgressBar: function (player, type) {
        return document.getElementById(player.id + strProgressBar + type);
    },

    displayPlayerList: function (listPlayer, parent) {
        $.each(listPlayer, function (index) {
            var player = this;
            var colonnePlayer = displayElementOnParent('div', "colonne" + player.id, 'col-sm-' + 12 / listPlayer.length, '', parent);
            var colonneEtat = displayElementOnParent('div', "colonneEtat" + player.id, 'col-sm-12' + ' etat', '', colonnePlayer);
            var imgEtat = displayElementOnParent('img', "imgEtat" + player.id, 'col-sm-offset-4', '', colonneEtat);
            imgEtat.css({height: '100%'});
            var colonneSelector = displayElementOnParent('div', "colonneSelector" + player.id, 'col-sm-12' + ' noSelector', '', colonnePlayer);
            var colImage = displayElementOnParent('div', player.id, "col-sm-12 colonneIdle text-center", "", colonnePlayer);
            var playerImg = document.createElement('img');
            var playerHeight = 0;
            playerImg.src = player.gentil ? player.srcDos : player.src;
            if (this.height >= 10 && this.height <= 15) {
                playerHeight = this.height;
            } else if (this.height <= 10) {
                playerHeight = 10;
            } else {
                playerHeight = 15;
            }
            playerImg.style.height = playerHeight + 'em';
            setTimeout(function () {
                var colId = (player.gentil === true) ? 'equipeCol' : 'colonneEnnemies';
                colonnePlayer.css({
                    top: $('#' + colId).height() - colonnePlayer.height() + 'px'
                });
            }, 10)
            colImage.append(playerImg);
        });
    },

    displaySkillsNavBar: function (listPlayer, listItem, online, arene, parent) {
        for (var i = 0; i < listPlayer.length; i++) {
            var player = listPlayer[i];
            var playerSkillsNavBarRow = displayElementOnParent('div', player.id + 'SkillsNavBarRow', "row blueBackGround", "", parent);
            playerSkillsNavBarRow.css({height: '300px'});
            var ulElement = displayElementOnParent('ul', player.id + 'SkillsNavBarUl', 'nav nav-tabs', '', playerSkillsNavBarRow);
            this.displayTab(player, 'Attaque', '#corpsACorps', true, ulElement, playerSkillsNavBarRow, this.displayBtnSkills);
            this.displayTab(player, 'Magie', '#magie', false, ulElement, playerSkillsNavBarRow, this.displayBtnSkills);
            if (online === false && arene === false) {
                this.displayTab(player, 'Objets', '#objet', false, ulElement, playerSkillsNavBarRow, this.displayBtnItems, listItem);
            }
            this.hideSkillNavBar(player.id);
        }
    },

    displayTab: function (player, title, linkId, isActive, parent, parentContent, fillContent, listItem) {
        var activeClass = isActive ? 'active' : '';
        var id = linkId.replace('#', '');
        var liCorpsACorpsElement = displayElementOnParent('li', player.id + 'li' + title + id, activeClass, '', parent);
        var aElement = displayElementOnParent('a', player.id + 'a' + title + id, '', title, liCorpsACorpsElement);
        aElement.attr('data-toggle', 'tab');
        aElement.attr('href', linkId + player.id);
        this.displayTabContent(player, id, isActive, parentContent, fillContent, listItem);
    },

    displayTabContent: function (player, id, isActive, parent, fillContent, listItem) {
        var activeClass = isActive ? 'in active' : '';
        var tabContentContainer;
        if ($('#' + player.id + 'tabContentContainer').length) {
            tabContentContainer = $('#' + player.id + 'tabContentContainer');
        } else {
            tabContentContainer = displayElementOnParent('div', player.id + 'tabContentContainer', 'tab-content', '', parent);
        }
        var tabContent = displayElementOnParent('div', id + player.id, 'tab-pane fade ' + activeClass, '', tabContentContainer);
        fillContent(player, id, tabContent, listItem);
    },

    displayBtnSkills: function (player, type, parent) {
        var skills = player.skills.filter(x => x.type == type);
        var className = (type === 'magie') ? 'btnRed' : '';
        $.each(skills, function (index) {            
            displayButtons('btn' + skills[index].id + player.id, skills[index].name, "col-sm-3 " + className,
                null, parent);
        });
    },

    displayBtnItems: function (player, id, parent, listItem) {
        $.each(listItem, function (index) {
            var item = listItem[index];
            displayButtons('btn' + item.id + player.id, item.name + ' (x' + item.quantity + ')', 'col-sm-4 btn btn-success btnCombat',
                null, parent);
        });
    },

    displayFuturActions: function (listPlayer, parent) {
        var futurActionsRow;
        if ($('#' + strFutureActionsRow).length) {
            $('#' + strFutureActionsRow).empty();
            futurActionsRow = $('#' + strFutureActionsRow);
        } else {
            futurActionsRow = displayElementOnParent('div', strFutureActionsRow, 'row', '', parent);
        }
        $.each(listPlayer, function (index) {
            var player = listPlayer[index];
            var cssClass = player.gentil ? strPortaitContainerGentil : strPortaitContainerEnnemie;
            var portraitCol = displayElementOnParent('div', player.id + 'portaitColonne', 'col-sm-1 clearMargin clearPadding', '', futurActionsRow);
            var portaintContainer = displayElementOnParent('div', player.id + 'portaintContainer', cssClass, '', portraitCol);
            var portraitImg = document.createElement('img');
            portraitImg.style.width = '100%';
            portraitImg.src = player.srcPortrait;
            portaintContainer.append(portraitImg);
        });
    },

    displayGameOver: function () {
        document.body.innerHTML = "";
        document.body.innerHTML = "GAME OVER";
        document.body.style.height = "600px";
        document.body.style.fontSize = "200px";
        document.body.style.marginTop = "200px";
        document.body.style.textAlign = "center";
    },

    displayVictory: function (experienceGagnee, potiflouzGagnee, itemsVictoireViewModels, equipeVictoireViewModel) {
        var idModal = strModalMenuVictoire;
        if ($('#' + idModal).length) {
            $('#' + idModal).empty();
        }
        var parent = createModal(idModal, 'Victoire !');
        var experienceRow = displayElementOnParent('div', 'ExperienceGagnee' + idModal, 'row', '', parent);
        var experienceLabelCol = displayElementOnParent('div', 'ExperienceGagnee' + idModal, 'col-sm-6', 'Experience gagnee : ' + experienceGagnee + 'xp', experienceRow);
        var potiflouzLabelCol = displayElementOnParent('div', 'PotiflouzGagnee' + idModal, 'col-sm-6', 'Potiflouz gagnee : ' + potiflouzGagnee + '$', experienceRow);
        var separationRowExprienceItem = displayElementOnParent('div', 'rowVcitoireSeparationExprienceItem', 'row separation', '', parent);
        $.each(itemsVictoireViewModels, function (index) {
            var rowLabel = displayElementOnParent('div', 'Label' + itemsVictoireViewModels[index].id + idModal, 'row', '', parent);
            var rowValue = displayElementOnParent('div', 'Value' + itemsVictoireViewModels[index].id + idModal, 'row', '', parent);
            $.each(itemsVictoireViewModels[index], function (label, value) {
                if (index == 0) {
                    displayElementOnParent('div', label + 'Label', 'col-sm-6', label, rowLabel);
                }
                displayElementOnParent('div', label + 'Value', 'col-sm-6', value, rowValue);
            });
        });

        var separationRowItemPlayer = displayElementOnParent('div', 'rowVcitoireSeparationItemPlayer', 'row separation', '', parent);
        $.each(equipeVictoireViewModel, function (index) {
            var playerVictoireViewModel = equipeVictoireViewModel[index];
            var rowLabel = displayElementOnParent('div', 'Label' + playerVictoireViewModel.id + idModal, 'row', '', parent);
            var rowValue = displayElementOnParent('div', 'Value' + playerVictoireViewModel.id + idModal, 'row', '', parent);
            if (index == 0) {
                displayElementOnParent('div', 'NomPlayerVictoire' + 'Label', 'col-sm-2', 'Nom', rowLabel);
                displayElementOnParent('div', 'NiveauPlayerVictoire' + 'Label', 'col-sm-2', 'Niveau', rowLabel);
                displayElementOnParent('div', 'PortraitPlayerVictoire' + 'Label', 'col-sm-4', '', rowLabel);
                displayElementOnParent('div', 'ExperiencePlayerVictoire' + 'Label', 'col-sm-4', 'Experience', rowLabel);
            }
            displayElementOnParent('div', 'NomPlayerVictoireValue' + playerVictoireViewModel.id, 'col-sm-2', playerVictoireViewModel.Nom, rowValue);
            displayElementOnParent('div', 'NiveauPlayerVictoireValue' + playerVictoireViewModel.id, 'col-sm-2', playerVictoireViewModel.Niveau, rowValue);
            var colImage = displayElementOnParent('div', 'ContainerPlayerVictoireImg' + playerVictoireViewModel.id, "col-sm-4", "", rowValue);
            var portraitImg = document.createElement('img');
            portraitImg.src = playerVictoireViewModel.Portrait;
            colImage.append(portraitImg);
            var expProgressBar = displayProgressBar(playerVictoireViewModel.id + strProgressBar + strVictoire + 'Experience', playerVictoireViewModel.ExperienceActuelle, playerVictoireViewModel.ExperienceSuivant, 'col-sm-4', rowValue)
            changeProgressBarHeight(expProgressBar, '50px');
        });

        $('#' + idModal).modal();
    },

    updateEtat: function (players) {
        $.each(players, function () {
            if(this.etat) {
                $('#imgEtat' + this.id).attr('src', '../Images/Ui/' + this.etat + '.png');
            }            
        })
    },

    animateLevelUp(player, learnedSkills) {
        var levelElement = $('#NiveauPlayerVictoireValue' + player.id);
        levelElement.html(player.level);
        var levelDisplayElement = prependElementOnParent('div', 'levelDisplay' + player.id, '', 'Level up !', levelElement);
        levelDisplayElement.css({
            'left': levelElement.width() / 2 + 'px',
            'position': 'absolute'
        });
        levelDisplayElement.animate({
            top: -2 + 'em'
        }, 1000, function () {
            levelDisplayElement.remove();
        });

        var portraitElement = $('#ContainerPlayerVictoireImg' + player.id);
        $.each(learnedSkills, function (index) {
            var skill = this;
            setTimeout(function () {
                var skillDisplayElement = prependElementOnParent('div', 'skillDisplay' + skill + player.id, '',
                    player.name + ' apprend : ' + skill, levelElement);
                skillDisplayElement.css({
                    'left': portraitElement.width() + 10 + 'px',
                    'position': 'absolute'
                });
                skillDisplayElement.animate({
                    top: -4 + 'em'
                }, 2000, function () {
                    skillDisplayElement.remove();
                });
            }, 2000 * (index + 1));
        });
    },

    displayQTE: function (parent) {
        var progress = displayElementOnParent('div', 'qteProgress', 'col-sm-6 progress', '', parent);
        var bar = displayElementOnParent('div', 'qteBar', 'bar', '', progress);
    },

    removeQTE: function (intervalId) {
        clearInterval(intervalId);
        $('#qteProgress').remove();
    },
}
