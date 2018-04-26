class Effect {
    constructor(id, name, calculReussite, effect) {
        this.id = id;
        this.name = name;
        this.calculReussite = calculReussite;
        this.effect = effect;
    }
}

function pureEffect() {
    return true;
}

function faibleChance() {
    if(entierAleatoire(1, 100) <= 10) {
        return true;
    }

    return false;
}

function moyenneChance() {
    if(entierAleatoire(1, 100) <= 30) {
        return true;
    }

    return false;
}

function hauteChance() {
    if(entierAleatoire(1, 100) <= 50) {
        return true;
    }

    return false;
}

function effectIdle(player, controllerCombat) {
    
}

function effectPoison(ennemie, controllerCombat) {
    var poisonDammage = Math.round(ennemie.hp/10);
    var poisonDelay = 2000;
    ennemie.currentHp = ennemie.currentHp - poisonDammage;
    controllerCombat.animateTextAttackDisplay(poisonDammage, poisonDelay, ennemie, 'yellow', controllerCombat)
}

function effectConfusion(player, controllerCombat) {    
    var tempStatPlayer = controllerCombat.tempStats.find(x=>x.id == player.id);
    var dammage = controllerCombat.calculateDammage(player.level, tempStatPlayer.attaque.value, tempStatPlayer.defence.value, 10, 1, 1)
    var delay = 2000;
    player.currentHp = player.currentHp - dammage;
    controllerCombat.animateTextAttackDisplay(dammage, delay, player, '', controllerCombat)
}

function effectVampiGraine(infectedPlayer, controllerCombat) {   
    var delay = 2000;
    var dammage = Math.round(infectedPlayer.hp/16);
    var skill = fetchSkill(250);
    infectedPlayer.currentHp = infectedPlayer.currentHp - dammage;
    controllerCombat.animateTextAttackDisplay(dammage, delay, infectedPlayer, '', controllerCombat);    
    $.each(controllerCombat.listPlayer.filter(x=>x.currentHp > 0 && x.gentil != infectedPlayer.gentil), function(index){ 
        var player = this;  
        skill.animation(this, infectedPlayer, fetchSkill(250));        
        setTimeout(function(){
            var healingAmount = Math.round(dammage);
            heal(player, healingAmount);
            controllerCombat.animateTextAttackDisplay(healingAmount, delay, player, 'green', controllerCombat);
        }, skill.duration);
    });
}

var AllEffects = [    
    new Effect(1, strPoison, pureEffect, effectPoison),
    new Effect(2, strVampiGraine, pureEffect, effectVampiGraine),
    new Effect(3, strDodo, pureEffect, effectIdle),
    new Effect(4, strConfusion, pureEffect, effectConfusion),
    new Effect(5, strConfusion, faibleChance, effectConfusion),
    new Effect(6, strParalysie, pureEffect, effectIdle),
    new Effect(7, strPoison, moyenneChance, effectPoison),
    new Effect(8, strPoison, hauteChance, effectPoison),
    new Effect(9, strParalysie, faibleChance, effectIdle),
    new Effect(10, strParalysie, moyenneChance, effectIdle),
];
