var CombatView = function (carte) {
    this.carte = carte;
}

CombatView.prototype = {

    render : function (viewModelInfoEnnemie, viewModelInfoEquipe, listEnnemies, listEquipe, listPlayer, listItem) {
        document.body.style.backgroundImage =  "url(Images/plaine.png)";
        document.body.style.backgroundRepeat = "repeat-n";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.transform = "";
        var topRow = displayElementOnParent('div', "topRow", "row", "", $("body"));
        var mainRow = displayElementOnParent('div', "mainRow", "row", "", $("body"));
        var bottomRow = displayElementOnParent('div', "bottomRow", "row", "", $("body"));
        this.displayFuturActions(listPlayer, topRow);
        this.displayEnnemieInfo(viewModelInfoEnnemie, topRow);
        var colonneEnnemies = displayElementOnParent('div', "colonneEnnemies", "col-sm-8 colonneEnnemies", "", topRow);
        var rowEnnemies = displayElementOnParent('div', "rowEnnemies", "row", "", colonneEnnemies);
        this.displayPlayerList(listEnnemies, rowEnnemies);
        var equipeCol = displayElementOnParent('div', 'equipeCol', 'col-sm-8', "", mainRow);
        this.displayPlayerList(listEquipe, equipeCol);
        this.displayEquipeInfo(viewModelInfoEquipe, mainRow);
        this.displaySkillsNavBar(listEquipe, listItem, bottomRow);
    },

    displayTargetCursor : function () {
        document.body.style.cursor = 'crosshair';
    },

    displayAutoCursor : function () {
        document.body.style.cursor = 'auto';
    },

    deplacerSelector : function(elementEnnemie) {
        $('#colonneSelector' + elementEnnemie.id.replace('colonne','')).attr('class', 'col-sm-12 selector');
    },

    removeSelector : function(elementEnnemie) {
        $('#colonneSelector' + elementEnnemie.id.replace('colonne', '')).attr('class', 'col-sm-12 noSelector');
    },

    removeAllSelector : function() {
        $.each($('.selector'), function(index) {
            this.className = 'col-sm-12 noSelector';
        });
    },

    hideSkillNavBar : function(playerId) {
        $('#' + playerId + 'SkillsNavBarRow').hide();
    },

    showSkillNavBar : function(playerId) {
        $('#' + playerId + 'SkillsNavBarRow').show();
    },

    displayEnnemieInfo : function (viewModelInfoEnnemie, parent) {
        var colInfoEnnemie = displayElementOnParent('div', 'colEnnemieInfo', 'col-sm-4 combatInfo', '', parent);
        var labelRow = displayElementOnParent('div', 'labelRowEnnemieInfo', 'row', '', colInfoEnnemie);
        $.each(viewModelInfoEnnemie, function(index) {
            var viewModel = viewModelInfoEnnemie[index];
            var infoRow = displayElementOnParent('div', viewModel.id + 'Info' + 'Row', 'row', '', colInfoEnnemie);
            if (index == 0) {
                var labelNomCol = displayElementOnParent('div', viewModel.id + 'labelNomCol', 'col-sm-6', 'Nom', labelRow);
                var labelHpCol = displayElementOnParent('div', viewModel.id + 'labelHpColInfo', 'col-sm-6', 'Hp', labelRow);
            }
            var valueNomCol = displayElementOnParent('div', viewModel.id + 'valueNomCol' + viewModel.id, 'col-sm-6', viewModel.Nom, infoRow);
            displayProgressBar(viewModel.id + strCombat + strProgressBar, viewModel.CurrentHp, viewModel.Hp, infoRow)
        });
    },

    displayEquipeInfo : function (viewModelsInfoPlayer, parent) {
        var colInfoEquipe = displayElementOnParent('div', 'colInfoEquipe', 'col-sm-4 combatInfo', '', parent);
        var labelRow = displayElementOnParent('div', 'labelRowInfo', 'row', '', colInfoEquipe);
        $.each(viewModelsInfoPlayer, function(index) {
            var viewModel = viewModelsInfoPlayer[index];
            var infoRow = displayElementOnParent('div', viewModel.id + 'Info' + 'Row', 'row', '', colInfoEquipe);
            if (index == 0) {
                var labelNomCol = displayElementOnParent('div', viewModel.id + 'labelNomCol', 'col-sm-6', 'Nom', labelRow);
                var labelHpCol = displayElementOnParent('div', viewModel.id + 'labelHpColInfo', 'col-sm-6', 'Hp', labelRow);
            }
            var valueNomCol = displayElementOnParent('div', viewModel.id + 'valueNomCol' + viewModel.id, 'col-sm-6', viewModel.Nom, infoRow);
            displayProgressBar(viewModel.id + strCombat + strProgressBar, viewModel.CurrentHp, viewModel.Hp, infoRow)
        });
    },

    getProgressBar(player, type) {
        return document.getElementById(player.id + type + strProgressBar);
    },

    displayPlayerList : function (listPlayer, parent) {
        $.each(listPlayer, function(index){
            var colonnePlayer = displayElementOnParent('div', "colonne" + listPlayer[index].id, 'col-sm-' + 12/listPlayer.length, '', parent);
            var colonneSelector = displayElementOnParent('div', "colonneSelector" + listPlayer[index].id, 'col-sm-' + 12/listPlayer.length + ' noSelector', '', colonnePlayer);
            var colImage = displayElementOnParent('div', listPlayer[index].id, "col-sm-12 colonneIdle text-center", "", colonnePlayer);
            var playerImg = document.createElement('img');
            playerImg.src =  listPlayer[index].gentil ? listPlayer[index].srcDos : listPlayer[index].src;
            colImage.append(playerImg);
        });
    },

    displaySkillsNavBar : function(listPlayer, listItem, parent) {
        for (var i = 0; i < listPlayer.length; i++) {
            var player = listPlayer[i];
            var playerSkillsNavBarRow = displayElementOnParent('div', player.id + 'SkillsNavBarRow', "row", "", parent);
            var ulElement = displayElementOnParent('ul', player.id + 'SkillsNavBarUl', 'nav nav-tabs', '', playerSkillsNavBarRow);
            this.displayTab(player, 'Attaque', '#corpsACorps', true, ulElement, playerSkillsNavBarRow, this.displayBtnSkills);
            this.displayTab(player, 'Magie', '#magie', false, ulElement, playerSkillsNavBarRow, this.displayBtnSkills);
            this.displayTab(player, 'Objets', '#objet', false, ulElement, playerSkillsNavBarRow, this.displayBtnItems, listItem);
            this.hideSkillNavBar(player.id);
        }
    },

    displayTab : function(player, title, linkId, isActive, parent, parentContent, fillContent, listItem){
        var activeClass = isActive ? 'active' : '';
        var id = linkId.replace('#', '');
        var liCorpsACorpsElement = displayElementOnParent('li', player.id + 'li' + title + id, activeClass, '', parent);
        var aElement = displayElementOnParent('a', player.id + 'a' + title + id , '', title, liCorpsACorpsElement);
        aElement.attr('data-toggle','tab');
        aElement.attr('href', linkId + player.id);
        this.displayTabContent(player, id, isActive, parentContent, fillContent, listItem);
    },

    displayTabContent : function(player, id, isActive, parent, fillContent, listItem){
        var activeClass = isActive ? 'in active' : '';
        var tabContentContainer;
        if ($('#' + player.id + 'tabContentContainer').length) {
            tabContentContainer = $('#' + player.id + 'tabContentContainer');
        }else {
            tabContentContainer = displayElementOnParent('div', player.id + 'tabContentContainer', 'tab-content', '', parent);
        }
        var tabContent = displayElementOnParent('div', id + player.id, 'tab-pane fade ' + activeClass, '', tabContentContainer);
        fillContent(player, id, tabContent, listItem);
    },

    displayBtnSkills : function (player, type, parent) {
        var skills = player.skills.filter(x=>x.type == type);
        $.each(skills, function(index) {
            displayButtons( 'btn' + skills[index].id + player.id, skills[index].name, (skills[index].type == "magie") ? "col-sm-3 btn btn-danger btnCombat" : "col-sm-3 btn btn-success btnCombat",
            null, parent);
        });
    },

    displayBtnItems : function(player, id, parent, listItem){
        $.each(listItem, function(index) {
            var item = listItem[index];
            displayButtons( 'btn' + item.id + player.id, item.name + ' (x' + item.quantity + ')', 'col-sm-3 btn btn-success btnCombat',
            null, parent);
        });
    },

    updateBtnItems : function(listPlayer, listItem){
        $.each(listPlayer, function(index){
            var player = listPlayer[index];
            $.each(listItem, function(i) {
                var item = listItem[i];
                var btn = $('#btn' +  item.id + player.id);
                btn.html(item.name + ' (x' + item.quantity + ')');
                if (item.quantity <= 0) {
                    btn.prop( "disabled", true );
                }else {
                    btn.prop( "disabled", false );
                }
            });
        })
    },

    displayFuturActions : function(listPlayer, parent) {
        var futurActionsRow;
        if ($('#' + strFutureActionsRow).length) {
            $('#' + strFutureActionsRow).empty();
            futurActionsRow = $('#' + strFutureActionsRow);
        }else {
            futurActionsRow = displayElementOnParent('div', strFutureActionsRow, 'row', '', parent);
        }
        $.each(listPlayer, function(index){
            var player = listPlayer[index];
            var cssClass = player.gentil ? strPortaitContainerGentil : strPortaitContainerEnnemie;
            var portraitCol = displayElementOnParent('div', player.id + 'portaitColonne', 'col-sm-2 clearMargin clearPadding', '', futurActionsRow);
            var portaintContainer = displayElementOnParent('div', player.id + 'portaintContainer', cssClass, '', portraitCol);
            var portraitImg =  document.createElement('img');
            portraitImg.style.height = '100%';
            portraitImg.src = player.srcPortrait;
            portaintContainer.append(portraitImg);
        });
    },

    displayGameOver: function() {
        document.body.innerHTML = "";
        document.body.innerHTML = "GAME OVER";
        document.body.style.height = "600px";
        document.body.style.fontSize = "200px";
        document.body.style.marginTop = "200px";
        document.body.style.textAlign = "center";
    },

    displayVictory: function(experienceGagnee, victoireItemViewModel) {
        $('div').each(function(i){
            if (this.id != 'potironWolrdMap' && this.id != 'cristalSauvegarde') {
                this.remove();
            }
        });
        initialiserVictoireMenu(experienceGagnee, victoireItemViewModel);
        $('#modalMenuVictoire').on('hidden.bs.modal', function () {
            initialiserWorldMap(Equipe);
        });
    }
}
