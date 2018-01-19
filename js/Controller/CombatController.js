var CombatController = function (view, listEquipe, Reserve, Items) {
    this.listEquipe = listEquipe;
    this.listPlayer = listEquipe.slice();
    this.listCapture = [];
    this.listEnnemies = [];
    this.listEnnemiesTotal = [];
    this.listCapture = [];
    this.reserve = Reserve;
    this.listItem = Items
    this.view = view;
};

CombatController.prototype = {

    init: function(carte) {
        var nombreEnnemieAuCombat = entierAleatoire(1, carte.nombreMaximumEnnemie);
        var listPlayerTemp = this.listPlayer;
        var listEnnemiesTemp = this.listEnnemies;
        var listEnnemiesTotalTemp = this.listEnnemiesTotal;
        for (var i = 0; i < nombreEnnemieAuCombat; i++) {
            var level = entierAleatoire(carte.levelMin, carte.levelMax);
            var indexEnnemieGenere = entierAleatoire(0, carte.listNomEnnemiePossible.length - 1);
            var ennemie = instancierPlayer(carte.listNomEnnemiePossible[indexEnnemieGenere], level, false);
            listPlayerTemp.push(ennemie);
            listEnnemiesTemp.push(ennemie);
            listEnnemiesTotalTemp.push(ennemie);
        }
    },

    getListEnnemie : function () {
        return this.listPlayer.filter(x=>x.gentil == false);
    },

    getListEquipe : function() {
        return this.listPlayer.filter(x=>x.gentil == true);
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
            result.push(new ViewModelInfoPlayer(this.listPlayer[i]));
        }

        return result;
    },

    getCombatUsableItems: function() {
        return this.listItem.filter(x => x.usableInCombat == true);
    },

    gererTourParTour: function (controllerCombat){
        if(controllerCombat.listEnnemies.length == 0) {
            controllerCombat.victoire(controllerCombat);
        }
        if(controllerCombat.listEquipe.filter(x => x.currentHp > 0).length == 0) {
            controllerCombat.view.displayGameOver();
        }
        var player = controllerCombat.listPlayer[0];
        if(player.gentil == true) {
            controllerCombat.view.showSkillNavBar(player.id);
        }else {
            var intervalAttaqueDelay = setTimeout(function() {
                controllerCombat.attaqueEnnemie(player, controllerCombat);
            }, 2000);
        }
        controllerCombat.view.displayFuturActions(controllerCombat.listPlayer, $('#' + strBottomRow));
    },

    fillSkillsBtn: function (i, controllerCombat) {
        return function() {
            var player = controllerCombat.listEquipe[i];
            controllerCombat.bindSkillsOnBtn(player, player.skills[0], controllerCombat);
        };
    },

    bindSkillsOnBtn : function(player, skill, controllerCombat) {
        var btn = $('#btn' + skill.id);
        btn.click( skill, function(){
            $('#buttonRow' + player.id).hide();
            controllerCombat.attaque(player, null, skill, controllerCombat);
        });
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
        );
        var controllerCombat = this;
        for (var i = 0; i < this.listEquipe.length; i++) {
            var player = this.listEquipe[i];

            // on bind les skills et les btn
            $.each(player.skills, function(j){
                var skill = player.skills[j];
                var btn = $('#btn' + skill.id + player.id);
                btn.click( skill, (function(playerCopy) {
                    return function(){
                        controllerCombat.handleContextMenu(controllerCombat, $('#rowEnnemies'));
                        controllerCombat.view.hideSkillNavBar(playerCopy.id);
                        controllerCombat.view.displayTargetCursor();
                        $.each($('#rowEnnemies').children(), function(k) {
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
                                var cible = controllerCombat.getListEnnemie().find(x=>x.id == $('#' + this.id.replace(strColonne, '')).attr('id'));
                                controllerCombat.view.displayAutoCursor();
                                $('#rowEnnemies').children().off();
                                $('body').off();
                                controllerCombat.attaque(playerCopy, cible, skill, controllerCombat);
                                controllerCombat.view.removeSelector(this);
                            });
                        });
                    };
                })(player));
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
                                controllerCombat.useObject(cible, item, controllerCombat);
                                controllerCombat.view.removeSelector(this);
                            });
                        });
                    };
                })(player));
            });
        }
        this.gererTourParTour(this);
    },

    handleContextMenu(controllerCombat, rowToUnbind) {
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
        item.effectInCombat(item.name, cible.id, controllerCombat.view.getProgressBar(cible, strCombat));
        controllerCombat.view.updateBtnItems(controllerCombat.listEquipe, controllerCombat.listItem);
        controllerCombat.listPlayer.push(controllerCombat.listPlayer.shift());
        controllerCombat.gererTourParTour(controllerCombat);
    },

    attaque: function(source, cible, skill, controllerCombat) {
        var listEnnemies = controllerCombat.listEnnemies;
        var listPlayer = controllerCombat.listPlayer;
        var listEquipe = controllerCombat.listEquipe;
        skill.animation(source, cible, skill);
        var intervalAttaqueDelay = setTimeout(function() {
            var dammage = 0;
            var dammageDelay = 2000;
            if (skill.animationType == strProjectil) {
                $("#" + skill.name + "Img").remove();
                dammage = source.magie*skill.power;
            }else {
                dammage = source.force*skill.power;
            }
            cible.currentHp = cible.currentHp - dammage;
            var cibleColonneElement = $('#colonne' + cible.id);
            var dammageElement = prependElementOnParent('div', 'dammage' + cible.id, 'dammageAnimated', dammage, cibleColonneElement);
            dammageElement.css({
                'left' : cibleColonneElement.width()/2 + 'px'
            });
            dammageElement.animate({
                top: -2 + 'em'
            }, dammageDelay, function (){
                dammageElement.remove();
            });
            if( cible.currentHp > 0 ) {
                updateProgressBar(controllerCombat.view.getProgressBar(cible, strCombat), cible.currentHp, cible.hp);
            }else {
                cible.currentHp = 0;
                updateProgressBar(controllerCombat.view.getProgressBar(cible, strCombat), cible.currentHp, cible.hp)
            }
            var intervalDammageDelay = setTimeout(function() {
                if( cible.currentHp <= 0 ) {
                    if (cible.gentil == false) {
                        controllerCombat.sortirEnnemieCombat(cible, controllerCombat);
                    }else {
                        listPlayer.splice(listPlayer.findIndex(x => x.id == cible.id), 1);
                    }
                }
                if (skill.id == 'capture' && controllerCombat.captureReussie(cible)) {
                    controllerCombat.capturerEnnemie(controllerCombat.sortirEnnemieCombat(cible, controllerCombat), controllerCombat.listCapture, controllerCombat.reserve);
                }
                listPlayer.push(listPlayer.shift());
                controllerCombat.gererTourParTour(controllerCombat);
            }, dammageDelay);
        }, skill.duration);
    },

    attaqueEnnemie: function(ennemie, controllerCombat) {
        var skill = skillChoisi(ennemie.skills);
        var listPlayerAlive = controllerCombat.listPlayer.filter(x => x.currentHp > 0 && x.gentil == true);
        var cible = listPlayerAlive[entierAleatoire(0, listPlayerAlive.length - 1)];
        controllerCombat.attaque(ennemie, cible, skill, controllerCombat);
    },

    sortirEnnemieCombat: function(ennemie, controllerCombat) {
        document.getElementById(ennemie.id + 'InfoRow').remove();
        document.getElementById('colonne' + ennemie.id).remove();
        var indexEnnemieDead = controllerCombat.listEnnemies.findIndex(x => x.id == ennemie.id);
        var indexPlayerDead = controllerCombat.listPlayer.findIndex(x => x.id == ennemie.id);
        controllerCombat.listPlayer.splice(indexPlayerDead, 1);
        controllerCombat.listEnnemies.splice(indexEnnemieDead, 1);

        return ennemie;
    },

    captureReussie: function(ennemie) {
        var rand = entierAleatoire(0, (ennemie.currentHp*100)/ennemie.hp)
        if (rand < 20) {
            return true;
        }

        return false;
    },

    capturerEnnemie: function(ennemie, listCapture, reserve) {
        ennemie.gentil = true;
        if (reserve.length < 9) {
            listCapture.push(ennemie);
        }else {
            alert('La reserve est pleine, le monstre est relache.');
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
        var experienceGagnee = controllerCombat.getExperienceGagnee(controllerCombat.listEnnemiesTotal);
        var lootedItems = controllerCombat.getLootedItems();
        reformateItems(lootedItems);
        Items = Items.concat(lootedItems);
        reformateItems(Items);
        controllerCombat.incrementerExperience(controllerCombat.listEquipe, experienceGagnee);
        $.each(controllerCombat.listCapture, function(index) {
            if (controllerCombat.listEquipe.length <= 2 ) {
                controllerCombat.listEquipe.push(controllerCombat.listCapture[index]);
            }else {
                controllerCombat.reserve.push(controllerCombat.listCapture[index]);
            }
        });
        controllerCombat.view.displayVictory(experienceGagnee, mapVictoireItemViewModel(lootedItems));
    },

    incrementerExperience: function(Equipe, expertienceGagnee) {
        $.each(Equipe, function(index) {
            Equipe[index].experience += expertienceGagnee;
            if (Equipe[index].experience >= Equipe[index].experienceNextLevel) {
                Equipe[index] = incrementerLevel(Equipe[index]);
            }
        });
    },
}
