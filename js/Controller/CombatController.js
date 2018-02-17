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
    this.userId;
    this.room;
    this.opponent;
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

    initDuel: function(user, carte, listPlayer, room) {
        this.opponent = user;
        this.room = room;
        var controller = this;
        $.each(listPlayer, function(){
            if (controller.listEquipe.find(x=>x.id === this.id)) {
                this.gentil = true;
            }else {
                this.gentil = false;
            }
        });
        $.each($('body').children(), function(index, child){
            child.remove();
        });
        this.online = true;
        this.listPlayer = listPlayer;
        this.listEnnemiesTotal = [];
        this.listEnnemies = [];
        this.listCapture = [];
        this.carte = carte;
        $.each(listPlayer, function(index){
            if (this.gentil === false) {
                controller.listEnnemies.push(this);
                controller.listEnnemiesTotal.push(this);
            }
        });
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
            if (player.gentil) {
                var playerGentil = GetListEquipe().find(x=>x.id == player.id);
                effect.effect(playerGentil, controllerCombat);
            }
            effect.effect(player, controllerCombat);
            var listPlayerKilled = controllerCombat.getListPlayer().filter(x=>x.currentHp <= 0);
            $.each(listPlayerKilled, function(index){
                controllerCombat.sortirPlayerCombat(this, controllerCombat);
            });
            player = controllerCombat.listPlayer[0];
        }
        if (player) {
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
                                var cibles;
                                if (skill.multiTarget) {
                                    cibles = controllerCombat.getListEnnemie();
                                }else {
                                    cibles = [controllerCombat.getListEnnemie().find(x=>x.id == $('#' + this.id.replace(strColonne, '')).attr('id'))];
                                }
                                $elementEnnemie.hover(
                                    function(){
                                        $.each(cibles, function() {
                                            controllerCombat.view.deplacerSelector(this);
                                        });
                                    }, function(){
                                        $.each(cibles, function() {
                                            controllerCombat.view.removeSelector(this);
                                        });
                                    }
                                );
                                $elementEnnemie.on('click', function(){
                                    controllerCombat.view.displayAutoCursor();
                                    $('#rowEnnemies').children().off();
                                    $('body').off();
                                    var attaqueResults = controllerCombat.generateAttaqueResults(playerCopy, cibles, skill, controllerCombat);
                                    if (controllerCombat.online) {
                                        var socket = io();
                                        var data = {attaqueResults: attaqueResults,  userId: controllerCombat.userId,
                                                    room : controllerCombat.room, sourceId : playerCopy.id, skillId : skill.id};
                                        socket.emit('action', data);
                                    }else {
                                        controllerCombat.attaque(attaqueResults, playerCopy.id, skill.id, controllerCombat);
                                    }
                                    $.each(cibles, function(){
                                        controllerCombat.view.removeSelector(this);
                                    })
                                });
                            });
                        };
                    })(player));
                }else {
                    btn.hide();
                }
            });

            // on bind les items et les btn
            if (controllerCombat.online == false) {
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

    generateAttaqueResults : function(source, listCible, skill, controllerCombat) {
        var result = {};
        var canPerformAttaque = (source.currentMana >= skill.manaCost);
        result.canPerformAttaque = canPerformAttaque;
        var outputs = [];
        if (canPerformAttaque) {
            var effect = AllEffects.find(x=>x.name == skill.effect);
            $.each(listCible, function(index){
                var output = {};
                var dammage = 0;
                output.cibleId = this.id;
                if (effect) {
                    output.changementEtatReussi = effect.calculReussite(this, this.listCapture, this.listReserve);
                    if (output.changementEtatReussi) {
                        output.etat = skill.effect;
                    }
                }
                if (skill.type == 'corpsACorps' || 'magie') {
                    if (skill.animationType == strProjectil) {
                        dammage = source.magie*skill.power;
                    }else {
                        dammage = source.force*skill.power;
                    }
                    output.dammage = Math.round(dammage);
                }
                outputs.push(output);
            });
            result.outputs = outputs;
        }

        return result;
    },

    attaque: function(attaqueResults, sourceId, skillId, controllerCombat) {
        if (attaqueResults.canPerformAttaque == true) {
            var source = controllerCombat.listPlayer.find(x=>x.id == sourceId);
            var skill = fetchSkill(skillId);
            var player = GetListEquipe().find(x=>x.id == sourceId);
            if (player) {
                player.currentMana -= skill.manaCost;
            }
            source.currentMana -= skill.manaCost;
            updateProgressBar(controllerCombat.view.getProgressBar(source, strCombat + 'Mana'), source.currentMana, source.mana);
            $.each(attaqueResults.outputs, function(){
                var cible = controllerCombat.listPlayer.find(x=>x.id == this.cibleId)
                skill.animation(source, cible, skill);
            });
            var intervalAttaqueDelay = setTimeout(function() {
                var textAttackDisplayDelay = 2000;
                $.each(attaqueResults.outputs, function(index){
                    var result = this;
                    var cible = controllerCombat.listPlayer.find(x=>x.id == this.cibleId)
                    var textAttackDisplay = '';
                    if (this.changementEtatReussi == true) {
                        textAttackDisplay = this.etat;
                    }else if (this.changementEtatReussi == false) {
                        textAttackDisplay = 'Echec';
                    }
                    controllerCombat.animateTextAttackDisplay(textAttackDisplay, textAttackDisplayDelay, cible, controllerCombat);
                    if (this.dammage > 0) {
                        setTimeout(function(){
                            controllerCombat.animateTextAttackDisplay(result.dammage, textAttackDisplayDelay, cible, controllerCombat);
                        }, 500);
                    }
                    var player = GetListEquipe().find(x=>x.id == cible.id);
                    if (player) {
                        controllerCombat.applyAttaque(this.changementEtatReussi, this.etat, this.dammage, player);
                    }
                    controllerCombat.applyAttaque(this.changementEtatReussi, this.etat, this.dammage, cible);
                });
                var intervalDammageDelay = setTimeout(function() {
                    $.each(attaqueResults.outputs, function(index){
                        var cible = controllerCombat.listPlayer.find(x=>x.id == this.cibleId)
                        if( cible.currentHp <= 0 ) {
                            controllerCombat.sortirPlayerCombat(cible, controllerCombat);
                        }
                        if (skill.id == strCapture && cible.etat == 'Capture') {
                            effectCapture(cible, controllerCombat);
                            controllerCombat.listMonstresCapture.push(cible.name);
                        }
                    });
                    controllerCombat.listPlayer.push(controllerCombat.listPlayer.shift());
                    controllerCombat.gererTourParTour(controllerCombat);
                }, textAttackDisplayDelay);
            }, skill.duration);
        }else {
            controllerCombat.view.showSkillNavBar(sourceId);
        }
    },

    applyAttaque: function(changementEtatReussi, etat, dammage, cible){
        if (changementEtatReussi) {
            cible.etat = etat;
        }
        cible.currentHp = cible.currentHp - dammage;
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
        var target = [];
        if (skill.multiTarget) {
            target = listPlayerAlive;
        }else {
            var cible = listPlayerAlive[entierAleatoire(0, listPlayerAlive.length - 1)];
            target.push(cible);
        }
        var attaqueResults = controllerCombat.generateAttaqueResults(ennemie, target, skill, controllerCombat);
        controllerCombat.attaque(attaqueResults, ennemie.id, skill.id, controllerCombat);
    },

    sortirPlayerCombat: function(player, controllerCombat) {
        document.getElementById(player.id + 'InfoRow').remove();
        document.getElementById('colonne' + player.id).remove();
        var indexPlayerDead = controllerCombat.listPlayer.findIndex(x => x.id == player.id);
        controllerCombat.listPlayer.splice(indexPlayerDead, 1);
        if (player.gentil == false) {
            var indexEnnemieDead = controllerCombat.listEnnemies.findIndex(x => x.id == player.id);
            controllerCombat.listEnnemies.splice(indexEnnemieDead, 1);
        }

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
