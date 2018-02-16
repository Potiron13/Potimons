class Effect {
    constructor(id, name, calculReussite, effect) {
        this.id = id;
        this.name = name;
        this.calculReussite = calculReussite;
        this.effect = effect;
    }
}

function calculCapture(ennemie, listCapture, listReserve) {
    var rand = entierAleatoire(0, (ennemie.currentHp*100)/ennemie.hp)
    if (rand < 20) {
        return true;
    }

    return false;
}

function effectCapture(ennemie, controllerCombat) {
    ennemie.gentil = true;
    if (controllerCombat.listReserve.length < 9) {
        controllerCombat.listCapture.push(ennemie);
    }else {
        alert('La reserve est pleine, le monstre est relache.');
    }
    controllerCombat.sortirEnnemieCombat(ennemie, controllerCombat);
}

function calculPoison(ennemie) {
    var rand = entierAleatoire(1, 100)
    if (rand <= 100 ) {
        return true;
    }

    return false;
}

function effectPoison(ennemie, controllerCombat) {
    var poisonDammage = Math.round(ennemie.hp*10/100);
    var poisonDelay = 2000;
    ennemie.currentHp = ennemie.currentHp - poisonDammage;
    controllerCombat.animateTextAttackDisplay(poisonDammage, poisonDelay, ennemie, controllerCombat)
}

var AllEffects = [
    new Effect('Capture', 'Capture', calculCapture, effectCapture),
    new Effect(strPoison, strPoison, calculPoison, effectPoison),
];
