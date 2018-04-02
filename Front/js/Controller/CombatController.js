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
    this.intervalId;
    this.tempStats = [];
    this.buffs = [];
    this.debuffs = [];
};

CombatController.prototype = {

    init: function(carte) {
        $.each($('body').children(), function(index, child){
            child.remove();
        });
        var controller = this;
        this.carte = carte;
        var nombreEnnemieAuCombat = this.getListEquipe().length;
        this.listPlayer = this.getListEquipe();
        this.listEnnemiesTotal = [];
        this.listEnnemies = [];
        this.listCapture = [];
        var data = [];
        for (let i = 0; i < nombreEnnemieAuCombat; i++) {
            var level = entierAleatoire(carte.levelMin, carte.levelMax);
            var indexEnnemieGenere = entierAleatoire(0, carte.listIdEnnemiePossible.length - 1);
            data.push({ id : carte.listIdEnnemiePossible[indexEnnemieGenere], level : level});   
        }
        instancierMultipleInGameEnnemiePotimon(data, this);
    },

    initDuel: function(user, carte, listPlayer, room) {
        this.opponent = user;
        this.room = room;
        var controller = this;
        $.each(listPlayer, function(){
            if (controller.getListEquipe().find(x=>x.id === this.id)) {
                this.gentil = true;
            }else {
                this.gentil = false;
            }
        });
        $.each($('body').children(), function(index, child){
            child.remove();
        });
        this.online = true;
        this.listPlayer = listPlayer.filter(x=>x.currentHp > 0);
        this.listEnnemiesTotal = [];
        this.listEnnemies = [];
        this.listCapture = [];
        this.carte = carte;
        $.each(listPlayer.filter(x=>x.currentHp > 0), function(index){
            if (this.gentil === false) {
                controller.listEnnemies.push(this);
                controller.listEnnemiesTotal.push(this);
            }
        });
        this.listPlayer.sort(function(a, b){ return b.speed - a.speed});
        this.listEnnemies.sort(function(a, b){ return b.speed - a.speed});
        this.getListEquipe().sort(function(a, b){ return b.speed - a.speed});
        controller.combat();
    },

    getListEnnemie : function () {
        return this.listPlayer.filter(x=>x.gentil == false);
    },

    getListEquipe : function() {
        return this.listEquipe.filter(x=>x.currentHp > 0);
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
        var equipe = this.getListEquipe();
        for (var i = 0; i < equipe.length; i++) {
            result.push(new ViewModelInfoPlayer(equipe[i]));
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
        var equipe = this.getListEquipe();
        for (var i = 0; i < equipe.length; i++) {
            result.push(new ViewModelVictoirePlayer(equipe[i]));
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
            setTimeout(function(){
                effect.effect(player, controllerCombat);       
                var listPlayerKilled = controllerCombat.getListPlayer().filter(x=>x.currentHp <= 0);
                $.each(listPlayerKilled, function(index){
                    controllerCombat.sortirPlayerCombat(this, controllerCombat);
                });
                player = controllerCombat.listPlayer[0];     
                if(player) {                
                    if (effect.name === strDodo || effect.name === strConfusion || effect.name === strParalysie) {                    
                        setTimeout(function(){
                            var textAttackDisplay = '';
                            if(effect.name === strDodo) {
                                textAttackDisplay = 'zzZZZzzz';
                            }else if(effect.name === strConfusion) {
                                textAttackDisplay = player.name + ' est confu';
                            }else if(effect.name === strParalysie) {
                                textAttackDisplay = player.name + ' est paralyse';
                            }
                            controllerCombat.animateTextAttackDisplay(textAttackDisplay, 2000, player, '', controllerCombat);
                            controllerCombat.listPlayer.push(controllerCombat.listPlayer.shift());
                            controllerCombat.gererTourParTour(controllerCombat);                    
                        }, 1000);                
                    }else {
                        controllerCombat.enablePlayerTurn(controllerCombat, player);
                    }
                }
            }, 500)                    
        }else {
            if (player) {
                controllerCombat.enablePlayerTurn(controllerCombat, player);
            }
        }        
        controllerCombat.view.displayFuturActions(controllerCombat.listPlayer, $('#' + strBottomRow));            
        controllerCombat.view.updateEtat(controllerCombat.listPlayer);
        if(controllerCombat.listEnnemies.length == 0) {
            controllerCombat.victoire(controllerCombat);
        }
        if(controllerCombat.getListEquipe().length == 0) {
            controllerCombat.view.displayGameOver();
        }
    },

    enablePlayerTurn: function(controllerCombat, player){
        if(player.gentil == true) {
            controllerCombat.view.showSkillNavBar(player.id);
        }else if (controllerCombat.online === false) {
            var intervalAttaqueDelay = setTimeout(function() {
                controllerCombat.attaqueEnnemie(player, controllerCombat);
            }, 2000);
        }
    },

    initTempStats: function(){
        var controller = this;
        this.tempStats = [];
        $.each(this.getListPlayer(), function(index) {
            var player = this;          
            controller.tempStats.push(
                {
                    accuracy : {value : 1, debuffCount : 0, buffCount : 0}, 
                    evasion : {value : 1, debuffCount : 0, buffCount : 0}, 
                    attaque : {value : player.attaque, debuffCount : 0, buffCount : 0},
                    defence : {value : player.defence, debuffCount : 0, buffCount : 0},
                    specialAttaque : {value : player.specialAttaque, debuffCount : 0, buffCount : 0},
                    specialDefence : {value : player.specialDefence, debuffCount : 0, buffCount : 0},
                    speed : {value : player.speed, debuffCount : 0, buffCount : 0},
                    id : player.id 
                }
            );            
        });
    },

    combat : function() {        
        this.view.render(
            this.getEnnemiInfoViewModel(),
            this.getEquipeInfoViewModel(),
            this.getListEnnemie(),
            this.getListEquipe(),
            this.getListPlayer(),
            this.getCombatUsableItems(),
            this.carte.name,
            this.online,
        );
        var controllerCombat = this;
        this.initTempStats();
        var equipe = this.getListEquipe();
        for (var i = 0; i < equipe.length; i++) {
            var player = equipe[i];
            // on bind les skills et les btn
            $.each(player.skills, function(j){
                var skill = player.skills[j];                
                var btn = $('#btn' + skill.id + player.id);
                if (!(skill.id === 'capture' && controllerCombat.online === true)) {
                    btn.click( skill, (function(playerCopy) {
                        return function(){
                            controllerCombat.intervalId = controllerCombat.animateQTEProgressBar(controllerCombat, skill.difficulty);
                            controllerCombat.handleContextMenu(controllerCombat, $('#rowEnnemies'));
                            controllerCombat.view.hideSkillNavBar(playerCopy.id);
                            controllerCombat.view.displayTargetCursor();
                            if (skill.targetId == 0) {
                                targetCol = $('#equipeCol');
                                targetList = controllerCombat.getListEquipe();
                            }else {
                                targetCol = $('#rowEnnemies');
                                targetList = controllerCombat.getListEnnemie();
                            }
                            $.each(targetCol.children(), function(k) {
                                var elementEnnemie = this;
                                var $elementEnnemie = $('#' + elementEnnemie.id);
                                var cibles;
                                if (skill.multiTarget) {
                                    cibles = targetList;
                                }else {
                                    cibles = [targetList.find(x=>x.id == $('#' + this.id.replace(strColonne, '')).attr('id'))];
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
                                    targetCol.children().off();
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
                    var targetCol = null;
                    var targetList = null;
                    if (item.category == 'normal' || item.category == 'super') {
                        targetCol = $('#rowEnnemies');
                        targetList = controllerCombat.getListEnnemie();
                    }else {
                        targetCol = $('#equipeCol');
                        targetList = controllerCombat.getListEquipe();
                    }
                    btn.click(item, (function(playerCopy) {
                        return function(){
                            controllerCombat.handleContextMenu(controllerCombat, targetCol);
                            controllerCombat.view.hideSkillNavBar(playerCopy.id);
                            controllerCombat.view.displayTargetCursor();
                            $.each(targetCol.children(), function(k) {
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
                                    var cible = targetList.find(x=>x.id == $('#' + this.id.replace(strColonne, '')).attr('id'));
                                    controllerCombat.view.displayAutoCursor();
                                    targetCol.children().off();
                                    $('body').off();
                                    controllerCombat.view.removeSelector(this);
                                    if (cible.currentHp > 0) {
                                        controllerCombat.useObject(cible, item, controllerCombat, playerCopy);
                                    }
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
            controllerCombat.view.removeQTE(controllerCombat.intervalId);

            return false;
        });
    },

    useObject: function(cible, item, controllerCombat, source) {
        var progressBar = null;
        if (item.category == 'Hp' || item.category == 'Mana') {
            progressBar = controllerCombat.view.getProgressBar(cible, strCombat + item.category);
        }
        var duration = item.effectInCombat(item.name, cible.id, progressBar, controllerCombat.getListEnnemie(), source, controllerCombat);
        controllerCombat.updateBtnItems(controllerCombat.getListEquipe(), controllerCombat.listItem);
        setTimeout(function(){
            controllerCombat.listPlayer.push(controllerCombat.listPlayer.shift());
            controllerCombat.gererTourParTour(controllerCombat);
        }, duration + 2000);
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
        var tempStatSource = controllerCombat.tempStats.find(x=>x.id == source.id);
        var canPerformAttaque = (source.currentMana >= skill.manaCost);
        result.canPerformAttaque = canPerformAttaque;
        var outputs = [];
        if (canPerformAttaque) {
            var effect = AllEffects.find(x=>x.id == skill.effect);
            var qteValue = entierAleatoire(50, 150)/100;
            if (source.gentil == true) {
                qteValue = controllerCombat.getQTEValue();
                controllerCombat.view.removeQTE(controllerCombat.intervalId);
            }
            $.each(listCible, function(index){
                var tempStatCible = controllerCombat.tempStats.find(x=>x.id == this.id);
                var output = {};
                var attaque = 0;
                var defence = 0;
                var level = 0;
                output.cibleId = this.id;                        
                if(Math.random() < skill.accuracy*(tempStatSource.accuracy.value/tempStatCible.evasion.value)) {
                    output.cibleTouche = true;
                } else {
                    output.cibleTouche = false;
                }
                if (effect) {
                    output.changementEtatReussi = effect.calculReussite(this);
                    if (output.changementEtatReussi) {
                        output.etat = effect.name;
                    }
                }
                output.effectiveness = controllerCombat.calculateEffectiveness(this.elementTypeId, skill.elementTypeId);
                output.isCriticalHit = controllerCombat.calculateCriticalHit(tempStatSource.speed.value);                
                if (skill.type == 'corpsACorps') {
                    attaque = tempStatSource.attaque.value;
                    defence = tempStatCible.defence.value;
                }else if (skill.type == 'magie') {
                    attaque = tempStatSource.specialAttaque.value;
                    defence = tempStatCible.specialDefence.value;                    
                }
                level = (output.isCriticalHit) ? source.level*2 : source.level; 
                output.dammage = Math.round(controllerCombat.calculateDammage( level, tempStatSource.attaque.value, tempStatCible.defence.value, skill.power, qteValue, output.effectiveness));                
                if(skill.constructor.name == 'Debuff') {
                    output.debuffStat = skill.stat;
                    output.debuffPercentage = skill.percentage*qteValue;
                }
                if(skill.constructor.name == 'Buff') {
                    output.buffStat = skill.stat;
                    output.buffPercentage = skill.percentage*qteValue;
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
            var player = controllerCombat.getListEquipe().find(x=>x.id == sourceId);
            if (player && controllerCombat.online == true) {
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
                    if (this.cibleTouche === true) {
                        var textAttackDisplayChangementEtat = '';
                        if (this.changementEtatReussi == true) {
                            textAttackDisplayChangementEtat = this.etat;
                        }else if (this.changementEtatReussi == false) {
                            textAttackDisplayChangementEtat = '';
                        }
                        controllerCombat.animateTextAttackDisplay(textAttackDisplayChangementEtat, textAttackDisplayDelay, cible, 'yellow', controllerCombat);
                        if (this.dammage > 0) {
                            var textAttackDisplayCriticalHit = '';
                            if (this.isCriticalHit === true) {
                                textAttackDisplayCriticalHit = strCriticalHit;
                            }
                            controllerCombat.animateTextAttackDisplay(textAttackDisplayCriticalHit, textAttackDisplayDelay, cible, 'red', controllerCombat);
                            var fontColor = '';
                            if (this.effectiveness > 1) {
                                fontColor = 'green';
                            }else if (this.effectiveness < 1) {
                                fontColor = 'red';
                            }
                            setTimeout(function(){
                                controllerCombat.animateTextAttackDisplay(result.dammage, textAttackDisplayDelay, cible, fontColor, controllerCombat);
                            }, 500);
                        }
                        if(this.debuffStat) {
                            var textDebuffDisplay = '';
                            if (controllerCombat.applyDebuff(cible, this.debuffStat, this.debuffPercentage, controllerCombat)) {
                                textDebuffDisplay = result.debuffStat + ' down !';
                            }else {
                                textDebuffDisplay = 'This is ineffective...';
                            }
                            setTimeout(function(){
                                controllerCombat.animateTextAttackDisplay(textDebuffDisplay, textAttackDisplayDelay, cible, 'purple', controllerCombat);
                            }, 1000);
                        }
                        if(this.buffStat) {
                            var textBuffDisplay = '';
                            if (controllerCombat.applyBuff(cible, this.buffStat, this.buffPercentage, controllerCombat)) {
                                textBuffDisplay = result.buffStat + ' up !';
                            }else {
                                textBuffDisplay = 'This is ineffective...';
                            }
                            setTimeout(function(){
                                controllerCombat.animateTextAttackDisplay(textBuffDisplay, textAttackDisplayDelay, cible, 'green', controllerCombat);
                            }, 1000);
                        }
                        var player = controllerCombat.getListEquipe().find(x=>x.id == cible.id);
                        if (player && controllerCombat.online  == true) {
                            controllerCombat.applyAttaque(this.changementEtatReussi, this.etat, this.dammage, player);
                        }
                        controllerCombat.applyAttaque(this.changementEtatReussi, this.etat, this.dammage, cible);
                    } else if (this.cibleTouche === false) {
                        setTimeout(function(){
                            controllerCombat.animateTextAttackDisplay('missed !', textAttackDisplayDelay, cible, 'red', controllerCombat);
                        }, 500);
                    }
                });
                var intervalDammageDelay = setTimeout(function() {
                    $.each(attaqueResults.outputs, function(index){
                        var cible = controllerCombat.listPlayer.find(x=>x.id == this.cibleId)
                        if( cible.currentHp <= 0 ) {
                            controllerCombat.sortirPlayerCombat(cible, controllerCombat);
                        }
                    });
                    controllerCombat.listPlayer.push(controllerCombat.listPlayer.shift());
                    controllerCombat.gererTourParTour(controllerCombat);
                }, textAttackDisplayDelay);
            }, skill.duration);
        }else {
            controllerCombat.view.showSkillNavBar(sourceId);
            controllerCombat.view.removeQTE(controllerCombat.intervalId);
        }
    },

    calculateEffectiveness: function(listCibleElementTypeId, skillElementTypeId){
        var bonusElementType = 1;
        $.each(listCibleElementTypeId, function(index){
            bonusElementType = bonusElementType*(AllElementTypeEfficacy.find(
                x=>x.target_type_id == this.id && x.damage_type_id == skillElementTypeId
            ).damage_factor/100);            
        });
        
        return bonusElementType;
    },

    calculateDammage: function(level, sourceAttaque, cibleDefence, power, qteValue, bonusType){
        var result = 0;
        if (power >  0) {
            result = Math.round((((2*level)/5)*power*(sourceAttaque/cibleDefence)/50 + 2));
            result = result*(qteValue)*bonusType;
        }
        return result;
    },

    calculateCriticalHit: function(speed) {
        if(entierAleatoire(0, 255) < speed/2) {
            return true;
        }
             
        return false;
    },

    applyAttaque: function(changementEtatReussi, etat, dammage, cible){
        if (changementEtatReussi) {
            cible.etat = etat;
        }else if(cible.etat === strDodo || cible.etat === strConfusion || cible.etat === strParalysie){
            cible.etat = '';
        }
        cible.currentHp = cible.currentHp - dammage;
    },

    applyDebuff: function(cible, debuffStat, debuffPercentage, controllerCombat){        
        var tempStat = controllerCombat.tempStats.find(x=>x.id == cible.id);
        if (tempStat[debuffStat].debuffCount < 3) {                        
            tempStat[debuffStat].value = Math.round(tempStat[debuffStat].value*(1 - debuffPercentage));
            tempStat[debuffStat].debuffCount += 1;            

            return true;
        }

        return false;
    },

    applyBuff: function(cible, buffStat, buffPercentage, controllerCombat){        
        var tempStat = controllerCombat.tempStats.find(x=>x.id == cible.id);
        if (tempStat[buffStat].buffCount < 3) {                        
            tempStat[buffStat].value = Math.round(tempStat[buffStat].value*(1 + buffPercentage));
            tempStat[buffStat].buffCount += 1;            

            return true;
        }

        return false;
    },

    animateTextAttackDisplay: function(textAttackDisplay, textAttackDisplayDelay, cible, fontColor, controllerCombat){
        var cibleColonneElement = $('#colonne' + cible.id);
        var textAttackDisplayElement = prependElementOnParent('div', 'textAttackDisplay' + cible.id, 'dammageAnimated', textAttackDisplay, cibleColonneElement);
        textAttackDisplayElement.css({
            'left' : cibleColonneElement.width()/2 + 'px',
            'color' : fontColor,
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
            updateProgressBar(controllerCombat.view.getProgressBar(cible, strCombat + 'Hp'), cible.currentHp, cible.hp);
        }
    },

    attaqueEnnemie: function(ennemie, controllerCombat) {
        var skill = skillChoisi(ennemie.skills.filter(x=>x.manaCost <= ennemie.currentMana), ennemie.etat);
        var listPlayerAlive = [];
        var target = [];
        var cible = {};
        if (skill.targetId === 1) {
            listPlayerAlive = controllerCombat.getListEquipe().filter(x => x.gentil == true);
            cible = listPlayerAlive[entierAleatoire(0, listPlayerAlive.length - 1)];
        }else {
            listPlayerAlive = controllerCombat.listEnnemies.filter(x => x.currentHp > 0 && x.gentil == false);
            cible = listPlayerAlive[entierAleatoire(0, listPlayerAlive.length - 1)];
        }
        if (skill.multiTarget) {
            target = listPlayerAlive;
        }else {        
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

    getExperienceGagnee: function(controllerCombat) {
        var experienceGagnee = 0;
        $.each(controllerCombat.listEnnemiesTotal, function(index) {
             experienceGagnee += controllerCombat.calculExperienceGagnee(this, controllerCombat.online);
        });
        experienceGagnee = Math.round(experienceGagnee/controllerCombat.getListEquipe().length);

        return experienceGagnee;
    },

    getPotifoulzGagnee: function(controllerCombat) {
        var potiflouzGagnee = 0;
        $.each(controllerCombat.listEnnemiesTotal, function(index) {
            potiflouzGagnee += controllerCombat.calculPotiflouzGagnee(this, controllerCombat.listEquipe.map(x=>x.hp).reduce((accumulator, currentValue) => accumulator + currentValue)/controllerCombat.listEquipe.length, controllerCombat.online);
        });

        return potiflouzGagnee;
    },

    calculExperienceGagnee: function(ennemie, online) {
        var onlineBonus = 1;
        if (online) {
            onlineBonus = 1.5;
        }

        return  Math.round(onlineBonus*ennemie.experienceDonnee*ennemie.level/7);
    },

    calculPotiflouzGagnee: function(ennemie, playerMediumHp, online) {
        var onlineBonus = 1;
        if (online) {
            onlineBonus = 1.5;
        }

        return  Math.round(onlineBonus*ennemie.level*ennemie.hp/(playerMediumHp + ennemie.hp) + ennemie.level);
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
        /*var lootedItems = controllerCombat.getLootedItems(controllerCombat.listEnnemiesTotal);
        reformateItems(lootedItems);
        Array.prototype.push.apply(this.listItem, lootedItems)
        this.listItem = reformateItems(this.listItem);*/
        var potiflouzGagnee = controllerCombat.getPotifoulzGagnee(controllerCombat);        
        var experienceGagnee = controllerCombat.getExperienceGagnee(controllerCombat);
        SetPotiflouz(GetPotiflouz() + potiflouzGagnee);
        controllerCombat.view.displayVictory(experienceGagnee, potiflouzGagnee,/*controllerCombat.getVictoryItemViewModel(lootedItems)*/ null, controllerCombat.getEquipeVictoireViewModel());
        setTimeout(function(){
            controllerCombat.incrementerExperience(controllerCombat, experienceGagnee);
            $.each(controllerCombat.listCapture, function(index) {
                if (controllerCombat.listEquipe.length <= 2 ) {
                    controllerCombat.listEquipe.push(this);
                    controllerCombat.listMonstresCapture.push(this.name)
                }else {
                    controllerCombat.listReserve.push(controllerCombat.listCapture[index]);
                }
            });
            controllerCombat.reinitialiserEtat(controllerCombat.getListEquipe());
        }, 1000);

        // a la fermeture de la modal
        $('#' + strModalMenuVictoire).on('hidden.bs.modal', function () {
            if ((controllerCombat.listCarte.length == controllerCombat.listCarte.findIndex(x=>x.id == controllerCombat.carte.id) + 1)
                && controllerCombat.listCarte.length < AllCartes.length) {
                controllerCombat.listCarte.push(AllCartes[controllerCombat.carte.id]);                            
                SetCurrentCarteId(parseInt(controllerCombat.carte.id));
            }
            controllerCombat.initiliserWorldMap(controllerCombat.listCarte, controllerCombat.timeGame);
        });
    },

    incrementerExperience: function(controllerCombat, experienceGagnee) {        
        $.each(controllerCombat.getListEquipe(), function(index) {
            var experienceRestante = experienceGagnee;
            var player = this;
            if ((this.experience + experienceRestante) < this.experienceNextLevel) {
                this.experience = this.experience + experienceRestante;
                experienceRestante = 0;
                updateProgressBar(controllerCombat.view.getProgressBar(this, strVictoire + 'Experience'), this.experience, this.experienceNextLevel);                
            }else {
                this.experience = this.experienceNextLevel;
                experienceRestante = experienceRestante - (this.experienceNextLevel - this.experience);
                if (this.experience >= this.experienceNextLevel) {                                                
                    incrementerLevel(player).then(function(learnedSkills){                                     
                        controllerCombat.view.animateLevelUp(player, learnedSkills);
                        updateProgressBar(controllerCombat.view.getProgressBar(player, strVictoire + 'Experience'), player.experience, player.experienceNextLevel);
                        controllerCombat.incrementerExperience(controllerCombat, experienceRestante);                        
                    });                   
                }
            }
        });
    },

    reinitialiserEtat: function(listPlayer) {
        $.each(listPlayer, function(index) {
            this.etat = '';
        });
    },

    animateQTEProgressBar: function(controllerCombat, difficulty) {
        controllerCombat.view.displayQTE($('#futureActionsRow'));
        var elem = document.getElementById('qteBar');
        var width = 1;
        var intervalId = setInterval(frame, 10);
        function frame() {
            width += 1*difficulty;
            elem.style.width = width + '%';
            if (width >= 100) {
                width = 0;
            }
        }

        return intervalId;
    },

    getQTEValue: function(){
        return document.getElementById('qteBar').style.width.replace('%','')/100 + 0.5;
    },
}
