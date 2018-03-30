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

function effectPoison(ennemie, controllerCombat) {
    var poisonDammage = Math.round(ennemie.hp/10);
    var poisonDelay = 2000;
    ennemie.currentHp = ennemie.currentHp - poisonDammage;
    controllerCombat.animateTextAttackDisplay(poisonDammage, poisonDelay, ennemie, 'yellow', controllerCombat)
}

function effectVampiGraine(infectedPlayer, controllerCombat) {   
    var delay = 2000;
    var dammage = Math.round(infectedPlayer.hp/16);
    var skill = fetchSkill(250);
    infectedPlayer.currentHp = infectedPlayer.currentHp - dammage;
    controllerCombat.animateTextAttackDisplay(dammage, delay, infectedPlayer, '', controllerCombat);
    console.log(controllerCombat.listPlayer.filter(x=>x.currentHp > 0 && x.gentil != infectedPlayer.gentil));
    $.each(controllerCombat.listPlayer.filter(x=>x.currentHp > 0 && x.gentil != infectedPlayer.gentil), function(index){ 
        var player = this;  
        skill.animation(this, infectedPlayer, fetchSkill(250));        
        setTimeout(function(){
            heal(player, dammage);
            controllerCombat.animateTextAttackDisplay(dammage, delay, player, 'green', controllerCombat);
        }, skill.duration);
    });
}

function effectDodo(ennemie, controllerCombat) {    
    
}

var AllEffects = [    
    new Effect(1, strPoison, pureEffect, effectPoison),
    new Effect(2, strVampiGraine, pureEffect, effectVampiGraine),
    new Effect(3, strDodo, pureEffect, effectDodo),
];
