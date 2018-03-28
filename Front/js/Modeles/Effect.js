class Effect {
    constructor(id, name, calculReussite, effect) {
        this.id = id;
        this.name = name;
        this.calculReussite = calculReussite;
        this.effect = effect;
    }
}
/*
function effectCapture(ennemie, controllerCombat) {
    controllerCombat.sortirPlayerCombat(ennemie, controllerCombat);
    ennemie.gentil = true;
    if (controllerCombat.listReserve.length < 9) {
        controllerCombat.listCapture.push(ennemie);
    }else {
        alert('La reserve est pleine, le monstre est relache.');
    }
}
*/
function calculPoison(ennemie) {
    var rand = entierAleatoire(1, 100)
    if (rand <= 50 ) {
        return true;
    }

    return false;
}

function calculVampiGraine(ennemie) {
    return true;
}

function effectPoison(ennemie, controllerCombat) {
    var poisonDammage = Math.round(ennemie.hp/10);
    var poisonDelay = 2000;
    ennemie.currentHp = ennemie.currentHp - poisonDammage;
    controllerCombat.animateTextAttackDisplay(poisonDammage, poisonDelay, ennemie, 'yellow', controllerCombat)
}

function effectVampiGraine(ennemie, controllerCombat) {   
    var delay = 2000;
    var dammage = Math.round(ennemie.hp/16);
    var skill = fetchSkill(250);
    ennemie.currentHp = ennemie.currentHp - dammage;
    controllerCombat.animateTextAttackDisplay(dammage, delay, ennemie, '', controllerCombat);
    $.each(controllerCombat.getListEquipe(), function(index){      
        var player = this;  
        skill.animation(this, ennemie, fetchSkill(250));        
        setTimeout(function(){
            heal(player, dammage);
            controllerCombat.animateTextAttackDisplay(dammage, delay, player, 'green', controllerCombat);
        }, skill.duration)       
    });
}

var AllEffects = [    
    new Effect(1, strPoison, calculPoison, effectPoison),
    new Effect(2, strVampiGraine, calculVampiGraine, effectVampiGraine),
];
