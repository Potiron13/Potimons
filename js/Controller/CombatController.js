var CombatController = function (view, listEquipe, listReserve, listItem, initiliserWorldMap, listCarte, listMonstresCapture) {
    this.listEquipe = listEquipe;
    this.listPlayer;
    this.listCapture = [];
    this.listReserve = listReserve;
    this.listEnnemies = [];
    this.listEnnemiesTotal = [];
    this.listItem = listItem;
    this.view = view;
    this.initiliserWorldMap = initiliserWorldMap;
    this.listCarte = listCarte;
    this.carte;
    this.online = false;
    this.listMonstresCapture = listMonstresCapture;
};

CombatController.prototype = {

    init: function(carte) {
        $.each($('body').children(), function(index, child){
            child.remove();
        });
        this.carte = carte;
        var nombreEnnemieAuCombat = entierAleatoire(1, carte.nombreMaximumEnnemie);
        this.listPlayer = this.listEquipe.slice();
        this.listEnnemiesTotal = [];
        this.listEnnemies = [];
        this.listCapture = [];
        for (var i = 0; i < nombreEnnemieAuCombat; i++) {
            var level = entierAleatoire(carte.levelMin, carte.levelMax);
            var indexEnnemieGenere = entierAleatoire(0, carte.listNomEnnemiePossible.length - 1);
            var ennemie = instancierPlayer(carte.listNomEnnemiePossible[indexEnnemieGenere], level, false);
            this.listPlayer.push(ennemie);
            this.listEnnemies.push(ennemie);
            this.listEnnemiesTotal.push(ennemie);
        }
    },

    initDuel: function(user, carte) {
        $.each($('body').children(), function(index, child){
            child.remove();
        });
        var controller = this;
        this.online = true;
        this.listPlayer = this.listEquipe.slice();
        this.listEnnemiesTotal = [];
        this.listEnnemies = [];
        this.listCapture = [];
        this.carte = carte;
        $.each(user.equipe, function(index){
            this.gentil = false;
            controller.listPlayer.push(this);
            controller.listEnnemies.push(this);
            controller.listEnnemiesTotal.push(this);
        })
        controller.combat();
    },

    getListEnnemie : function () {
        return this.listPlayer.filter(x=>x.gentil == false);
    },

    getListEquipe : function() {
        return this.listEquipe;
    },

    getListPlayer : function() {
        return this.listPlayer;
    },

    getEnnemiInfoViewModel: function() {
        var result = [];
        for (var i = 0; i < this.listEnnemies.length; i++) {
            result.push(new ViewModelInfoEnnemie(this.listEnnemies[i]));
        }

        return result;
    },

    getEquipeInfoViewModel: function() {
        var result = [];
        for (var i = 0; i < this.getListEquipe().length; i++) {
            result.push(new ViewModelInfoPlayer(this.listEquipe[i]));
        }

        return result;
    },

    getVictoryItemViewModel: function(listItem) {
        var result = [];
        if (listItem) {
            $.each(listItem, function(index) {
                result.push(new ViewModelVictoireItem(listItem[index]))
            });
        }

        return result;
    },

    getEquipeVictoireViewModel: function() {
        var result = [];
        for (var i = 0; i < this.getListEquipe().length; i++) {
            result.push(new ViewModelVictoirePlayer(this.listEquipe[i]));
        }

        return result;
    },

    getCombatUsableItems: function() {
        return this.listItem.filter(x => x.usableInCombat == true);
    },

    gererTourParTour: function (controllerCombat){
        var player = controllerCombat.listPlayer[0];
        var effect = AllEffects.find(x=>x.name == player.etat);
        if (effect) {
            effect.effect(player, controllerCombat);
            var listPlayerKilled = controllerCombat.getListPlayer().filter(x=>x.currentHp <= 0);
            $.each(listPlayerKilled, function(index){
                controllerCombat.sortirEnnemieCombat(this, controllerCombat);
            });
            player = controllerCombat.listPlayer[0];
        }
        if (player) {
            console.log(controllerCombat.online);
            if(player.gentil == true) {
                controllerCombat.view.showSkillNavBar(player.id);
            }else if (controllerCombat.online === false) {
                var intervalAttaqueDelay = setTimeout(function() {
                    controllerCombat.attaqueEnnemie(player, controllerCombat);
                }, 2000);
            }
        }
        controllerCombat.view.displayFuturActions(controllerCombat.listPlayer, $('#' + strBottomRow));
        if(controllerCombat.listEnnemies.length == 0) {
            controllerCombat.victoire(controllerCombat);
        }
        if(controllerCombat.listEquipe.filter(x => x.currentHp > 0).length == 0) {
            controllerCombat.view.displayGameOver();
        }
    },

    combat : function() {
        var listEnnemies = this.listEnnemies;
        var _setSelectedEnnemie = this.setSelectedEnnemie;
        this.view.render(
            this.getEnnemiInfoViewModel(),
            this.getEquipeInfoViewModel(),
            this.getListEnnemie(),
            this.getListEquipe(),
            this.getListPlayer(),
            this.getCombatUsableItems(),
            this.carte.name,
        );
        var controllerCombat = this;
        for (var i = 0; i < this.listEquipe.length; i++) {
            var player = this.listEquipe[i];

            // on bind les skills et les btn
            $.each(player.skills, function(j){
                var skill = player.skills[j];
                var btn = $('#btn' + skill.id + player.id);
                if (!(skill.id === 'capture' && controllerCombat.online === true)) {
                    btn.click( skill, (function(playerCopy) {
                        return function(){
                            controllerCombat.handleContextMenu(controllerCombat, $('#rowEnnemies'));
                            controllerCombat.view.hideSkillNavBar(playerCopy.id);
                            controllerCombat.view.displayTargetCursor();
                            $.each($('#rowEnnemies').children(), function(k) {
                                var elementEnnemie = this;
                                var $elementEnnemie = $('#' + elementEnnemie.id);
                                if (skill.multiTarget) {
                                    $elementEnnemie.hover(
                                        function(){
                                            $.each(controllerCombat.getListEnnemie(), function() {
                                                controllerCombat.view.deplacerSelector(this);
                                            });
                                        }, function(){
                                            $.each(controllerCombat.getListEnnemie(), function() {
                                                controllerCombat.view.removeSelector(this);
                                            });
                                        }
                                    );
                                    $elementEnnemie.on('click', function(){
                                        var cibles = controllerCombat.getListEnnemie();
                                        controllerCombat.view.displayAutoCursor();
                                        $('#rowEnnemies').children().off();
                                        $('body').off();
                                        $.each(controllerCombat.getListEnnemie(), function(){
                                            controllerCombat.view.removeSelector(this);
                                        });
                                        controllerCombat.attaque(playerCopy, cibles, skill, controllerCombat);
                                    });
                                }else {
                                    $elementEnnemie.hover(
                                        function(){
                                            controllerCombat.view.deplacerSelector(this);
                                        }, function(){
                                            controllerCombat.view.removeSelector(this);
                                        }
                                    );
                                    $elementEnnemie.on('click', function(){
                                        var cible = controllerCombat.getListEnnemie().find(x=>x.id == $('#' + this.id.replace(strColonne, '')).attr('id'));
                                        controllerCombat.view.displayAutoCursor();
                                        $('#rowEnnemies').children().off();
                                        $('body').off();
                                        controllerCombat.attaque(playerCopy, [cible], skill, controllerCombat);
                                        controllerCombat.view.removeSelector(this);
                                    });
                                }
                            });
                        };
                    })(player));
                }else {
                    btn.hide();
                }
            });

            // on bind les items et les btn
            $.each(controllerCombat.getCombatUsableItems(), function(index) {
                var item = this;
                var btn = $('#btn' + item.id + player.id);
                btn.click( item, (function(playerCopy) {
                    return function(){
                        controllerCombat.handleContextMenu(controllerCombat, $('#equipeCol'));
                        controllerCombat.view.hideSkillNavBar(playerCopy.id);
                        controllerCombat.view.displayTargetCursor();
                        $.each($('#equipeCol').children(), function(k) {
                            var elementEnnemie = this;
                            var $elementEnnemie = $('#' + elementEnnemie.id);
                            $elementEnnemie.hover(
                                function(){
                                    controllerCombat.view.deplacerSelector(this);
                                }, function(){
                                    controllerCombat.view.removeSelector(this);
                                }
                            );
                            $elementEnnemie.on('click', function(){
                                var cible = controllerCombat.getListEquipe().find(x=>x.id == $('#' + this.id.replace(strColonne, '')).attr('id'));
                                controllerCombat.view.displayAutoCursor();
                                $('#equipeCol').children().off();
                                $('body').off();
                                controllerCombat.view.removeSelector(this);
                                if (cible.currentHp > 0) {
                                    controllerCombat.useObject(cible, item, controllerCombat);
                                }
                                controllerCombat.gererTourParTour(controllerCombat);
                            });
                        });
                    };
                })(player));
            });
        }
        this.gererTourParTour(this);
    },

    handleContextMenu: function(controllerCombat, rowToUnbind) {
        $('body').contextmenu(function(){
            $(this).off()
            rowToUnbind.children().off();
            controllerCombat.view.displayAutoCursor();
            controllerCombat.view.removeAllSelector();
            controllerCombat.view.showSkillNavBar(controllerCombat.listPlayer[0].id);
            return false;
        });
    },

    useObject: function(cible, item, controllerCombat) {
        item.effectInCombat(item.name, cible.id, controllerCombat.view.getProgressBar(cible, strCombat + item.category));
        controllerCombat.updateBtnItems(controllerCombat.listEquipe, controllerCombat.listItem);
        controllerCombat.listPlayer.push(controllerCombat.listPlayer.shift());
    },

    updateBtnItems : function(listPlayer, listItem){
        $.each(listItem, function(i) {
            var item = this;
            $.each(listPlayer, function(index){
                var player = this;
                var btn = $('#btn' +  item.id + player.id);
                btn.html(item.name + ' (x' + item.quantity + ')');
                if (item.quantity <= 0) {
                    btn.remove();
                }
            });
            if (item.quantity <= 0) {
                listItem.splice(listItem.findIndex(x => x.id == item.id), 1);
            }
        });
    },

    attaque: function(source, listCible, skill, controllerCombat) {
        var listEnnemies = controllerCombat.listEnnemies;
        var listPlayer = controllerCombat.listPlayer;
        var listEquipe = controllerCombat.listEquipe;
        var effect = AllEffects.find(x=>x.name == skill.effect);
        if (source.currentMana >= skill.manaCost) {
            source.currentMana -= skill.manaCost;
            updateProgressBar(controllerCombat.view.getProgressBar(source, strCombat + 'Mana'), source.currentMana, source.mana);
            $.each(listCible, function(){
                skill.animation(source, this, skill);
            });
            var intervalAttaqueDelay = setTimeout(function() {
                var textAttackDisplayDelay = 2000;
                $.each(listCible, function(index){
                    var changementEtatReussi;
                    if (effect) {
                        changementEtatReussi = effect.calculReussite(this, this.listCapture, this.listReserve);
                        if (changementEtatReussi) {
                            this.etat = skill.effect;
                        }
                    }
                    controllerCombat.handleDammage(source, this, skill, controllerCombat, changementEtatReussi, textAttackDisplayDelay);
                });
                var intervalDammageDelay = setTimeout(function() {
                    $.each(listCible, function(index){
                        if( this.currentHp <= 0 ) {
                            if (this.gentil == false) {
                                controllerCombat.sortirEnnemieCombat(this, controllerCombat);
                            }else {
                                listPlayer.splice(listPlayer.findIndex(x => x.id == this.id), 1);
                            }
                        }
                        if (skill.id == strCapture && this.etat == 'Capture') {
                            effect.effect(this, controllerCombat);
                            controllerCombat.listMonstresCapture.push(this.name);
                        }
                    });
                    listPlayer.push(listPlayer.shift());
                    controllerCombat.gererTourParTour(controllerCombat);
                }, textAttackDisplayDelay);
            }, skill.duration);
        }else {
            controllerCombat.view.showSkillNavBar(source.id);
        }
    },

    handleDammage : function(source, cible, skill, controllerCombat, changementEtatReussi, textAttackDisplayDelay) {
        // dammage ou capture
        var textAttackDisplay;
        if (skill.effect) {
            if (changementEtatReussi) {
                textAttackDisplay = skill.effect;
            }else {
                textAttackDisplay = 'Echec';
            }
        }else {
            if (skill.type == 'corpsACorps' || 'magie') {
                if (skill.animationType == strProjectil) {
                    textAttackDisplay = source.magie*skill.power;
                }else {
                    textAttackDisplay = source.force*skill.power;
                }
                cible.currentHp = cible.currentHp - textAttackDisplay;
            }
        }
        controllerCombat.animateTextAttackDisplay(textAttackDisplay, textAttackDisplayDelay, cible, controllerCombat);
    },

    animateTextAttackDisplay: function(textAttackDisplay, textAttackDisplayDelay, cible, controllerCombat){
        var cibleColonneElement = $('#colonne' + cible.id);
        var textAttackDisplayElement = prependElementOnParent('div', 'textAttackDisplay' + cible.id, 'dammageAnimated', textAttackDisplay, cibleColonneElement);
        textAttackDisplayElement.css({
            'left' : cibleColonneElement.width()/2 + 'px'
        });
        textAttackDisplayElement.animate({
            top: -2 + 'em'
        }, textAttackDisplayDelay, function (){
            textAttackDisplayElement.remove();
        });
        if( cible.currentHp > 0 ) {
            updateProgressBar(controllerCombat.view.getProgressBar(cible, strCombat + 'Hp'), cible.currentHp, cible.hp);
        }else {
            cible.currentHp = 0;
            updateProgressBar(controllerCombat.view.getProgressBar(cible, strCombat + 'Hp'), cible.currentHp, cible.hp)
        }
    },

    attaqueEnnemie: function(ennemie, controllerCombat) {
        var skill = skillChoisi(ennemie.skills.filter(x=>x.manaCost <= ennemie.currentMana));
        var listPlayerAlive = controllerCombat.listEquipe.filter(x => x.currentHp > 0 && x.gentil == true);
        if (!skill.multiTarget) {
            var cible = listPlayerAlive[entierAleatoire(0, listPlayerAlive.length - 1)];
            controllerCombat.attaque(ennemie, [cible], skill, controllerCombat, false);
        }else {
            controllerCombat.attaque(ennemie, listPlayerAlive, skill, controllerCombat, false);
        }
    },

    sortirEnnemieCombat: function(ennemie, controllerCombat) {
        document.getElementById(ennemie.id + 'InfoRow').remove();
        document.getElementById('colonne' + ennemie.id).remove();
        var indexEnnemieDead = controllerCombat.listEnnemies.findIndex(x => x.id == ennemie.id);
        var indexPlayerDead = controllerCombat.listPlayer.findIndex(x => x.id == ennemie.id);
        controllerCombat.listPlayer.splice(indexPlayerDead, 1);
        controllerCombat.listEnnemies.splice(indexEnnemieDead, 1);
    },

    getExperienceGagnee: function(listEnnemiesTotal) {
        var experienceGagnee = 0;
        $.each(listEnnemiesTotal, function(index) {
             experienceGagnee += listEnnemiesTotal[index].experienceDonnee;
        });

        return experienceGagnee;
    },

    getLootedItems: function(listEnnemiesTotal) {
        var lootedItems = [];
        $.each(listEnnemiesTotal, function(index) {
            var loot = fetchMonsterLoot(listEnnemiesTotal[index].name);
            $.each(loot, function(index) {
                if (isLootObtain(loot[index])) {
                   lootedItems.push(cloneItem(fetchItem(loot[index].item.id)));
                }
            });
        });

        return lootedItems;
    },

    victoire: function(controllerCombat) {
        var lootedItems = controllerCombat.getLootedItems(controllerCombat.listEnnemiesTotal);
        reformateItems(lootedItems);
        Array.prototype.push.apply(this.listItem, lootedItems)
        this.listItem = reformateItems(this.listItem);
        var experienceGagnee = controllerCombat.getExperienceGagnee(controllerCombat.listEnnemiesTotal);
        controllerCombat.view.displayVictory(experienceGagnee, controllerCombat.getVictoryItemViewModel(lootedItems), controllerCombat.getEquipeVictoireViewModel());
        setTimeout(function(){
            controllerCombat.incrementerExperience(controllerCombat, experienceGagnee);
            $.each(controllerCombat.listCapture, function(index) {
                if (controllerCombat.listEquipe.length <= 2 ) {
                    controllerCombat.listEquipe.push(controllerCombat.listCapture[index]);
                }else {
                    controllerCombat.listReserve.push(controllerCombat.listCapture[index]);
                }
            });
            controllerCombat.reinitialiserEtat(controllerCombat.getListEquipe());
        }, 1000);

        // a la fermeture de la modal
        $('#' + strModalMenuVictoire).on('hidden.bs.modal', function () {
            if (controllerCombat.listCarte.length == controllerCombat.listCarte.findIndex(x=>x.id == controllerCombat.carte.id) + 1) {
                controllerCombat.listCarte.push(generateCarte(controllerCombat.carte.id));
            }
            controllerCombat.initiliserWorldMap(controllerCombat.listCarte, controllerCombat.timeGame);
        });
    },

    incrementerExperience: function(controllerCombat, experienceGagnee) {
        $.each(controllerCombat.listEquipe, function(index) {
            var experienceRestante = experienceGagnee;
            do {
                if ((this.experience + experienceRestante) < this.experienceNextLevel) {
                    this.experience = this.experience + experienceRestante;
                    experienceRestante = 0;
                    updateProgressBar(controllerCombat.view.getProgressBar(this, strVictoire + 'Experience'), this.experience, this.experienceNextLevel);
                }else {
                    this.experience = this.experienceNextLevel;
                    experienceRestante = experienceRestante - (this.experienceNextLevel - this.experience);
                    //updateProgressBar(controllerCombat.view.getProgressBar(this, strVictoire + 'Experience'), this.experience, this.experienceNextLevel);
                    if (this.experience >= this.experienceNextLevel) {
                        var learnedSkills = [];
                        incrementerLevel(this, learnedSkills);
                        controllerCombat.view.animateLevelUp(this, learnedSkills);
                    }
                }
            } while (experienceRestante > 0);
        });
    },

    reinitialiserEtat(listPlayer) {
        $.each(listPlayer, function(index) {
            this.etat = '';
        });
    },
}
